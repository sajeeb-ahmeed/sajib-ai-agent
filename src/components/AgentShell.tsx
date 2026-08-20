import { useEffect, useRef, useState } from "react";
import { suggestedPrompts } from "../data/prompts";
import type { ChatMessage as ChatMessageType } from "../types/chat";
import { ChatComposer } from "./ChatComposer";
import { ChatMessage } from "./ChatMessage";
import { StatusPill } from "./StatusPill";
import { SuggestedPrompts } from "./SuggestedPrompts";

const initialMessages: ChatMessageType[] = [
  {
    id: "agent-welcome",
    role: "assistant",
    content:
      "Hi, I'm SAJIB.AI — Sajib Ahmed's portfolio intelligence interface. Ask me about his projects, engineering experience, technical stack, or AI work.",
    createdAt: Date.now(),
  },
];

export function AgentShell() {
  const [messages, setMessages] =
    useState<ChatMessageType[]>(initialMessages);

  const [input, setInput] = useState("");

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages]);

  function submitMessage() {
    const content = input.trim();

    if (!content) {
      return;
    }

    const message: ChatMessageType = {
      id: crypto.randomUUID(),
      role: "user",
      content,
      createdAt: Date.now(),
    };

    setMessages((current) => [...current, message]);
    setInput("");
  }

  function handleSuggestedPrompt(prompt: string) {
    setInput(prompt);
  }

  return (
    <main className="agent-page">
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />
      <div className="grid-layer" aria-hidden="true" />

      <section className="agent-shell">
        <header className="agent-header">
          <div className="brand">
            <div className="brand-mark" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>

            <div>
              <p className="eyebrow">PERSONAL ENGINEERING INTELLIGENCE</p>
              <h1>SAJIB.AI</h1>
            </div>
          </div>

          <StatusPill />
        </header>

        <div className="agent-body">
          <div className="hero-copy">
            <div className="terminal-label">
              <span>SYS</span>
              <span>/</span>
              <span>PORTFOLIO_AGENT</span>
            </div>

            <h2>
              Ask about the work
              <span> behind the profile.</span>
            </h2>

            <p className="hero-description">
              Explore Sajib Ahmed&apos;s projects, engineering experience,
              technical decisions, product work, and AI systems through an
              interactive portfolio agent.
            </p>

            <SuggestedPrompts
              prompts={suggestedPrompts}
              onSelect={handleSuggestedPrompt}
            />
          </div>

          <div className="terminal-card chat-terminal">
            <div className="terminal-topbar">
              <div className="window-controls" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>

              <span className="terminal-name">sajib.ai/session</span>

              <span className="terminal-mode">LOCAL</span>
            </div>

            <div className="chat-session">
              <div className="connection-banner">
                <div>
                  <span className="connection-dot" />
                  <span>LOCAL INTERFACE MODE</span>
                </div>

                <span>Agent API connection pending</span>
              </div>

              <div className="messages">
                {messages.map((message) => (
                  <ChatMessage key={message.id} message={message} />
                ))}

                <div ref={messagesEndRef} />
              </div>

              <div className="composer-zone">
                <ChatComposer
                  value={input}
                  onChange={setInput}
                  onSubmit={submitMessage}
                />

                <div className="composer-help">
                  <span>ENTER TO SEND</span>
                  <span>SHIFT + ENTER FOR NEW LINE</span>
                </div>
              </div>
            </div>

            <footer className="terminal-footer">
              <span>React</span>
              <span>TypeScript</span>
              <span>Conversation UI</span>
              <span>API Ready</span>
            </footer>
          </div>
        </div>
      </section>

      <footer className="page-footer">
        <span>SAJIB.AI / 2026</span>
        <span className="footer-line" />
        <span>ENGINEERING INTERFACE</span>
      </footer>
    </main>
  );
}
