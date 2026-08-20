interface SuggestedPromptsProps {
  prompts: string[];
  onSelect: (prompt: string) => void;
}

export function SuggestedPrompts({
  prompts,
  onSelect,
}: SuggestedPromptsProps) {
  return (
    <div className="suggested-prompts">
      <p className="suggested-label">TRY ASKING</p>

      <div className="suggested-grid">
        {prompts.map((prompt) => (
          <button
            className="suggested-button"
            key={prompt}
            type="button"
            onClick={() => onSelect(prompt)}
          >
            <span>{prompt}</span>
            <span className="suggested-arrow" aria-hidden="true">
              ↗
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
