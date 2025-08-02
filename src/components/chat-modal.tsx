import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Send, Bot, User, Loader2 } from 'lucide-react'
import { useMessages } from '@/hooks/useMessages'
import { type Chat } from '@/types/types'
import { cn } from '@/lib/utils'
import styles from './ChatModal.module.css'
import { formatDate } from '@/utils/formatDate'

interface ChatModalProps {
  chat: Chat | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ChatModal({ chat, open, onOpenChange }: ChatModalProps) {
  const [message, setMessage] = useState('')
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const {
    messages,
    isLoading,
    isSending,
    sendMessage,
  } = useMessages(chat?.id)

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!message.trim() || isSending) return

    const success = await sendMessage(message)
    if (success) {
      setMessage('')
    }
  }

  const scrollToBottom = (smooth = true) => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: smooth ? 'smooth' : 'auto',
        block: 'end'
      })
    }
  }

  useEffect(() => {
    if (messages.length > 0 && !isLoading) {
      const lastMessage = messages[messages.length - 1]
      if (lastMessage?.isUserMessage) {
        setTimeout(() => scrollToBottom(true), 50)
      } else {
        setTimeout(() => scrollToBottom(true), 200)
      }
    }
  }, [messages, isLoading])

  useEffect(() => {
    if (open && messages.length > 0) {
      setTimeout(() => scrollToBottom(false), 300)
    }
  }, [open, messages.length])

  if (!chat) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] h-[80vh] flex flex-col p-0">
        <DialogHeader className="px-6 py-4 border-b">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarFallback>
                <Bot className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <DialogTitle className="text-left">{chat.name}</DialogTitle>
              <p className="text-sm text-muted-foreground">{chat.description}</p>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 flex flex-col min-h-0">
          <ScrollArea className={cn("flex-1", styles.chatScrollArea)} ref={scrollAreaRef}>
            <div className={cn("px-6", styles.messageContainer)}>
              <div className={styles.messagesWrapper}>

                <div className="space-y-4 py-4 flex-1">
                  {messages.map((msg, index) => (
                    <div
                      key={msg?.id}
                      className={cn(
                        'flex gap-3',
                        msg?.isUserMessage ? 'justify-end' : 'justify-start'
                      )}
                      title={`Mensagem ${index + 1} - ${new Date(msg?.createdAt).toLocaleString()}`}
                    >
                      {!msg?.isUserMessage && (
                        <Avatar className="h-8 w-8 mt-1 flex-shrink-0">
                          <AvatarFallback>
                            <Bot className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                      )}

                      <div
                        className={cn(
                          'max-w-[70%] rounded-lg px-3 py-2 break-words',
                          msg?.isUserMessage
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted'
                        )}
                      >
                        <p className="text-sm whitespace-pre-wrap">{msg?.content}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {formatDate(msg?.createdAt)}
                        </p>
                      </div>

                      {msg?.isUserMessage && (
                        <Avatar className="h-8 w-8 mt-1 flex-shrink-0">
                          <AvatarFallback>
                            <User className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  ))}
                  <div ref={messagesEndRef} className="h-4" />
                </div>
              </div>
            </div>
          </ScrollArea>

          <div className="border-t p-4">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <Input
                placeholder="Digite sua mensagem..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={isSending}
                className="flex-1"
              />
              <Button
                type="submit"
                size="icon"
                disabled={!message.trim() || isSending}
              >
                {isSending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
