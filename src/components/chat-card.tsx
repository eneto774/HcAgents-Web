import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Bot, MessageCircle } from 'lucide-react'
import { type Chat } from '@/types/types'
import { cn } from '@/lib/utils'
import { formatDate } from '@/utils/formatDate'

interface ChatCardProps {
  chat: Chat
  onClick: () => void
  className?: string
}

export function ChatCard({ chat, onClick, className }: ChatCardProps) {

  return (
    <Card
      className={cn(
        'hover:shadow-md transition-all cursor-pointer hover:scale-[1.02]',
        className
      )}
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start gap-3">
          <Avatar className="h-12 w-12">
            <AvatarFallback>
              <Bot className="h-6 w-6" />
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0 h-20">
            <CardTitle className="text-lg truncate">{chat.name}</CardTitle>
            <CardDescription className="mt-1 line-clamp-2">
              {chat.description}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MessageCircle className="h-4 w-4" />
          <span>Chat criado em {formatDate(chat?.createdAt)}</span>
        </div>
      </CardContent>
    </Card>
  )
}
