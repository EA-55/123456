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

export const sendEmailNotification = async (inquiry: any) => {
  try {
    const info = await transporter.sendMail({
      from: `"Motoranfrage" <${process.env.SMTP_USER}>`,
      to: "info@ersatzteilpartner24.de",
      subject: "Neue Motoranfrage von der Website",
      text: `
        Name: ${inquiry.name}
        Email: ${inquiry.email}
        Telefon: ${inquiry.phone}
        Fahrzeugmodell: ${inquiry.carModel}
        Baujahr: ${inquiry.carYear}
        Fahrgestellnummer (VIN): ${inquiry.vin}
        Motortyp: ${inquiry.engineType}
        Beschreibung: ${inquiry.description}
      `,
      html: `
        <h2>Neue Motoranfrage</h2>
        <p><strong>Name:</strong> ${inquiry.name}</p>
        <p><strong>Email:</strong> ${inquiry.email}</p>
        <p><strong>Telefon:</strong> ${inquiry.phone}</p>
        <p><strong>Fahrzeugmodell:</strong> ${inquiry.carModel}</p>
        <p><strong>Baujahr:</strong> ${inquiry.carYear}</p>
        <p><strong>Fahrgestellnummer (VIN):</strong> ${inquiry.vin}</p>
        <p><strong>Motortyp:</strong> ${inquiry.engineType}</p>
        <p><strong>Beschreibung:</strong> ${inquiry.description}</p>
      `,
    })

    console.log("Message sent: %s", info.messageId)
    return { success: true, message: "Email sent successfully" }
  } catch (error) {
    console.error("Error sending email:", error)
    return { success: false, error: "Failed to send email", details: error.message }
  }
}
