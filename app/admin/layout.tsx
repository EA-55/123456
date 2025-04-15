import type React from "react"
import { AdminClient } from "./client"

export const dynamic = "force-dynamic"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AdminClient />
}
