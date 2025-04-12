import { createClient } from "@supabase/supabase-js"

// Typen für die Datenbank-Tabellen
export type Return = {
  id: string
  customer_number: string
  customer_name: string
  email: string
  comments?: string
  status: string
  processor_name?: string
  created_at: string
  updated_at: string
}

export type ReturnItem = {
  id: string
  return_id: string
  article_number: string
  quantity: number
  delivery_note_number?: string
  condition: string
  return_reason: string
  other_reason?: string
  created_at: string
  updated_at: string
}

// Erstellen eines Singleton-Clients für Server-Komponenten
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ""

if (!supabaseUrl || !supabaseKey) {
  console.warn("Supabase-Umgebungsvariablen fehlen. Bitte überprüfen Sie Ihre Konfiguration.")
}

export const supabaseAdmin = createClient(supabaseUrl, supabaseKey)

// Client-seitiger Supabase-Client (mit dem anonymen Schlüssel)
let supabaseClient: ReturnType<typeof createClient> | null = null

export const getSupabaseClient = () => {
  if (supabaseClient) return supabaseClient

  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn("Supabase-Umgebungsvariablen fehlen. Bitte überprüfen Sie Ihre Konfiguration.")
    return null
  }

  supabaseClient = createClient(supabaseUrl, supabaseAnonKey)
  return supabaseClient
}
