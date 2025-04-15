import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/db"

// Korrekte Typisierung für Next.js 15
export async function GET(request: NextRequest, context: { params: { id: string } }) {
  try {
    const id = context.params.id
    const supabase = createClient()

    // Fetch the return
    const { data, error } = await supabase.from("returns").select("*").eq("id", id).single()

    if (error) {
      console.error("Error fetching return:", error)
      return NextResponse.json({ error: "Failed to fetch return" }, { status: 500 })
    }

    if (!data) {
      return NextResponse.json({ error: "Return not found" }, { status: 404 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching return:", error)
    return NextResponse.json({ error: "Failed to fetch return data" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, context: { params: { id: string } }) {
  try {
    const id = context.params.id
    const supabase = createClient()
    const body = await request.json()

    // Update the return
    const { data, error } = await supabase.from("returns").update(body).eq("id", id).select().single()

    if (error) {
      console.error("Error updating return:", error)
      return NextResponse.json({ error: "Failed to update return" }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error updating return:", error)
    return NextResponse.json({ error: "Failed to update return" }, { status: 500 })
  }
}
