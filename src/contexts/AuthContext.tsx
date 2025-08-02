import { useJwt } from "@/hooks/useJwt"
import { api } from "@/services/api"
import { createContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export interface AuthData {
  userId: string
  user: User
  accessToken: string
}

export interface User {
  name: string
  email: string
  secret: string | null
  id: string
  createdAt: string
}


type AuthContextType = {
  user: User | null
  accessToken: string | null
  isAuthenticated: boolean
  isInitialized: boolean
  login: (user: string, otp: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  accessToken: null,
  login: async () => { },
  logout: () => { },
  isAuthenticated: false,
  isInitialized: false,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { isValidToken, updateSession } = useJwt()
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null)
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [isInitialized, setIsInitialized] = useState<boolean>(false)

  const login = async (email: string, otp: string) => {
    try {

      const response = await api.post("/session/validate", { email, otp });
      const { user, accessToken } = response.data.data;

      setUser(user)
      setAccessToken(accessToken)
      setIsAuthenticated(true)
      localStorage.setItem("@HcAgents:user", JSON.stringify(user))
      localStorage.setItem("@HcAgents:accessToken", accessToken)

      api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    } catch (error) {
      console.log(error)
      throw error;
    }
  }

  const logout = () => {
    setUser(null)
    setAccessToken(null)
    setIsAuthenticated(false)
    localStorage.removeItem("@HcAgents:user")
    localStorage.removeItem("@HcAgents:accessToken")
    delete api.defaults.headers.common.Authorization
  }



  useEffect(() => {
    const initialize = async () => {
      setIsInitialized(true)
      try {
        const accessToken = localStorage.getItem("@HcAgents:accessToken")
        const user = localStorage.getItem("@HcAgents:user")

        if (accessToken && user && isValidToken(accessToken)) {
          updateSession(accessToken)
          setUser(JSON.parse(user))
          setAccessToken(accessToken)
          setIsAuthenticated(true);
          navigate("/home");
        }
      } catch {
        setIsAuthenticated(false);
        navigate("/");
      }
    }
    initialize()
  }, [])

  return (
    <AuthContext.Provider value={{ user, accessToken, login, logout, isAuthenticated, isInitialized }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
