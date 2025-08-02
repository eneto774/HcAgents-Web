export interface Bot {
  id: string
  name: string
  description: string
  createdBy: string
  createdAt: Date
}

export interface Chat {
  id: string
  botId: string
  userId: string
  name: string
  description: string
  createdAt: Date | string
  createdBy: string
}

export interface Message {
  id: string
  chatId: string
  content: string
  isUserMessage: boolean
  createdAt: Date | string
}

export interface CreateBotRequest {
  name: string
  description: string
}

export interface CreateChatRequest {
  botId: string
  title?: string
}

export interface SendMessageRequest {
  chatId: string
  content: string
}

export interface PaginatedResponse<T> {
  data: T[]
}

export interface ChatHistoryResponse extends PaginatedResponse<Message> { }

export interface CreateBotModalProps {
  onCreateBot: (name: string, description: string, userId: string) => Promise<void>
  isLoading?: boolean
}
