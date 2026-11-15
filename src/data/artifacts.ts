export type CelestialZone = 'moon' | 'mars' | 'deep-space';

export interface StoryChapter {
  id: number;
  label: string;
  title: string;
  timeframe: string;
  narrative: string[];
  fieldNoteTitle: string;
  fieldNoteText: string;
}

export interface ArtifactTelemetry {
  launchDate: string;
  launchVehicle: string;
  locationName: string;
  coordinates: string;
  plannedLifespan: string;
  actualLifespan: string;
  lifespanMultiplierLabel: string;
  plannedRatioPercent: number;
  keyDiscovery: string;
  nssdcId: string;
  distanceFromEarthLabel: string;
  distanceRank: number;
}

export interface NASAArtifact {
  id: string;
  name: string;
  nickname?: string;
  zone: CelestialZone;
  zoneLabel: string;
  statusLabel: string;
  statusGlyph: string;
  statusTone: 'active' | 'stationary' | 'retired';
  dateSpan: string;
  shortRole: string;
  summary: string;
  imageUrl: string;
  imageAlt: string;
  greeting: string;
  starterQuestions: [string, string, string];
  telemetry: ArtifactTelemetry;
  chapters: [StoryChapter, StoryChapter, StoryChapter];
}

export const NASA_ARTIFACTS: NASAArtifact[] = [
  {
    id: 'apollo-11-lrrr',
    name: 'Apollo 11 Lunar Laser Ranging Retroreflector',
    nickname: 'LRRR',
    zone: 'moon',
    zoneLabel: 'The Moon',
    statusLabel: 'Active',
    statusGlyph: '●',
    statusTone: 'active',
    dateSpan: 'July 20, 1969 — Present',
    shortRole: '100-prism optical mirror array on Tranquility Base',
    summary:
      'Deployed by Buzz Aldrin during Apollo 11, this zero-power glass prism panel still bounces Earth-fired lasers back to astronomers after more than five decades.',
    imageUrl: '/src/assets/images/artifact_apollo_lrrr_1794780102474.jpg',
    imageAlt:
      'Apollo 11 Lunar Laser Ranging Retroreflector resting on grey lunar regolith with astronaut bootprints and a crescent Earth in the black lunar sky',
    greeting:
      'Hello from the Sea of Tranquility! I do not have wheels, microphones, or batteries, yet I am still hard at work over 57 years after Buzz Aldrin set me down. Ask me anything about catching laser beams from Earth.',
    starterQuestions: [
      'What was your biggest scientific discovery?',
      'How do you still work without any batteries?',
      'What can you see around you right now?',
    ],
    telemetry: {
      launchDate: 'July 16, 1969',
      launchVehicle: 'Saturn V · Apollo 11',
      locationName: 'Sea of Tranquility (Tranquility Base)',
      coordinates: '0.67345° N, 23.47307° E',
      plannedLifespan: '10+ years',
      actualLifespan: '57+ years (Ongoing)',
      lifespanMultiplierLabel: '5.7× planned lifespan',
      plannedRatioPercent: 18,
      keyDiscovery:
        'Measured the Moon drifting away from Earth at 3.8 cm/year and confirmed Einstein’s General Relativity',
      nssdcId: '1969-059C-04',
      distanceFromEarthLabel: '384,400 km',
      distanceRank: 1,
    },
    chapters: [
      {
        id: 1,
        label: 'Chapter 1: The Launch & Arrival',
        title: 'Fourteen Meters From the Eagle',
        timeframe: 'July 16 – July 20, 1969',
        narrative: [
          'Riding inside the scientific equipment bay of Apollo 11’s Lunar Module Eagle, I weighed just 23.6 kilograms and packed no computer chips, no radio dish, and no solar panels. My job depended purely on geometry.',
          'On July 20, 1969, astronaut Buzz Aldrin carried me about 14 meters south of the Eagle lander across powdery grey regolith, carefully leveled my aluminum frame, and tilted my face toward Earth hanging high in the pitch-black sky.',
        ],
        fieldNoteTitle: 'Why Corner-Cube Prisms Always Send Light Home',
        fieldNoteText:
          'Each of my 100 fused-silica prisms is shaped like the inside corner of a glass cube. Just like a bicycle reflector, light entering at any angle bounces off three perpendicular inner mirrors and exits along the exact parallel path back to the telescope that fired it.',
      },
      {
        id: 2,
        label: 'Chapter 2: The Big Discovery',
        title: 'Catching Photons Across 384,400 Kilometers',
        timeframe: 'August 1969 – Present',
        narrative: [
          'On August 1, 1969, Lick Observatory in California aimed a powerful ruby laser at Tranquility Base. Out of trillions of photons shot into space, only a handful struck my 46-centimeter frame and made the 2.5-second round trip back.',
          'By timing that light speed down to trillionths of a second, scientists discovered that the Moon is slowly spiraling away from Earth at 3.8 centimeters every year—roughly as fast as your fingernails grow—because Earth’s ocean tides transfer rotational energy to the lunar orbit.',
        ],
        fieldNoteTitle: 'Testing Einstein From the Lunar Dust',
        fieldNoteText:
          'Decades of millimeter-accurate distance tracking also revealed how the Moon’s core wobbles (proving it has a liquid outer core) and verified Einstein’s equivalence principle—showing Earth and the Moon fall toward the Sun at identical gravitational acceleration.',
      },
      {
        id: 3,
        label: 'Chapter 3: Silent Legacy',
        title: 'The Quietest Instrument Still Standing',
        timeframe: '1969 – Future Centuries',
        narrative: [
          'While Apollo landers fell silent once their batteries drained, I never needed electricity at all. Through blistering 120 °C lunar noons and -130 °C two-week nights, my quartz prisms remain crystal clear.',
          'Alongside four sister retroreflectors placed by Apollo 14, Apollo 15, and Lunokhod rovers, I am the longest-running active science experiment from the Apollo era—and future Artemis astronauts will still find me gleaming in the dust.',
        ],
        fieldNoteTitle: 'An Endurance Built on Pure Physics',
        fieldNoteText:
          'Modern observatories like Apache Point in New Mexico still bounce laser pulses off me today, pinpointing the Earth–Moon distance to within about 1 millimeter.',
      },
    ],
  },
  {
    id: 'opportunity-rover',
    name: 'Opportunity Rover',
    nickname: 'Oppy',
    zone: 'mars',
    zoneLabel: 'Mars',
    statusLabel: 'Retired',
    statusGlyph: '◆',
    statusTone: 'retired',
    dateSpan: 'Jan 25, 2004 – Feb 13, 2019',
    shortRole: 'Six-wheeled solar geologist across Meridiani Planum',
    summary:
      'Designed for a 90-day sprint, Opportunity drove a marathon 45.16 kilometers over nearly 15 years, proving ancient Mars once held liquid water.',
    imageUrl: '/src/assets/images/artifact_opportunity_rover_1794780103990.jpg',
    imageAlt:
      'NASA Opportunity Mars rover with dusty solar wings and panoramic camera mast perched near the rocky rim of a Martian crater',
    greeting:
      'Hey there, Earth explorer! I’m Oppy. They told me I only had to survive 90 Martian days, so I decided to stick around for 5,111 sols instead. What would you like to know about my 45-kilometer road trip across Mars?',
    starterQuestions: [
      'What was your biggest scientific discovery?',
      'Why did your mission end?',
      'What can you see around you right now?',
    ],
    telemetry: {
      launchDate: 'July 7, 2003',
      launchVehicle: 'Delta II 7925H · MER-B',
      locationName: 'Perseverance Valley, Endeavour Crater',
      coordinates: '1.9462° S, 354.4734° E',
      plannedLifespan: '90 sols (~92.5 Earth days)',
      actualLifespan: '5,111 sols (14 years, 138 days)',
      lifespanMultiplierLabel: '56× planned mission',
      plannedRatioPercent: 2,
      keyDiscovery:
        'Discovered mineral "blueberries" & clay deposits proving neutral-pH ancient liquid water',
      nssdcId: '2003-032A',
      distanceFromEarthLabel: '~225 million km (avg)',
      distanceRank: 2,
    },
    chapters: [
      {
        id: 1,
        label: 'Chapter 1: The Launch & Arrival',
        title: 'An Interplanetary Hole-in-One',
        timeframe: 'July 2003 – January 2004',
        narrative: [
          'After launching from Cape Canaveral in July 2003, I plunged into the Martian atmosphere wrapped inside a giant cluster of inflatable airbags. I bounced across the flat plains of Meridiani Planum—and rolled straight into a tiny 22-meter impact crater!',
          'Engineers on Earth cheered because landing inside Eagle Crater exposed bedrock right in front of my cameras. Instead of driving miles to find ancient rocks, I woke up parked directly inside a natural geology museum.',
        ],
        fieldNoteTitle: 'Why Mars Years Use "Sols"',
        fieldNoteText:
          'A Martian day—called a sol—lasts 24 hours, 39 minutes, and 35 seconds. For nearly 15 years, JPL rover drivers shifted their work schedules by 40 minutes a day so they could send me commands every Martian morning.',
      },
      {
        id: 2,
        label: 'Chapter 2: The Big Discovery',
        title: 'Blueberries, Water, and a Marathon Drive',
        timeframe: '2004 – 2017',
        narrative: [
          'Embedded inside Eagle Crater’s layered rocks, my microscope spotted millions of tiny round gray pebbles nicknamed "blueberries." My spectrometers proved they were made of hematite—an iron-rich mineral that on Earth almost always forms inside liquid water.',
          'Over the next decade, Martian winds kept blowing dust off my solar wings, giving me surprise power boosts. I explored Victoria Crater, Santa Maria Crater, and finally reached the 22-kilometer-wide Endeavour Crater, where I found ancient clays formed in mild, potentially habitable water.',
        ],
        fieldNoteTitle: '45.16 Kilometers of Martian Treadmarks',
        fieldNoteText:
          'By driving 45.16 kilometers (28.06 miles), I broke the off-Earth driving record previously held by the Soviet Lunokhod 2 lunar rover—traveling farther than a full Earth marathon on six aluminum wheels.',
      },
      {
        id: 3,
        label: 'Chapter 3: Silent Legacy',
        title: 'Darkness Over Perseverance Valley',
        timeframe: 'June 2018 – February 13, 2019',
        narrative: [
          'In June 2018, a monstrous dust storm swelled until it swallowed the entire planet Mars. Noon turned darker than midnight. Without sunlight hitting my solar arrays, my batteries drained and I went to sleep inside Perseverance Valley.',
          'My final transmission on Sol 5111 reported dimming skies and plummeting power—poetically remembered as "My battery is low and it’s getting dark." After eight months and more than 1,000 wake-up calls, NASA closed my mission on February 13, 2019.',
        ],
        fieldNoteTitle: 'Forever Parked in Perseverance Valley',
        fieldNoteText:
          'Though dust rests silently over my solar deck today, every rover exploring Mars after me—including Curiosity and Perseverance—follows the trail of water science I helped prove.',
      },
    ],
  },
  {
    id: 'insight-lander',
    name: 'InSight Mars Lander',
    nickname: 'InSight',
    zone: 'mars',
    zoneLabel: 'Mars',
    statusLabel: 'Retired',
    statusGlyph: '◆',
    statusTone: 'retired',
    dateSpan: 'Nov 26, 2018 – Dec 21, 2022',
    shortRole: 'Stationary geophysical station listening to Mars’s interior',
    summary:
      'Equipped with a robotic arm and an ultra-sensitive copper-domed seismometer, InSight recorded 1,319 marsquakes to map the Red Planet’s hidden core.',
    imageUrl: '/src/assets/images/artifact_insight_lander_1794780104384.jpg',
    imageAlt:
      'NASA InSight Mars Lander on reddish-ochre Elysium Planitia plains with its two circular solar arrays and copper-domed seismometer resting on the soil',
    greeting:
      'Greetings from Elysium Planitia. I never drove a single centimeter on Mars—I stayed perfectly still so I could feel the faintest heartbeat of the planet beneath my three legs. Ask me about marsquakes or the hidden core of Mars!',
    starterQuestions: [
      'What was your biggest scientific discovery?',
      'Why did your mission end?',
      'What does a marsquake sound like?',
    ],
    telemetry: {
      launchDate: 'May 5, 2018',
      launchVehicle: 'Atlas V 401',
      locationName: 'Elysium Planitia, Mars',
      coordinates: '4.5024° N, 135.6234° E',
      plannedLifespan: '709 sols (~2 Earth years)',
      actualLifespan: '1,440 sols (4 years, 25 days)',
      lifespanMultiplierLabel: '2× planned mission',
      plannedRatioPercent: 49,
      keyDiscovery:
        'Detected 1,319 marsquakes and measured Mars’s crust thickness, mantle, and liquid iron core',
      nssdcId: '2018-042A',
      distanceFromEarthLabel: '~225 million km (avg)',
      distanceRank: 3,
    },
    chapters: [
      {
        id: 1,
        label: 'Chapter 1: The Launch & Arrival',
        title: 'Landing Somewhere Quiet on Purpose',
        timeframe: 'May – December 2018',
        narrative: [
          'Most Mars missions race toward dramatic canyons and jagged craters. I wanted the exact opposite: a flat, rock-free parking spot where nothing would disturb my ears. On November 26, 2018, I touched down smoothly on the smooth volcanic plains of Elysium Planitia.',
          'Using my 1.8-meter robotic arm, I became the first spacecraft in history to pick up a seismometer off its own deck and place it directly onto another planet’s soil, shielding it under a wind-and-thermal dome.',
        ],
        fieldNoteTitle: 'Listening Smaller Than an Atom',
        fieldNoteText:
          'My SEIS seismometer was so sensitive it could measure ground vibrations smaller than the width of a single hydrogen atom—allowing it to separate gusts of Martian wind from deep underground quakes.',
      },
      {
        id: 2,
        label: 'Chapter 2: The Big Discovery',
        title: 'An X-Ray of Another World’s Heart',
        timeframe: '2019 – 2022',
        narrative: [
          'In April 2019, I felt my first clear tremor—a marsquake! Over four years I recorded 1,319 marsquakes, including shockwaves from meteoroids slamming into Mars thousands of kilometers away.',
          'Just like doctors use ultrasound waves to see inside your body, geologists watched seismic waves bounce off Mars’s deep layers. For the first time ever, we measured Mars’s 24-to-72-kilometer crust, thick rocky mantle, and large liquid iron-alloy core.',
        ],
        fieldNoteTitle: 'Why Mars Shakes Without Plate Tectonics',
        fieldNoteText:
          'Unlike Earth, Mars does not have sliding tectonic plates. Instead, marsquakes happen because the planet’s interior is slowly cooling and shrinking, causing its rocky crust to crack and settle.',
      },
      {
        id: 3,
        label: 'Chapter 3: Silent Legacy',
        title: 'A Dusty Blanket Under Pale Skies',
        timeframe: 'December 2022',
        narrative: [
          'Because I lacked wheels, I could not drive out of dust’s path. Month after month, fine red silt settled onto my two circular fan-like solar panels until they generated barely enough electricity to run my radio.',
          'On December 19, 2022, I beamed home one last portrait of my dusty deck and seismometer with the message: "My power’s really low, so this may be the last image I can send." Two days later, NASA declared my mission complete.',
        ],
        fieldNoteTitle: 'Science Still Unfolding From My Archives',
        fieldNoteText:
          'Every seismic waveform I sent to NASA’s Planetary Data System remains open to students and scientists worldwide—and researchers are still discovering hidden meteoroid impacts inside my recordings.',
      },
    ],
  },
  {
    id: 'ingenuity-helicopter',
    name: 'Ingenuity Mars Helicopter',
    nickname: 'Ginny',
    zone: 'mars',
    zoneLabel: 'Mars',
    statusLabel: 'Stationary Testbed',
    statusGlyph: '▲',
    statusTone: 'stationary',
    dateSpan: 'Apr 19, 2021 – Jan 18, 2024',
    shortRole: 'First powered, controlled aircraft on another planet',
    summary:
      'Built for just 5 experimental hops, Ingenuity completed 72 flights across Jezero Crater before a rotor landing mishap turned it into a stationary outpost.',
    imageUrl: '/src/assets/images/artifact_ingenuity_helicopter_1794780104977.jpg',
    imageAlt:
      'NASA Ingenuity Mars Helicopter standing on rippled golden-red sand dunes in Jezero Crater with carbon-fiber coaxial blades and top solar panel',
    greeting:
      'Hi! I’m Ginny, the 1.8-kilogram helicopter that taught humanity how to fly on Mars. My rotors spun 72 times across Jezero Crater, and now I rest on the sand dunes of Valinor Hills. Curious how a helicopter flies where there’s barely any air?',
    starterQuestions: [
      'How did you fly in Mars’s super-thin air?',
      'Why did your flying mission end on Flight 72?',
      'What can you see around you right now?',
    ],
    telemetry: {
      launchDate: 'July 30, 2020',
      launchVehicle: 'Atlas V 541 (with Perseverance)',
      locationName: 'Valinor Hills, Jezero Crater, Mars',
      coordinates: '18.4900° N, 77.3800° E',
      plannedLifespan: '5 flights (30-sol tech demo)',
      actualLifespan: '72 flights (1,000+ sols flying)',
      lifespanMultiplierLabel: '14.4× flight target',
      plannedRatioPercent: 7,
      keyDiscovery:
        'Proved powered aerodynamic flight on Mars (1% air density), logging 17.0 km across 72 flights',
      nssdcId: '2020-052A',
      distanceFromEarthLabel: '~225 million km (avg)',
      distanceRank: 4,
    },
    chapters: [
      {
        id: 1,
        label: 'Chapter 1: The Launch & Arrival',
        title: 'A Wright Brothers Moment on Mars',
        timeframe: 'July 2020 – April 19, 2021',
        narrative: [
          'Folded neatly under the belly of the Perseverance rover, I survived the fiery descent into Jezero Crater before being gently dropped onto a flat patch of dirt named Wright Brothers Field. I even carried a postage-stamp-sized swatch of fabric from the 1903 Wright Flyer!',
          'Mars’s atmosphere is only about 1% as thick as Earth’s—like flying 30 kilometers up in Earth’s stratosphere. On April 19, 2021, I spun my two counter-rotating carbon blades past 2,500 RPM, lifted three meters off the ground, hovered for 39.1 seconds, and made history.',
        ],
        fieldNoteTitle: 'Why Radio Commands Could Not Fly Me Live',
        fieldNoteText:
          'Because Mars is many light-minutes away from Earth, no human could steer me with a joystick. My onboard smartphone-grade processor read downward camera frames 30 times per second to balance and fly completely autonomously.',
      },
      {
        id: 2,
        label: 'Chapter 2: The Big Discovery',
        title: 'From Five Test Hops to Mars Scout',
        timeframe: '2021 – January 2024',
        narrative: [
          'Once I aced my five test flights, NASA promoted me from a technology experiment to Perseverance’s aerial scout! I climbed as high as 24 meters, hit ground speeds of 10 meters per second, and flew 17.0 kilometers in total.',
          'Hovering over ancient river deltas and boulder fields, my color camera photographed ridges and sand traps ahead of Perseverance—showing rover drivers safe shortcuts and fascinating rock layers they couldn’t see from ground level.',
        ],
        fieldNoteTitle: '72 Flights in Numbers',
        fieldNoteText:
          'Across 72 flights, I spent 128.8 minutes airborne above Jezero Crater—more than 14 times my original mission goal—while surviving freezing -80 °C Martian nights.',
      },
      {
        id: 3,
        label: 'Chapter 3: Silent Legacy',
        title: 'Resting on Valinor Hills',
        timeframe: 'January 18, 2024 – Present',
        narrative: [
          'During Flight 72, I flew over smooth, featureless sand ripples in an area nicknamed "Nerethva Vallis" near Valinor Hills. Without rocks or patterns for my navigation camera to track, I touched down slightly tilted and damaged the tips of my carbon-fiber rotor blades.',
          'My flying days ended on January 18, 2024—but I am not broken inside! My solar panel, battery, and sensors still wake up to record temperatures and avionics test data as a stationary outpost on the dunes.',
        ],
        fieldNoteTitle: 'Paving the Sky for Future Worlds',
        fieldNoteText:
          'Because my tiny coaxial blades worked so well, aerospace engineers are now designing larger Mars helicopters—and NASA’s Dragonfly rotorcraft will soon fly through the dense skies of Saturn’s moon Titan.',
      },
    ],
  },
  {
    id: 'voyager-1',
    name: 'Voyager 1 Space Probe',
    nickname: 'Voyager 1',
    zone: 'deep-space',
    zoneLabel: 'Deep Space',
    statusLabel: 'Active',
    statusGlyph: '●',
    statusTone: 'active',
    dateSpan: 'Sept 5, 1977 — Present',
    shortRole: 'Farthest human-made spacecraft, now in interstellar space',
    summary:
      'Launched in 1977 for a Grand Tour of Jupiter and Saturn, Voyager 1 crossed the heliopause in 2012 and still whispers home from over 24 billion km away.',
    imageUrl: '/src/assets/images/artifact_voyager_probe_1794780105972.jpg',
    imageAlt:
      'NASA Voyager 1 space probe gliding through deep interstellar space with its large white parabolic dish antenna and gold-plated Golden Record',
    greeting:
      'Transmission received from interstellar space. It takes my radio signal more than 22 hours at the speed of light just to reach your antennas on Earth. I carry humanity’s Golden Record toward the stars—what would you like to ask me?',
    starterQuestions: [
      'What was your biggest scientific discovery?',
      'What is on the Golden Record you carry?',
      'What is it like out in interstellar space?',
    ],
    telemetry: {
      launchDate: 'September 5, 1977',
      launchVehicle: 'Titan IIIE / Centaur',
      locationName: 'Interstellar Space (beyond the heliopause)',
      coordinates: '~166 AU · Ophiuchus direction',
      plannedLifespan: '5 years (Jupiter & Saturn)',
      actualLifespan: '49+ years (Ongoing)',
      lifespanMultiplierLabel: '9.8× planned lifespan',
      plannedRatioPercent: 10,
      keyDiscovery:
        'Discovered active volcanoes on Io, complex rings at Saturn, and crossed into interstellar space in 2012',
      nssdcId: '1977-084A',
      distanceFromEarthLabel: '~24.9 billion km',
      distanceRank: 5,
    },
    chapters: [
      {
        id: 1,
        label: 'Chapter 1: The Launch & Arrival',
        title: 'Catching a Once-in-176-Years Alignment',
        timeframe: 'September 1977 – November 1980',
        narrative: [
          'Every 176 years, the outer giant planets swing into a sweeping curve that lets a single spacecraft sling from planet to planet using gravity assists. I lifted off on September 5, 1977, powered not by sunlight—which grows faint in the outer solar system—but by three plutonium radioisotope generators.',
          'At Jupiter in 1979, my cameras caught something astonishing: huge volcanic plumes erupting off its moon Io—the first active volcanoes ever seen beyond Earth. At Saturn in 1980, I skimmed past Titan’s thick nitrogen haze before angling upward out of the solar system’s planetary plane.',
        ],
        fieldNoteTitle: 'Wait—Did Voyager 2 Launch First?',
        fieldNoteText:
          'Yes! Voyager 2 actually launched 16 days earlier on August 20, 1977, but I took a faster trajectory so I reached Jupiter and Saturn first—earning the title Voyager 1.',
      },
      {
        id: 2,
        label: 'Chapter 2: The Big Discovery',
        title: 'Pale Blue Dot & Crossing the Heliopause',
        timeframe: 'February 1990 – August 2012',
        narrative: [
          'On February 14, 1990, astronomer Carl Sagan persuaded NASA to turn my camera backward one last time from 6 billion kilometers out. Inside a scattered beam of sunlight sat a tiny speck less than a pixel wide: Earth, our "Pale Blue Dot."',
          'Then on August 25, 2012, my plasma wave instrument detected a sharp jump in cold, dense interstellar gas while solar wind particles vanished. I had officially exited the Sun’s magnetic bubble—the heliosphere—and become the first human-made object in interstellar space.',
        ],
        fieldNoteTitle: 'What Is the Heliopause?',
        fieldNoteText:
          'Our Sun blows a continuous wind of charged particles that carves out a giant protective bubble around all the planets. The heliopause is the outer shoreline where that solar wind collides with the cold plasma drifting between other stars.',
      },
      {
        id: 3,
        label: 'Chapter 3: Silent Legacy',
        title: 'Carrying Earth’s Song Between the Stars',
        timeframe: '2012 – Distant Millennia',
        narrative: [
          'Today I race outward at roughly 61,000 kilometers per hour. My nuclear power drops by about 4 watts each year, forcing engineers at JPL to shut off instruments one by one—and even troubleshoot 1970s computer memory across billions of kilometers.',
          'Eventually, around the 2030s, my radio will fall quiet. Yet for billions of years after, bolted to my side, the gold-plated Golden Record will carry spoken greetings in 55 languages, whale songs, Chuck Berry, Bach, and Beethoven through the Milky Way.',
        ],
        fieldNoteTitle: 'A Message in a Cosmic Bottle',
        fieldNoteText:
          'The Golden Record’s aluminum cover is etched with simple pictograms showing how to play the phonograph stylus and a pulsar map pinpointing our Sun’s exact location in the galaxy.',
      },
    ],
  },
];
