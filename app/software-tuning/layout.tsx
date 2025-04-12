"use client"

import type React from "react"

import { PasswordProtection } from "@/components/password-protection"

export default function SoftwareTuningLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <PasswordProtection correctPassword="Hamburg55">{children}</PasswordProtection>
}
