
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Bot, MessageCircle, Plus } from 'lucide-react'
import { useChatBots } from '@/hooks/useChatBots'
import { ChatCard } from '@/components/chat-card'
import { ChatModal } from '@/components/chat-modal'
import { LoadingSpinner } from '@/components/loading-spinner'
import { useAuth } from '@/hooks/useAuth'
import type { Chat } from '@/types/types'

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null)
  const [chatModalOpen, setChatModalOpen] = useState(false)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newChatName, setNewChatName] = useState('')
  const [newChatDescription, setNewChatDescription] = useState('')

  const { user } = useAuth()
  const { chats, isLoading, createChat } = useChatBots()

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    chat.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleChatClick = (chat: Chat) => {
    setSelectedChat(chat)
    setChatModalOpen(true)
  }

  const handleCreateChat = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!newChatName.trim() || !newChatDescription.trim() || !user) return

    const success = await createChat(newChatName, newChatDescription, user?.id)
    if (success) {
      setNewChatName('')
      setNewChatDescription('')
      setShowCreateForm(false)
    }
  }

  if (isLoading && chats.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <LoadingSpinner size="lg" className="mx-auto mb-4" />
            <p className="text-muted-foreground">Carregando seus chats...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">

      <div className="flex flex-col gap-6 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Meus Chats</h1>
            <p className="text-muted-foreground mt-1">
              Gerencie seus chats com bots de IA
            </p>
          </div>
          <Button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            Criar Novo Chat
          </Button>
        </div>

        {showCreateForm && (
          <div className="bg-muted/50 p-4 rounded-lg border">
            <form onSubmit={handleCreateChat} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Nome do Chat</label>
                  <Input
                    placeholder="Ex: Assistente de Vendas"
                    value={newChatName}
                    onChange={(e) => setNewChatName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Descrição</label>
                  <Input
                    placeholder="Ex: Bot para ajudar com vendas"
                    value={newChatDescription}
                    onChange={(e) => setNewChatDescription(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Criando...' : 'Criar Chat'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowCreateForm(false)}
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </div>
        )}

        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar chats..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Bot className="h-4 w-4" />
            <span>{chats.length} chats</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MessageCircle className="h-4 w-4" />
            <span>Conversas ativas</span>
          </div>
        </div>
      </div>

      {filteredChats.length === 0 ? (
        <div className="text-center py-12">
          {searchTerm ? (
            <div>
              <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">Nenhum chat encontrado</h3>
              <p className="text-muted-foreground mb-4">
                Não encontramos chats que correspondam à sua busca "{searchTerm}"
              </p>
              <Button variant="outline" onClick={() => setSearchTerm('')}>
                Limpar busca
              </Button>
            </div>
          ) : (
            <div>
              <Bot className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">Nenhum chat criado ainda</h3>
              <p className="text-muted-foreground mb-4">
                Crie seu primeiro chat para começar a conversar com IA
              </p>
              <Button onClick={() => setShowCreateForm(true)} className="gap-2">
                <Plus className="h-4 w-4" />
                Criar Primeiro Chat
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChats.map((chat) => (
            <ChatCard
              key={chat?.id}
              chat={chat}
              onClick={() => handleChatClick(chat)}
            />
          ))}
        </div>
      )}

      <ChatModal
        chat={selectedChat}
        open={chatModalOpen}
        onOpenChange={setChatModalOpen}
      />
    </div>
  )
}

export default Home