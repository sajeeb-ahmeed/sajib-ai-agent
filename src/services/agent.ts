import { env } from "../config/env";
import type {
  AgentChatRequest,
  AgentChatResponse,
} from "../types/chat";

const REQUEST_TIMEOUT_MS = 45000;

export class AgentServiceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AgentServiceError";
  }
}

export async function sendAgentMessage(
  payload: AgentChatRequest,
): Promise<AgentChatResponse> {
  const controller = new AbortController();

  const timeout = window.setTimeout(() => {
    controller.abort();
  }, REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(env.agentApiUrl, {
      method: "POST",

      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },

      body: JSON.stringify(payload),

      signal: controller.signal,
    });

    if (!response.ok) {
      throw new AgentServiceError(
        `SAJIB.AI returned HTTP ${response.status}.`,
      );
    }

    const data =
      (await response.json()) as Partial<AgentChatResponse>;

    if (
      typeof data.reply !== "string" ||
      data.reply.trim().length === 0
    ) {
      throw new AgentServiceError(
        "SAJIB.AI returned an invalid response.",
      );
    }

    return {
      reply: data.reply.trim(),

      provider:
        typeof data.provider === "string"
          ? data.provider
          : undefined,

      model:
        typeof data.model === "string"
          ? data.model
          : undefined,

      mode:
        typeof data.mode === "string"
          ? data.mode
          : undefined,
    };
  } catch (error) {
    if (error instanceof AgentServiceError) {
      throw error;
    }

    if (
      error instanceof DOMException &&
      error.name === "AbortError"
    ) {
      throw new AgentServiceError(
        "SAJIB.AI took too long to respond. Please try again.",
      );
    }

    throw new AgentServiceError(
      "Unable to connect to SAJIB.AI. Please try again.",
    );
  } finally {
    window.clearTimeout(timeout);
  }
}
