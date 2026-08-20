import { env } from "../config/env";
import type {
  AgentChatRequest,
  AgentChatResponse,
} from "../types/chat";

const REQUEST_TIMEOUT_MS = 30000;

export class AgentServiceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AgentServiceError";
  }
}

export async function sendAgentMessage(
  payload: AgentChatRequest,
): Promise<AgentChatResponse> {
  if (!env.agentApiUrl) {
    throw new AgentServiceError(
      "SAJIB.AI backend is not configured.",
    );
  }

  const controller = new AbortController();

  const timeout = window.setTimeout(() => {
    controller.abort();
  }, REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(env.agentApiUrl, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(payload),

      signal: controller.signal,
    });

    if (!response.ok) {
      throw new AgentServiceError(
        `Agent request failed with status ${response.status}.`,
      );
    }

    const data = (await response.json()) as Partial<AgentChatResponse>;

    if (
      typeof data.reply !== "string" ||
      data.reply.trim().length === 0
    ) {
      throw new AgentServiceError(
        "Agent returned an invalid response.",
      );
    }

    return {
      reply: data.reply.trim(),
      provider: data.provider,
    };
  } catch (error) {
    if (error instanceof AgentServiceError) {
      throw error;
    }

    if (error instanceof DOMException && error.name === "AbortError") {
      throw new AgentServiceError(
        "SAJIB.AI took too long to respond. Please try again.",
      );
    }

    throw new AgentServiceError(
      "Unable to connect to SAJIB.AI.",
    );
  } finally {
    window.clearTimeout(timeout);
  }
}
