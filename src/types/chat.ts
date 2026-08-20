export type MessageRole = "assistant" | "user";

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  createdAt: number;
}

export interface AgentRequestMessage {
  role: MessageRole;
  content: string;
}

export interface AgentChatRequest {
  message: string;
  history: AgentRequestMessage[];
}

export interface AgentChatResponse {
  reply: string;
  provider?: "groq" | "gemini" | string;
}
