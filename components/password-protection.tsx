"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Lock, AlertTriangle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface PasswordProtectionProps {
  correctPassword: string
  children: React.ReactNode
}

export function PasswordProtection({ correctPassword, children }: PasswordProtectionProps) {
  const [password, setPassword] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [error, setError] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if already authenticated in this session
    const authenticated = sessionStorage.getItem("tuningAuthenticated") === "true"
    if (authenticated) {
      setIsAuthenticated(true)
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (password === correctPassword) {
      setIsAuthenticated(true)
      setError(false)
      // Store authentication in session storage
      sessionStorage.setItem("tuningAuthenticated", "true")
    } else {
      setError(true)
      setPassword("")
    }
  }

  const handleBack = () => {
    router.push("/")
  }

  if (isAuthenticated) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="w-[350px] shadow-lg">
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Lock className="h-6 w-6 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl text-center">Geschützter Bereich</CardTitle>
            <CardDescription className="text-center">Bitte geben Sie das Passwort ein, um fortzufahren</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Input
                    id="password"
                    type="password"
                    placeholder="Passwort"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className={error ? "border-red-500" : ""}
                  />
                  {error && (
                    <div className="flex items-center text-red-500 text-sm mt-1">
                      <AlertTriangle className="h-4 w-4 mr-1" />
                      <span>Falsches Passwort</span>
                    </div>
                  )}
                </div>
                <div className="flex flex-col space-y-2">
                  <Button type="submit">Zugang erhalten</Button>
                  <Button type="button" variant="outline" onClick={handleBack}>
                    Zurück zur Startseite
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <p className="text-xs text-center w-full text-muted-foreground">
              Dieser Bereich ist nur für autorisierte Benutzer zugänglich.
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}
