import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

const INQUIRIES_FILE = path.join(process.cwd(), "motor-inquiries.json")

function readInquiries() {
  if (!fs.existsSync(INQUIRIES_FILE)) {
    return []
  }
  const data = fs.readFileSync(INQUIRIES_FILE, "utf8")
  return JSON.parse(data)
}

function writeInquiries(inquiries: any[]) {
  fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(inquiries, null, 2))
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  console.log("Received PUT request to update motor inquiry:", params.id)
  const id = params.id
  const { status } = await req.json()
  const inquiries = readInquiries()
  const inquiryIndex = inquiries.findIndex((i: any) => i.id === id)

  if (inquiryIndex === -1) {
    console.log("Inquiry not found:", id)
    return NextResponse.json({ error: "Anfrage nicht gefunden" }, { status: 404 })
  }

  inquiries[inquiryIndex].status = status
  writeInquiries(inquiries)

  console.log("Inquiry updated:", id)
  return NextResponse.json({ success: true })
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  console.log("Received DELETE request for motor inquiry:", params.id)
  const id = params.id
  let inquiries = readInquiries()
  inquiries = inquiries.filter((i: any) => i.id !== id)
  writeInquiries(inquiries)

  console.log("Inquiry deleted:", id)
  return NextResponse.json({ success: true })
}
