import { useState, useEffect, useCallback } from 'react'
import { api } from '@/services/api'
import { type Message, type PaginatedResponse } from '@/types/types'
import { toast } from 'sonner'

export const useMessages = (chatId?: string) => {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchMessages = useCallback(async () => {
    if (!chatId) return

    try {
      setIsLoading(true)
      setError(null)

      const params = new URLSearchParams()
      params.append('chatId', chatId)

      const response = await api.get<PaginatedResponse<Message>>('/message', { params })
      const { data } = response.data

      const sortedMessages = data.sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime()
        const dateB = new Date(b.createdAt).getTime()
        return dateA - dateB
      })
      setMessages(sortedMessages)

    } catch (err) {
      const errorMessage = 'Erro ao carregar mensagens'
      setError(errorMessage)
      toast.error(errorMessage)
      console.error('Error fetching messages:', err)
    } finally {
      setIsLoading(false)
    }
  }, [chatId])

  const loadMoreMessages = useCallback(async () => {
    if (isLoading) return
    await fetchMessages()
  }, [isLoading, fetchMessages])

  const sendMessage = useCallback(async (content: string): Promise<boolean> => {
    if (!chatId || !content.trim()) return false

    try {
      setIsSending(true)
      setError(null)

      const tempUserMessage: Message = {
        id: `temp-${Date.now()}`,
        chatId,
        content: content.trim(),
        isUserMessage: true,
        createdAt: new Date(),
      }

      setMessages(prev => [...prev, tempUserMessage])
      const tempBotMessage: Message = {
        id: `loading-${Date.now()}`,
        chatId,
        content: 'Digitando...',
        isUserMessage: false,
        createdAt: new Date(),
      }

      setMessages(prev => [...prev, tempBotMessage])

      const response = await api.post<{ data: Message }>('/message', {
        chatId,
        content: content.trim(),
      })

      const botMessage = response.data.data

      setMessages(prev =>
        prev
          .filter(msg => !msg?.id.startsWith('loading-'))
          .concat([botMessage])
      )

      return true
    } catch (err) {
      setMessages(prev =>
        prev.filter(msg => !msg?.id.startsWith('loading-'))
      )

      const errorMessage = 'Erro ao enviar mensagem'
      setError(errorMessage)
      toast.error(errorMessage)
      console.error('Error sending message:', err)
      return false
    } finally {
      setIsSending(false)
    }
  }, [chatId])

  const clearMessages = useCallback(() => {
    setMessages([])
    setError(null)
  }, [])

  useEffect(() => {
    if (chatId) {
      clearMessages()
      fetchMessages()
    }
  }, [chatId, fetchMessages, clearMessages])

  return {
    messages,
    isLoading,
    isSending,
    error,
    fetchMessages,
    loadMoreMessages,
    sendMessage,
    clearMessages,
  }
}
