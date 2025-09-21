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

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Validierung der Daten
    if (!data.companyName || !data.contactPerson || !data.email || !data.phone || !data.address) {
      return new Response(JSON.stringify({ success: false, message: "Bitte füllen Sie alle Pflichtfelder aus." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    // Generieren einer eindeutigen ID
    const id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

    // Erstellen des Registrierungsobjekts
    const registration = {
      id,
      type: "b2b",
      data,
      timestamp: new Date().toISOString(),
      status: "new",
    }

    // In einer echten Implementierung würden Sie hier die Daten in einer Datenbank speichern
    // Da wir localStorage serverseitig nicht verwenden können, geben wir die Daten zurück
    // und speichern sie clientseitig

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

    return new Response(
      JSON.stringify({
        success: true,
        message: "Ihre Registrierung wurde erfolgreich übermittelt.",
        registration,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    )
  } catch (error) {
    console.error("B2B Registration error:", error)
    return new Response(
      JSON.stringify({ success: false, message: "Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut." }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    )
  }
}
