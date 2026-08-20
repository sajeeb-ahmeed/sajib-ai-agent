import type { KeyboardEvent } from "react";

interface ChatComposerProps {
  value: string;
  maxLength?: number;
  disabled?: boolean;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

export function ChatComposer({
  value,
  maxLength = 1200,
  disabled = false,
  onChange,
  onSubmit,
}: ChatComposerProps) {
  const canSubmit = value.trim().length > 0 && !disabled;

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();

      if (canSubmit) {
        onSubmit();
      }
    }
  }

  return (
    <div className="composer">
      <textarea
        aria-label="Message SAJIB.AI"
        className="composer-input"
        maxLength={maxLength}
        placeholder="Ask about projects, experience, AI, systems..."
        rows={1}
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={handleKeyDown}
      />

      <div className="composer-actions">
        <span className="character-count">
          {value.length}/{maxLength}
        </span>

        <button
          aria-label="Send message"
          className="send-button"
          disabled={!canSubmit}
          type="button"
          onClick={onSubmit}
        >
          ↗
        </button>
      </div>
    </div>
  );
}
