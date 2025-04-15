import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST(req: NextRequest) {
  cookies().delete("admin_auth")
  return NextResponse.json({ success: true })
}
