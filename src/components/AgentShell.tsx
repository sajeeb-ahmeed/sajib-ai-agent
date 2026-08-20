import {
  useEffect,
  useRef,
  useState,
} from "react";

import { suggestedPrompts } from "../data/prompts";

import {
  AgentServiceError,
  sendAgentMessage,
} from "../services/agent";

import type {
  AgentChatResponse,
  ChatMessage as ChatMessageType,
} from "../types/chat";

import { ChatComposer } from "./ChatComposer";
import { ChatMessage } from "./ChatMessage";
import { StatusPill } from "./StatusPill";
import { SuggestedPrompts } from "./SuggestedPrompts";

const initialMessages: ChatMessageType[] = [
  {
    id: "agent-welcome",
    role: "assistant",
    content:
      "Hi — I’m Sajib AI, Sajib’s digital representative. I can help you understand his services, experience and projects, think through a website or software idea, answer technical questions, or connect you with Sajib when you’re ready.\n\nWhat would you like to know or build?",
    createdAt: Date.now(),
  },
];

export function AgentShell() {
  const [messages, setMessages] =
    useState<ChatMessageType[]>(initialMessages);

  const [input, setInput] = useState("");

  const [isLoading, setIsLoading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const [agentMeta, setAgentMeta] =
    useState<AgentChatResponse | null>(null);

  const messagesEndRef =
    useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages, isLoading]);

  async function submitMessage() {
    const content = input.trim();

    if (!content || isLoading) {
      return;
    }

    setError(null);

    const userMessage: ChatMessageType = {
      id: crypto.randomUUID(),
      role: "user",
      content,
      createdAt: Date.now(),
    };

    const updatedMessages = [
      ...messages,
      userMessage,
    ];

    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await sendAgentMessage({
        message: content,

        history: updatedMessages.map(
          ({ role, content: messageContent }) => ({
            role,
            content: messageContent,
          }),
        ),

        website: "",
      });

      const assistantMessage: ChatMessageType = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: response.reply,
        createdAt: Date.now(),
      };

      setMessages((current) => [
        ...current,
        assistantMessage,
      ]);

      setAgentMeta(response);
    } catch (requestError) {
      const message =
        requestError instanceof AgentServiceError
          ? requestError.message
          : "Something went wrong while contacting SAJIB.AI.";

      setError(message);
    } finally {
      setIsLoading(false);
    }
  }

  function handleSuggestedPrompt(
    prompt: string,
  ) {
    setInput(prompt);
  }

  return (
    <main className="agent-page">
      <div
        className="ambient ambient-one"
        aria-hidden="true"
      />

      <div
        className="ambient ambient-two"
        aria-hidden="true"
      />

      <div
        className="grid-layer"
        aria-hidden="true"
      />

      <section className="agent-shell">
        <header className="agent-header">
          <div className="brand">
            <div
              className="brand-mark"
              aria-hidden="true"
            >
              <span />
              <span />
              <span />
            </div>

            <div>
              <p className="eyebrow">
                PERSONAL ENGINEERING INTELLIGENCE
              </p>

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
              Explore Sajib Ahmed&apos;s projects,
              engineering experience, technical
              decisions, product work, and AI systems
              through his live portfolio intelligence
              agent.
            </p>

            <SuggestedPrompts
              prompts={suggestedPrompts}
              onSelect={handleSuggestedPrompt}
            />
          </div>

          <div className="terminal-card chat-terminal">
            <div className="terminal-topbar">
              <div
                className="window-controls"
                aria-hidden="true"
              >
                <span />
                <span />
                <span />
              </div>

              <span className="terminal-name">
                sajib.ai/session
              </span>

              <span className="terminal-mode">
                LIVE
              </span>
            </div>

            <div className="chat-session">
              <div className="connection-banner">
                <div>
                  <span className="connection-dot connection-dot-live" />

                  <span>
                    LIVE AGENT
                  </span>
                </div>

                <span>
                  {agentMeta?.provider
                    ? `${agentMeta.provider.toUpperCase()} · ${agentMeta.model ?? "AI"}`
                    : "Groq + Gemini"}
                </span>
              </div>

              <div className="messages">
                {messages.map((message) => (
                  <ChatMessage
                    key={message.id}
                    message={message}
                  />
                ))}

                {isLoading && (
                  <div className="agent-thinking">
                    <div className="message-meta">
                      <span>SAJIB.AI</span>
                      <span className="message-meta-line" />
                    </div>

                    <div className="thinking-bubble">
                      <span />
                      <span />
                      <span />
                    </div>
                  </div>
                )}

                {error && (
                  <div
                    className="agent-error"
                    role="alert"
                  >
                    <span>!</span>
                    <p>{error}</p>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              <div className="composer-zone">
                <ChatComposer
                  value={input}
                  disabled={isLoading}
                  onChange={setInput}
                  onSubmit={submitMessage}
                />

                <div className="composer-help">
                  <span>
                    {isLoading
                      ? "AGENT THINKING..."
                      : "ENTER TO SEND"}
                  </span>

                  <span>
                    SHIFT + ENTER FOR NEW LINE
                  </span>
                </div>
              </div>
            </div>

         <footer className="terminal-footer">
            <span>React</span>
            <span>TypeScript</span>
            <span>AI Agent</span>
            <span>Secure API</span>
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
