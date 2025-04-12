import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

const INQUIRIES_FILE = path.join(process.cwd(), "motor-inquiries.json")

export async function GET() {
  try {
    if (fs.existsSync(INQUIRIES_FILE)) {
      const data = fs.readFileSync(INQUIRIES_FILE, "utf8")
      const stats = fs.statSync(INQUIRIES_FILE)
      return NextResponse.json({
        fileExists: true,
        fileContent: data,
        fileStats: {
          size: stats.size,
          created: stats.birthtime,
          modified: stats.mtime,
        },
      })
    } else {
      return NextResponse.json({ fileExists: false, error: "File does not exist" }, { status: 404 })
    }
  } catch (error) {
    console.error("Error reading file:", error)
    return NextResponse.json({ error: "Internal server error", details: error.message }, { status: 500 })
  }
}
