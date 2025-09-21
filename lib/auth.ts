import type { NextRequest } from "next/server"

export function isAuthenticated(req: NextRequest) {
  const authCookie = req.cookies.get("admin_auth")?.value
  return authCookie === "authenticated"
}
