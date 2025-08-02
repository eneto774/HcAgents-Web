import { useAuth } from "@/hooks/useAuth"
import { ModeToggle } from "./mode-toggle"
import { UserButton } from "./user-button"

export const Header = () => {
  const { isAuthenticated } = useAuth()
  return (
    <div className="flex items-center justify-between p-4">
      <a href="/">
        <h1 className="text-2xl font-bold">Hc Agents</h1>
      </a>
      <div className="flex items-center gap-2">
        <ModeToggle />
        {isAuthenticated && <UserButton />}
      </div>
    </div>
  )
}