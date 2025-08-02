import { ThemeProvider } from "@/components/theme-provider"
import { Outlet } from "react-router-dom"
import { Header } from "./components/header"
import { Toaster } from "sonner"
import { AuthProvider } from "./contexts/AuthContext"

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <Header />
        <Toaster />
        <Outlet />
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App