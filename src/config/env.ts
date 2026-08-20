const DEFAULT_AGENT_API_URL =
  "https://sajib.dev.cv/api/sajib-agent.php";

const configuredAgentApiUrl =
  import.meta.env.VITE_AGENT_API_URL?.trim();

export const env = {
  agentApiUrl:
    configuredAgentApiUrl || DEFAULT_AGENT_API_URL,

  hasAgentApi: true,
} as const;
