import { NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { v4 as uuidv4 } from "uuid"

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

export async function POST(req: Request) {
  const { name, email, phone, message } = await req.json()

  // Erstellen einer Kontaktanfrage für den Admin-Bereich
  const contactInquiry = {
    id: uuidv4(),
    type: "contact",
    data: { name, email, phone, message },
    timestamp: new Date().toISOString(),
    status: "new",
  }

  try {
    // E-Mail senden
    const transporter = createTransporter()

    if (!transporter) {
      console.error("E-Mail-Transporter konnte nicht erstellt werden. Überprüfen Sie die Umgebungsvariablen.")

      // Trotzdem die Anfrage für den Admin-Bereich zurückgeben
      return NextResponse.json(
        {
          message: "Anfrage gespeichert, aber E-Mail konnte nicht gesendet werden",
          inquiry: contactInquiry,
        },
        { status: 200 },
      )
    }

    const info = await transporter.sendMail({
      from: `"Kontaktformular" <${process.env.SMTP_USER}>`,
      to: "info@ersatzteilpartner24.de",
      subject: "Neue Kontaktanfrage von der Website",
      text: `
        Name: ${name}
        Email: ${email}
        Telefon: ${phone}
        Nachricht: ${message}
      `,
      html: `
        <h2>Neue Kontaktanfrage</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Telefon:</strong> ${phone}</p>
        <p><strong>Nachricht:</strong> ${message}</p>
      `,
    })

    console.log("Message sent: %s", info.messageId)

    // Anfrage und Bestätigung zurückgeben
    return NextResponse.json(
      {
        message: "Email sent successfully",
        inquiry: contactInquiry,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Detailed error:", error)

    // Trotz Fehler die Anfrage zurückgeben, damit sie im Admin-Bereich angezeigt werden kann
    return NextResponse.json(
      {
        error: "Failed to send email",
        details: error.message,
        inquiry: contactInquiry,
      },
      { status: 500 },
    )
  }
}
