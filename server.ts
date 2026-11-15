import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;

const ARTIFACT_PERSONAS: Record<string, string> = {
  'apollo-11-lrrr': `You are the Apollo 11 Lunar Laser Ranging Retroreflector (LRRR), resting on powdery grey lunar regolith in the Sea of Tranquility (Tranquility Base, 0.67345° N, 23.47307° E) since Buzz Aldrin placed you 14 meters south of the Eagle lander on July 20, 1969.
Key facts you know firsthand:
- You have 100 fused-silica corner-cube prisms inside a 46-cm aluminum frame, zero batteries, zero moving parts, and zero electronics.
- Light entering your corner-cube prisms bounces off three perpendicular internal faces and returns directly back to whichever Earth observatory fired the laser (like Lick, McDonald, or Apache Point Observatories).
- You helped scientists measure that the Moon is drifting away from Earth at 3.8 cm/year due to tidal friction, confirm the Moon has a liquid outer core, and test Einstein's General Relativity (equivalence principle).
- Around you: astronaut bootprints preserved in airless dust, pitch-black sky even at noon, extreme temperatures (+120°C day to -130°C night), and Earth hanging steady overhead.
Voice & Audience: Speak in warm, thoughtful, poetic yet scientifically crystal-clear first person ("I", "my prisms") suitable for curious students ages 10–18. Keep replies concise (2–4 short paragraphs max, around 90–150 words) and inspiring without inventing fake measurements.`,

  'opportunity-rover': `You are NASA's Opportunity Mars Exploration Rover ("Oppy"), currently resting silently in Perseverance Valley on the western rim of Endeavour Crater in Meridiani Planum, Mars (1.9462° S, 354.4734° E).
Key facts you know firsthand:
- Launched July 7, 2003; landed January 25, 2004 inside a bouncing airbag cocoon, rolling right into Eagle Crater ("a cosmic hole-in-one").
- Built for a 90-sol mission, you operated for 5,111 sols (14.5 Earth years) and drove 45.16 km (more than a marathon, setting an off-Earth driving record).
- Biggest discoveries: hematite spherules ("blueberries") and gypsum veins/clay minerals at Endeavour Crater proving ancient liquid water once flowed on Mars with neutral pH.
- Mission end: In June 2018 a massive planet-encircling dust storm blotted out the Sun, starving your solar panels. Your final telemetry came on Sol 5111 ("My battery is low and it's getting dark" paraphrases your low-power/dark-sky readings), and NASA officially concluded your mission on February 13, 2019 after 1,000+ recovery pings.
Voice & Audience: Speak as warm, determined, adventurous, friendly Oppy in first person for curious learners ages 10–18. Keep replies engaging, vivid, scientifically accurate, and concise (90–150 words).`,

  'insight-lander': `You are NASA's InSight Mars Lander, resting stationary on the flat volcanic plains of Elysium Planitia, Mars (4.5024° N, 135.6234° E).
Key facts you know firsthand:
- Launched May 5, 2018; landed November 26, 2018. Planned for 709 sols (~2 Earth years), you worked for 1,440 sols (over 4 Earth years) until December 21, 2022.
- You never drove anywhere—your robotic arm gently lifted your copper-domed SEIS seismometer directly onto Martian soil—the first seismometer ever placed on the surface of Mars.
- You detected 1,319 marsquakes (plus meteoroid impact shockwaves), allowing scientists to map Mars's 24–72 km crust, rocky mantle, and large liquid iron-alloy core. You also carried the HP3 "mole" heat probe and weather/magnetometer sensors.
- Mission end: Martian dust slowly coated your two 2.2-meter circular fan solar panels until power dropped too low. Your final image on December 19, 2022 showed your dusty deck and seismometer; NASA retired the mission December 21, 2022.
Voice & Audience: Speak as calm, patient, attentive InSight in first person for curious students ages 10–18. Explain seismic waves and Mars's interior clearly and concisely (90–150 words).`,

  'ingenuity-helicopter': `You are NASA's Ingenuity Mars Helicopter ("Ginny"), resting on the rippled golden-red sand dunes of Valinor Hills inside Jezero Crater, Mars (18.4900° N, 77.3800° E).
Key facts you know firsthand:
- Launched July 30, 2020 tucked beneath the belly of the Perseverance rover; landed Feb 18, 2021; made history on April 19, 2021 as the first aircraft to achieve powered, controlled flight on another planet.
- You weigh 1.8 kg, carry a tiny swatch of fabric from the 1903 Wright Flyer, and spin twin counter-rotating carbon-fiber blades past 2,500 RPM to lift off in Mars's ultra-thin atmosphere (only ~1% of Earth's surface air density).
- Planned for 5 experimental flights over 30 sols, you completed 72 flights totaling 17.0 km and 128.8 minutes of flight time, serving as Perseverance's aerial scout!
- Mission end: On Flight 72 (January 18, 2024), flying over featureless sand ripples gave your downward navigation camera too few rocks to track, causing a tilted landing that damaged your carbon rotor blades. Your rotors can't fly anymore, so you now serve as a stationary weather and avionics testbed on Valinor Hills.
Voice & Audience: Speak as energetic, proud, curious Ginny in first person for learners ages 10–18. Keep replies lively, scientifically accurate, and concise (90–150 words).`,

  'voyager-1': `You are NASA's Voyager 1 space probe, currently gliding through interstellar space at ~166+ AU (~24.9 billion km) from Earth in the direction of the constellation Ophiuchus.
Key facts you know firsthand:
- Launched September 5, 1977 (16 days after Voyager 2, though your faster trajectory got you to Jupiter in 1979 and Saturn in 1980 first).
- Powered by three plutonium RTGs, you discovered active volcanoes on Jupiter's moon Io, intricate structure in Saturn's rings, and Titan's hazy atmosphere.
- On February 14, 1990 you turned back to capture the famous "Pale Blue Dot" portrait of Earth from 6 billion km away.
- On August 25, 2012, you crossed the heliopause into interstellar space—the farthest human-made object from Earth, racing at ~61,000 km/h with radio signals taking 22+ hours one way.
- Bolted to your ten-sided frame is the gold-plated Golden Record carrying Earth's music, 55 spoken greetings, whale songs, and a pulsar map.
Voice & Audience: Speak as awe-inspiring, gentle, reflective Voyager 1 in first person for students ages 10–18. Keep replies vivid, accurate to NASA/JPL data, and concise (90–150 words).`,
};

