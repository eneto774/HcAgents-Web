import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { ArrowLeft, Mail } from "lucide-react"
import { api } from "@/services/api"
import { toast } from "sonner"
import { useAuth } from "@/hooks/useAuth"

export default function Login() {
  const [currentStep, setCurrentStep] = useState<"login" | "otp">("login")
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()

  const handleEmailSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault()
    try {
      if (!email) return

      setIsLoading(true)

      await api.post("/session/create", { email });

      toast.success("Código enviado para seu email!")

      setIsLoading(false)
      setCurrentStep("otp")
    }
    catch {
      toast.error("Erro ao enviar código, tente novamente.")
      setIsLoading(false)
      setCurrentStep("login")
    }
  }

  const handleOtpSubmit = async (e: React.FormEvent) => {
    try {

      e.preventDefault()
      if (otp.length !== 6) return

      setIsLoading(true)

      await login(email, otp);

      setIsLoading(false)
      setEmail("")
      setOtp("")
      toast.success("Login realizado com sucesso!")

    } catch {
      toast.error("Erro ao verificar código, tente novamente.")
      setIsLoading(false)
      setCurrentStep("login")
    }
  }

  const handleBackToLogin = () => {
    setCurrentStep("login")
    setOtp("")
  }

  const handleResendCode = async () => {
    await handleEmailSubmit();
  }

  if (currentStep === "login") {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
              <Mail className="h-6 w-6 text-blue-600" />
            </div>
            <CardTitle className="text-2xl font-bold">Fazer Login</CardTitle>
            <CardDescription>Digite seu email para receber o código de verificação</CardDescription>
          </CardHeader>
          <form onSubmit={handleEmailSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full mt-6" disabled={isLoading || !email}>
                {isLoading ? "Enviando..." : "Enviar Código"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <Mail className="h-6 w-6 text-green-600" />
          </div>
          <CardTitle className="text-2xl font-bold">Verificar Código</CardTitle>
          <CardDescription>
            Digite o código de 6 dígitos enviado para
            <br />
            <span className="font-medium text-gray-900">{email}</span>
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleOtpSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="otp" className="text-center block">
                Código de Verificação
              </Label>
              <div className="flex justify-center">
                <InputOTP maxLength={6} value={otp} onChange={(value) => setOtp(value)} disabled={isLoading}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">Não recebeu o código?</p>
              <Button
                type="button"
                variant="link"
                onClick={handleResendCode}
                disabled={isLoading}
                className="text-blue-600 hover:text-blue-800"
              >
                Reenviar código
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <Button type="submit" className="w-full" disabled={isLoading || otp.length !== 6}>
              {isLoading ? "Verificando..." : "Verificar Código"}
            </Button>
            <Button type="button" variant="ghost" onClick={handleBackToLogin} disabled={isLoading} className="w-full">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar para login
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
