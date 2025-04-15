import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/db"
import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Validierung der Daten
    if (!data.companyName || !data.contactPerson || !data.email || !data.phone || !data.address) {
      return NextResponse.json({ success: false, message: "Bitte füllen Sie alle Pflichtfelder aus." }, { status: 400 })
    }

    // Generieren einer eindeutigen ID
    const id = crypto.randomUUID()

    // Erstellen des Registrierungsobjekts
    const registration = {
      id,
      type: "b2b",
      company_name: data.companyName,
      contact_person: data.contactPerson,
      email: data.email,
      phone: data.phone,
      address: data.address,
      business_type: data.businessType || "",
      message: data.message || "",
      created_at: new Date().toISOString(),
      status: "new",
    }

    // Speichern in Supabase
    const supabase = createServerClient()
    const { error } = await supabase.from("b2b_registrations").insert(registration)

    if (error) {
      console.error("Fehler beim Speichern der B2B-Registrierung:", error)
      return NextResponse.json({ success: false, message: "Fehler beim Speichern der Registrierung." }, { status: 500 })
    }

    // E-Mail senden
    const { companyName, contactPerson, email, phone, address, businessType, message } = data

    const info = await transporter.sendMail({
      from: `"B2B Registrierung" <${process.env.SMTP_USER}>`,
      to: "info@ersatzteilpartner24.de",
      subject: "Neue B2B Shop Registrierungsanfrage",
      text: `
        Firmenname: ${companyName}
        Ansprechpartner: ${contactPerson}
        E-Mail: ${email}
        Telefon: ${phone}
        Adresse: ${address}
        Art des Geschäfts: ${businessType}
        Nachricht: ${message}
      `,
      html: `
        <h2>Neue B2B Shop Registrierungsanfrage</h2>
        <p><strong>Firmenname:</strong> ${companyName}</p>
        <p><strong>Ansprechpartner:</strong> ${contactPerson}</p>
        <p><strong>E-Mail:</strong> ${email}</p>
        <p><strong>Telefon:</strong> ${phone}</p>
        <p><strong>Adresse:</strong> ${address}</p>
        <p><strong>Art des Geschäfts:</strong> ${businessType}</p>
        <p><strong>Nachricht:</strong> ${message}</p>
      `,
    })

    console.log("Message sent: %s", info.messageId)

    return NextResponse.json(
      {
        success: true,
        message: "Ihre Registrierung wurde erfolgreich übermittelt.",
        registration,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("B2B Registration error:", error)
    return NextResponse.json(
      { success: false, message: "Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut." },
      { status: 500 },
    )
  }
}
