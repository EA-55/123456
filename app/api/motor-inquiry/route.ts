import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/db"
import { v4 as uuidv4 } from "uuid"
import nodemailer from "nodemailer"

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

export async function POST(req: NextRequest) {
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

    // Speichern in Supabase
    const supabase = createServerClient()
    const { error } = await supabase.from("motor_inquiries").insert(newInquiry)

    if (error) {
      console.error("Fehler beim Speichern der Anfrage:", error)
      return NextResponse.json({ success: false, error: "Fehler beim Speichern der Anfrage" }, { status: 500 })
    }

    console.log("Neue Anfrage gespeichert.")

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

export async function GET(req: NextRequest) {
  console.log("GET-Anfrage für Motoranfragen erhalten")
  try {
    const supabase = createServerClient()
    const { data, error } = await supabase.from("motor_inquiries").select("*")

    if (error) {
      console.error("Fehler beim Abrufen der Anfragen:", error)
      return NextResponse.json({ success: false, error: "Fehler beim Abrufen der Anfragen" }, { status: 500 })
    }

    console.log("Zurückgegebene Anfragen:", data.length)
    return NextResponse.json(data)
  } catch (error) {
    console.error("Fehler beim Verarbeiten der Anfrage:", error)
    return NextResponse.json({ success: false, error: "Interner Serverfehler" }, { status: 500 })
  }
}
