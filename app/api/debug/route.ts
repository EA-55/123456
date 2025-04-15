import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/db"

export async function GET(req: NextRequest) {
  try {
    const supabase = createServerClient()

    // Test Supabase connection
    const { data, error } = await supabase.from("complaints").select("count").single()

    if (error) {
      return NextResponse.json(
        {
          supabaseConnection: false,
          error: error.message,
          details: error,
        },
        { status: 500 },
      )
    }

    // Get environment variables (non-sensitive ones only)
    const envVars = {
      NODE_ENV: process.env.NODE_ENV,
      NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
      // Don't include sensitive keys
    }

    return NextResponse.json({
      supabaseConnection: true,
      environment: envVars,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Debug API error:", error)
    return NextResponse.json({ error: "Internal server error", details: error.message }, { status: 500 })
  }
}
