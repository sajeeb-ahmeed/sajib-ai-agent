const agentApiUrl = import.meta.env.VITE_AGENT_API_URL?.trim();

export const env = {
  agentApiUrl,
  hasAgentApi: Boolean(agentApiUrl),
} as const;
