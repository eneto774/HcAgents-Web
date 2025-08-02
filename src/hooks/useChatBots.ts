import { useState, useEffect, useCallback } from 'react'
import { api } from '@/services/api'
import { type Chat, type PaginatedResponse } from '@/types/types'
import { toast } from 'sonner'
import { useAuth } from './useAuth'

export const useChatBots = () => {
  const { user } = useAuth();
  const [chats, setChats] = useState<Chat[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchChats = async (userId: string) => {
    try {
      setIsLoading(true)
      setError(null)

      const params = new URLSearchParams()
      params.append('userId', userId)

      const response = await api.get<PaginatedResponse<Chat>>('/chat', { params })
      setChats(response.data.data)
    } catch (err) {
      const errorMessage = 'Erro ao carregar chats'
      setError(errorMessage)
      toast.error(errorMessage)
      console.error('Error fetching chats:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const createChat = useCallback(async (name: string, description: string, userId: string): Promise<Chat | null> => {
    try {
      setIsLoading(true)
      setError(null)

      const response = await api.post<{ data: Chat }>(
        '/chat',
        { chatName: name, botName: name, chatDescription: description, botDescription: description, userId }
      )
      const newChat = response.data.data

      setChats(prev => [newChat, ...prev])
      toast.success('ChatBot criado com sucesso!')

      return newChat
    } catch (err) {
      const errorMessage = 'Erro ao criar chatbot'
      setError(errorMessage)
      toast.error(errorMessage)
      console.error('Error creating chatbot:', err)
      return null
    } finally {
      setIsLoading(false)
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchChats(user?.id)
    }
  }, [user])

  return {
    isLoading,
    error,
    createChat,
    fetchChats,
    chats
  }
}
