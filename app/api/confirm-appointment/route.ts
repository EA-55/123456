import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

const APPOINTMENTS_FILE = path.join(process.cwd(), "appointments.json")

function readAppointments() {
  if (!fs.existsSync(APPOINTMENTS_FILE)) {
    return []
  }
  const data = fs.readFileSync(APPOINTMENTS_FILE, "utf8")
  return JSON.parse(data)
}

function writeAppointments(appointments: any[]) {
  fs.writeFileSync(APPOINTMENTS_FILE, JSON.stringify(appointments, null, 2))
}

export async function POST(req: Request) {
  const { date, name, email } = await req.json()

  const appointments = readAppointments()
  const appointmentIndex = appointments.findIndex(
    (a) => a.date.split("T")[0] === date.split("T")[0] && a.name === name && a.email === email,
  )

  if (appointmentIndex === -1) {
    return NextResponse.json({ error: "Termin nicht gefunden" }, { status: 400 })
  }

  appointments[appointmentIndex].confirmed = true
  writeAppointments(appointments)

  return NextResponse.json({ success: true, message: "Termin erfolgreich bestätigt" })
}