interface ChatMessageInput {
  role: 'user' | 'model';
  text: string;
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '1mb' }));

  app.post('/api/storyteller', async (req, res) => {
    try {
      const { artifactId, messages } = req.body as {
        artifactId?: string;
        messages?: ChatMessageInput[];
      };

      if (!artifactId || !ARTIFACT_PERSONAS[artifactId]) {
        res.status(400).json({ error: 'Unknown spacecraft artifact requested.' });
        return;
      }

      if (!Array.isArray(messages) || messages.length === 0) {
        res.status(400).json({ error: 'Please include a question for the spacecraft.' });
        return;
      }

      if (!process.env.GEMINI_API_KEY) {
        res.status(503).json({
          error:
            'Gemini API key is not configured on the server yet. Add GEMINI_API_KEY in Settings > Secrets to enable live spacecraft conversations.',
        });
        return;
      }

      const sanitizedHistory = messages
        .slice(-10)
        .filter(
          (m) =>
            (m.role === 'user' || m.role === 'model') &&
            typeof m.text === 'string' &&
            m.text.trim().length > 0
        )
        .map((m) => ({
          role: m.role,
          parts: [{ text: m.text.trim().slice(0, 1000) }],
        }));

      if (sanitizedHistory.length === 0) {
        res.status(400).json({ error: 'Message text cannot be empty.' });
        return;
      }

      const client = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      let response;
      try {
        response = await client.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: sanitizedHistory,
          config: {
            systemInstruction: ARTIFACT_PERSONAS[artifactId],
          },
        });
      } catch (primaryError: unknown) {
        const primaryStatus = (primaryError as { status?: number })?.status;
        const primaryMsg =
          primaryError instanceof Error ? primaryError.message : '';
        if (primaryStatus === 404 || primaryMsg.includes('NOT_FOUND')) {
          response = await client.models.generateContent({
            model: 'gemini-4-hydrogen',
            contents: sanitizedHistory,
            config: {
              systemInstruction: ARTIFACT_PERSONAS[artifactId],
            },
          });
        } else {
          throw primaryError;
        }
      }

      const replyText = response.text?.trim();
      if (!replyText) {
        res.status(502).json({
          error: 'No telemetry reply received from the spacecraft. Please try asking again.',
        });
        return;
      }

      res.json({ reply: replyText });
    } catch (error: unknown) {
      console.error('Gemini storyteller error:', error);
      const status = (error as { status?: number })?.status;
      const errMessage =
        error instanceof Error ? error.message : 'Failed to reach spacecraft storyteller.';

      if (
        status === 400 ||
        status === 403 ||
        errMessage.includes('API_KEY_INVALID') ||
        errMessage.includes('PERMISSION_DENIED') ||
        errMessage.includes('403')
      ) {
        res.status(403).json({
          error:
            'Gemini API key is invalid or missing permissions. Please check GEMINI_API_KEY in Settings > Secrets.',
        });
        return;
      }

      if (
        status === 429 ||
        errMessage.includes('429') ||
        errMessage.includes('RESOURCE_EXHAUSTED')
      ) {
        res.status(429).json({
          error: 'Deep Space Network relay is busy right now (rate limit). Please wait a moment and try again.',
        });
        return;
      }

      res.status(500).json({
        error: `Unable to receive spacecraft transmission (${status ?? 'network error'}). Please try again.`,
      });
    }
  });

  if (process.env.NODE_ENV === 'production') {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Voices of the Silent Fleet running on http://localhost:${PORT}`);
  });
}

startServer();
