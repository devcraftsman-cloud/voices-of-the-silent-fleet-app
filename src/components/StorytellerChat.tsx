import { useState, useRef, useEffect, FormEvent } from 'react';
import { Send, RotateCcw, Radio } from 'lucide-react';
import { NASAArtifact } from '../data/artifacts';

interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

interface StorytellerChatProps {
  artifact: NASAArtifact;
}

export function StorytellerChat({ artifact }: StorytellerChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: artifact.greeting },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [lastFailedQuestion, setLastFailedQuestion] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMessages([{ role: 'model', text: artifact.greeting }]);
    setInput('');
    setIsLoading(false);
    setErrorMessage(null);
    setLastFailedQuestion(null);
  }, [artifact.id, artifact.greeting]);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const sendQuestion = async (questionText: string, existingHistory?: ChatMessage[]) => {
    const trimmed = questionText.trim();
    if (!trimmed || isLoading) return;

    const baseHistory = existingHistory ?? messages;
    const nextHistory: ChatMessage[] = [...baseHistory, { role: 'user', text: trimmed }];

    setMessages(nextHistory);
    setInput('');
    setIsLoading(true);
    setErrorMessage(null);
    setLastFailedQuestion(null);

    try {
      const response = await fetch('/api/storyteller', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          artifactId: artifact.id,
          messages: nextHistory,
        }),
      });

      const data = (await response.json()) as { reply?: string; error?: string };

      if (!response.ok || !data.reply) {
        throw new Error(data.error || 'Could not reach spacecraft transmission.');
      }

      setMessages([...nextHistory, { role: 'model', text: data.reply }]);
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : 'Unable to reach spacecraft transmission.';
      setErrorMessage(msg);
      setLastFailedQuestion(trimmed);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendQuestion(input);
  };

  const handleRetry = () => {
    if (!lastFailedQuestion) return;
    const historyWithoutLastUser = messages.slice(0, -1);
    sendQuestion(lastFailedQuestion, historyWithoutLastUser);
  };

  const displayName = artifact.nickname || artifact.name;

  return (
    <section
      aria-label={`Ask ${displayName}`}
      className="flex flex-col bg-[#0B101A] border border-slate-800 rounded-xl overflow-hidden h-full min-h-[540px]"
    >
      <div className="px-5 py-4 border-b border-slate-800 bg-[#0F1624] flex items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-slate-100">
            Ask {displayName} Directly
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            First-person interactive Q&amp;A · {artifact.telemetry.locationName}
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setMessages([{ role: 'model', text: artifact.greeting }]);
            setErrorMessage(null);
            setLastFailedQuestion(null);
          }}
          className="px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-[#090D16] hover:bg-slate-800 border border-slate-700 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          title="Reset conversation"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto p-5 space-y-4 max-h-[420px]"
      >
        {messages.map((msg, idx) => (
          <div
            key={`${idx}-${msg.role}`}
            className={`flex flex-col ${
              msg.role === 'user' ? 'items-end' : 'items-start'
            }`}
          >
            <span className="text-[11px] font-mono text-slate-400 mb-1 px-1">
              {msg.role === 'user' ? 'You (Mission Explorer)' : displayName}
            </span>
            <div
              className={`max-w-[90%] rounded-xl px-4 py-3 text-sm leading-relaxed whitespace-pre-line ${
                msg.role === 'user'
                  ? 'bg-cyan-500/15 border border-cyan-500/40 text-slate-100'
                  : 'bg-[#121927] border border-slate-800 text-slate-200'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex flex-col items-start">
            <span className="text-[11px] font-mono text-amber-400 mb-1 px-1">
              {displayName}
            </span>
            <div className="bg-[#121927] border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-300 flex items-center gap-2.5">
              <Radio className="w-4 h-4 text-cyan-400 animate-spin" />
              <span>Receiving transmission across {artifact.telemetry.distanceFromEarthLabel}...</span>
            </div>
          </div>
        )}

        {errorMessage && (
          <div
            role="alert"
            className="p-3.5 rounded-lg bg-rose-950/40 border border-rose-500/40 text-sm text-rose-200 flex flex-col gap-2"
          >
            <p>{errorMessage}</p>
            {lastFailedQuestion && (
              <button
                type="button"
                onClick={handleRetry}
                className="self-start px-3 py-1.5 text-xs font-medium bg-rose-500/20 hover:bg-rose-500/30 border border-rose-400/40 rounded-md text-rose-100 cursor-pointer"
              >
                Retry Transmission
              </button>
            )}
          </div>
        )}
      </div>

      <div className="p-4 border-t border-slate-800 bg-[#0D131F] space-y-3">
        <div>
          <p className="text-xs font-medium text-slate-400 mb-2">
            Starter questions — tap one to ask:
          </p>
          <div className="flex flex-wrap gap-2">
            {artifact.starterQuestions.map((question) => (
              <button
                key={question}
                type="button"
                disabled={isLoading}
                onClick={() => sendQuestion(question)}
                className="text-left text-xs font-medium px-3 py-2 rounded-lg bg-[#141D2E] hover:bg-[#1B273D] border border-slate-700 hover:border-cyan-400/70 text-cyan-200 transition-colors disabled:opacity-50 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                {question}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <label htmlFor="storyteller-input" className="sr-only">
            Ask {displayName} a question
          </label>
          <input
            id="storyteller-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Ask ${displayName} a question...`}
            disabled={isLoading}
            maxLength={500}
            className="flex-1 min-w-0 min-h-[44px] px-3.5 py-2.5 rounded-lg bg-[#07090E] border border-slate-700 focus:border-cyan-400 focus:outline-none text-sm text-slate-100 placeholder:text-slate-500 disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="min-h-[44px] px-4 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-800 disabled:text-slate-500 text-slate-950 font-semibold text-sm transition-colors flex items-center gap-2 shrink-0 cursor-pointer disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
          >
            <span>Send</span>
            <Send className="w-4 h-4" />
          </button>
        </form>

        <p className="text-[11px] text-slate-400 text-center pt-1">
          Story voice powered by Gemini using official NASA mission archives.
        </p>
      </div>
    </section>
  );
}
