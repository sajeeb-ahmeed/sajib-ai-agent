import type { ChatMessage as ChatMessageType } from "../types/chat";

interface ChatMessageProps {
  message: ChatMessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <article
      className={`chat-message ${isUser ? "chat-message-user" : "chat-message-agent"}`}
    >
      <div className="message-meta">
        <span>{isUser ? "YOU" : "SAJIB.AI"}</span>
        <span className="message-meta-line" />
      </div>

      <div className="message-bubble">
        <p>{message.content}</p>
      </div>
    </article>
  );
}
