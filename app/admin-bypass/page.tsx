"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminBypass() {
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleBypass = async (e: React.FormEvent) => {
    e.preventDefault()

    // Hardcoded emergency password - change this to something secure!
    const emergencyPassword = "Hamburg55"

    if (password === emergencyPassword) {
      // Manually set the auth cookie
      document.cookie = "admin_auth=authenticated; path=/; max-age=86400; samesite=lax"

      // Redirect to admin
      router.push("/admin")
    } else {
      setError("Falsches Notfall-Passwort")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-[350px] shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Admin Notfallzugriff</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleBypass}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Notfall-Passwort</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Notfall-Passwort"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && <div className="text-sm text-red-500 p-2 bg-red-50 rounded border border-red-200">{error}</div>}
              <Button type="submit" className="w-full">
                Notfallzugriff
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
