import fs from "fs"
import path from "path"

const INQUIRIES_FILE = path.join(process.cwd(), "motor-inquiries.json")

export function readInquiries() {
  if (!fs.existsSync(INQUIRIES_FILE)) {
    console.log("Inquiries file does not exist. Creating new file.")
    fs.writeFileSync(INQUIRIES_FILE, "[]")
    return []
  }
  const data = fs.readFileSync(INQUIRIES_FILE, "utf8")
  return JSON.parse(data)
}
