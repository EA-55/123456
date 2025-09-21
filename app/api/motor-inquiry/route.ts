import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import { v4 as uuidv4 } from "uuid"
import nodemailer from "nodemailer"

const INQUIRIES_FILE = path.join(process.cwd(), "motor-inquiries.json")

// Überprüfen der Umgebungsvariablen
const checkEnvVariables = () => {
  const requiredVars = ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS"]
  const missingVars = requiredVars.filter((varName) => !process.env[varName])

  if (missingVars.length > 0) {
    console.error(`Fehlende Umgebungsvariablen: ${missingVars.join(", ")}`)
    return false
  }
  return true
}

// E-Mail-Transporter erstellen
const createTransporter = () => {
  if (!checkEnvVariables()) {
    return null
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })
}

function readInquiries() {
  console.log("Lese Anfragen aus Datei:", INQUIRIES_FILE)
  if (!fs.existsSync(INQUIRIES_FILE)) {
    console.log("Anfragen-Datei existiert nicht. Erstelle neue Datei.")
    fs.writeFileSync(INQUIRIES_FILE, "[]")
    return []
  }
  const data = fs.readFileSync(INQUIRIES_FILE, "utf8")
  console.log("Gelesene Daten:", data)
  if (!data.trim()) {
    console.log("Datei ist leer. Gebe leeres Array zurück.")
    return []
  }
  try {
    return JSON.parse(data)
  } catch (error) {
    console.error("Fehler beim Parsen der JSON-Daten:", error)
    return []
  }
}

function writeInquiries(inquiries: any[]) {
  console.log("Schreibe Anfragen in Datei:", INQUIRIES_FILE)
  try {
    fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(inquiries, null, 2))
    console.log("Anfragen in Datei geschrieben. Anzahl der Anfragen:", inquiries.length)
  } catch (error) {
    console.error("Fehler beim Schreiben der Anfragen:", error)
  }
}

async function sendEmailNotification(inquiry: any) {
  const transporter = createTransporter()

  if (!transporter) {
    console.error("E-Mail-Transporter konnte nicht erstellt werden. Überprüfen Sie die Umgebungsvariablen.")
    return { success: false, error: "E-Mail-Transporter konnte nicht erstellt werden" }
  }

  try {
    const mailOptions = {
      from: `"Motoranfrage" <${process.env.SMTP_USER}>`,
      to: "info@ersatzteilpartner24.de",
      subject: "Neue Motoranfrage eingegangen",
      text: `
        Neue Motoranfrage von ${inquiry.name}
        E-Mail: ${inquiry.email}
        Telefon: ${inquiry.phone}
        Fahrzeugmodell: ${inquiry.carModel}
        Baujahr: ${inquiry.carYear}
        VIN: ${inquiry.vin}
        Motortyp: ${inquiry.engineType}
        Beschreibung: ${inquiry.description}
      `,
      html: `
        <h2>Neue Motoranfrage</h2>
        <p><strong>Name:</strong> ${inquiry.name}</p>
        <p><strong>E-Mail:</strong> ${inquiry.email}</p>
        <p><strong>Telefon:</strong> ${inquiry.phone}</p>
        <p><strong>Fahrzeugmodell:</strong> ${inquiry.carModel}</p>
        <p><strong>Baujahr:</strong> ${inquiry.carYear}</p>
        <p><strong>VIN:</strong> ${inquiry.vin}</p>
        <p><strong>Motortyp:</strong> ${inquiry.engineType}</p>
        <p><strong>Beschreibung:</strong> ${inquiry.description}</p>
      `,
    }

    await transporter.sendMail(mailOptions)
    console.log("E-Mail-Benachrichtigung gesendet")
    return { success: true }
  } catch (error) {
    console.error("Fehler beim Senden der E-Mail-Benachrichtigung:", error)
    return { success: false, error: error.message }
  }
}

export async function POST(req: Request) {
  console.log("POST-Anfrage für Motoranfrage erhalten")
  try {
    const inquiryData = await req.json()
    console.log("Empfangene Daten:", inquiryData)

    const id = uuidv4()
    const newInquiry = {
      id,
      ...inquiryData,
      date: new Date().toISOString(),
      status: "Neu",
    }

    console.log("Neue Anfrage erstellt:", newInquiry)

    // Speichern in der Datei
    const inquiries = readInquiries()
    inquiries.push(newInquiry)
    writeInquiries(inquiries)

    console.log("Neue Anfrage gespeichert. Aktuelle Anzahl der Anfragen:", inquiries.length)

    // Senden der E-Mail-Benachrichtigung
    const emailResult = await sendEmailNotification(inquiryData)

    if (!emailResult.success) {
      console.warn("E-Mail konnte nicht gesendet werden:", emailResult.error)
    }

    return NextResponse.json({
      success: true,
      message: "Anfrage erfolgreich gesendet",
      id,
    })
  } catch (error) {
    console.error("Fehler beim Verarbeiten der Anfrage:", error)
    return NextResponse.json({ success: false, error: "Interner Serverfehler" }, { status: 500 })
  }
}

export async function GET() {
  console.log("GET-Anfrage für Motoranfragen erhalten")
  const inquiries = readInquiries()
  console.log("Zurückgegebene Anfragen:", inquiries)
  return NextResponse.json(inquiries)
}
