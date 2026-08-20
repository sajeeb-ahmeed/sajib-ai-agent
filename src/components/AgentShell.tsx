import { StatusPill } from "./StatusPill";

const capabilities = [
  "Projects",
  "Experience",
  "Engineering",
  "AI Systems",
];

export function AgentShell() {
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
              An interactive AI interface for exploring Sajib Ahmed&apos;s
              projects, engineering experience, technical stack, systems,
              and product work.
            </p>

            <div className="capability-row" aria-label="Agent capabilities">
              {capabilities.map((capability) => (
                <span className="capability-chip" key={capability}>
                  {capability}
                </span>
              ))}
            </div>
          </div>

          <div className="terminal-card">
            <div className="terminal-topbar">
              <div className="window-controls" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>

              <span className="terminal-name">sajib.ai/session</span>

              <span className="terminal-mode">READY</span>
            </div>

            <div className="terminal-content">
              <div className="agent-orb" aria-hidden="true">
                <div className="orb-ring orb-ring-one" />
                <div className="orb-ring orb-ring-two" />
                <div className="orb-core" />
              </div>

              <div className="welcome-copy">
                <span className="prompt-prefix">&gt;</span>

                <div>
                  <p className="welcome-title">Agent initialized.</p>
                  <p className="welcome-text">
                    Conversation engine will be connected in the next
                    development stages.
                  </p>
                </div>
              </div>

              <div className="composer-preview" aria-hidden="true">
                <span>Ask SAJIB.AI something...</span>

                <div className="send-preview">
                  <span>↗</span>
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
