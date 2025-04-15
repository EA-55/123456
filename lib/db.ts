import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/types/supabase"

// Singleton für den Client-seitigen Supabase-Client
let clientSingleton: ReturnType<typeof createClientBrowser> | null = null

// Client-seitiger Supabase-Client (mit anonymem Schlüssel)
export function createClientBrowser() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

  return createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  })
}

// Server-seitiger Supabase-Client (mit Service-Role-Schlüssel)
export function createServerClient() {
  const supabaseUrl = process.env.SUPABASE_URL || ""
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ""

  return createClient<Database>(supabaseUrl, supabaseServiceKey, {
    auth: {
      persistSession: false,
    },
  })
}

// Singleton-Getter für Client-seitigen Supabase-Client
export function getClientBrowser() {
  if (!clientSingleton) {
    clientSingleton = createClientBrowser()
  }
  return clientSingleton
}

// Für Abwärtskompatibilität
export function createClient() {
  // Prüfen, ob wir im Browser oder auf dem Server sind
  if (typeof window !== "undefined") {
    return getClientBrowser()
  } else {
    return createServerClient()
  }
}

const db = {
  getClientBrowser,
  createServerClient,
  createClient,
}

export default db
