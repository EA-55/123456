import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase"

export async function POST() {
  try {
    const supabase = createClient()

    // Lösche vorhandene Testdaten
    await supabase.from("complaint_attachments").delete().neq("id", "00000000-0000-0000-0000-000000000000")
    await supabase.from("complaint_vehicle_data").delete().neq("id", "00000000-0000-0000-0000-000000000000")
    await supabase.from("complaint_items").delete().neq("id", "00000000-0000-0000-0000-000000000000")
    await supabase.from("complaints").delete().neq("id", "00000000-0000-0000-0000-000000000000")

    // Erstelle 10 Testreklamationen
    const complaints = []
    const statuses = ["pending", "in-progress", "completed", "rejected"]
    const customerNames = [
      "Max Mustermann",
      "Anna Schmidt",
      "Thomas Müller",
      "Lisa Weber",
      "Michael Schneider",
      "Julia Fischer",
      "Markus Wagner",
      "Sarah Becker",
      "Daniel Hoffmann",
      "Laura Meyer",
    ]
    const customerEmails = [
      "max.mustermann@example.com",
      "anna.schmidt@example.com",
      "thomas.mueller@example.com",
      "lisa.weber@example.com",
      "michael.schneider@example.com",
      "julia.fischer@example.com",
      "markus.wagner@example.com",
      "sarah.becker@example.com",
      "daniel.hoffmann@example.com",
      "laura.meyer@example.com",
    ]
    const phoneNumbers = [
      "+49 123 456789",
      "+49 234 567890",
      "+49 345 678901",
      "+49 456 789012",
      "+49 567 890123",
      "+49 678 901234",
      "+49 789 012345",
      "+49 890 123456",
      "+49 901 234567",
      "+49 012 345678",
    ]
    const receiptNumbers = [
      "R-2023-1234",
      "R-2023-2345",
      "R-2023-3456",
      "R-2023-4567",
      "R-2023-5678",
      "R-2023-6789",
      "R-2023-7890",
      "R-2023-8901",
      "R-2023-9012",
      "R-2023-0123",
    ]
    const descriptions = [
      "Der Motor springt nicht an und macht seltsame Geräusche. Ich habe bereits versucht, die Batterie zu überprüfen, aber das Problem besteht weiterhin.",
      "Die Bremsen quietschen sehr laut und die Bremsleistung hat nachgelassen. Dies tritt besonders bei Nässe auf.",
      "Das Getriebe schaltet nicht mehr richtig und es gibt Probleme beim Wechsel zwischen den Gängen.",
      "Die Kupplung rutscht durch und das Fahrzeug beschleunigt nicht mehr richtig.",
      "Die Lichtmaschine lädt die Batterie nicht mehr auf, die Warnleuchte im Armaturenbrett leuchtet ständig.",
      "Der Turbolader macht pfeifende Geräusche und das Fahrzeug verliert an Leistung.",
      "Die Einspritzpumpe funktioniert nicht mehr richtig, der Motor läuft unrund und verbraucht mehr Kraftstoff.",
      "Der Anlasser dreht nicht mehr durch, es ist nur ein Klicken zu hören.",
      "Die Wasserpumpe ist undicht und es tritt Kühlflüssigkeit aus.",
      "Die Zylinderkopfdichtung ist defekt, es kommt Öl ins Kühlwasser und der Motor überhitzt.",
    ]
    const deliveryForms = ["personal", "shipping", "pickup"]
    const processingTypes = ["return", "exchange", "repair"]
    const vehicleTypes = ["car", "truck", "motorcycle", "ship", "train"]
    const manufacturers = [
      "BMW",
      "Mercedes-Benz",
      "Audi",
      "Volkswagen",
      "Ford",
      "Opel",
      "Toyota",
      "Renault",
      "Fiat",
      "Peugeot",
    ]
    const models = ["3er", "C-Klasse", "A4", "Golf", "Focus", "Astra", "Corolla", "Clio", "500", "308"]
    const years = ["2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023"]
    const installers = ["user", "workshop", "dealer"]

    // Artikel-Daten
    const articleManufacturers = [
      "Bosch",
      "Continental",
      "Brembo",
      "Valeo",
      "Hella",
      "Mahle",
      "ZF",
      "Schaeffler",
      "Denso",
      "NGK",
    ]
    const articleNames = [
      "Bremssattel vorne links",
      "Lichtmaschine 120A",
      "Ölfilter",
      "Luftfilter",
      "Zündkerzen Set",
      "Wasserpumpe",
      "Kupplung komplett",
      "Stoßdämpfer hinten",
      "Lambdasonde",
      "Anlasser",
      "Turbolader",
      "Einspritzpumpe",
      "Zylinderkopfdichtung",
      "Kurbelwellensensor",
      "Nockenwellensensor",
    ]

    for (let i = 0; i < 10; i++) {
      const complaintId = crypto.randomUUID()
      const status = statuses[Math.floor(Math.random() * statuses.length)]
      const hasAttachments = Math.random() > 0.5
      const hasDiagnosticOutput = Math.random() > 0.7

      // Erstelle Reklamation
      const complaint = {
        id: complaintId,
        customer_number: `KD-${100000 + i}`,
        customer_name: customerNames[i],
        email: customerEmails[i],
        phone: Math.random() > 0.3 ? phoneNumbers[i] : null,
        receipt_number: receiptNumbers[i],
        description: descriptions[i],
        error_date: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
        delivery_form: deliveryForms[Math.floor(Math.random() * deliveryForms.length)],
        preferred_processing: processingTypes[Math.floor(Math.random() * processingTypes.length)],
        additional_info: Math.random() > 0.5 ? "Zusätzliche Informationen zur Reklamation." : null,
        additional_costs: Math.random() > 0.7,
        has_attachments: hasAttachments,
        has_diagnostic_output: hasDiagnosticOutput,
        status,
        processor_name: status !== "pending" ? "Admin" : null,
        created_at: new Date(Date.now() - Math.floor(Math.random() * 60) * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date().toISOString(),
      }

      const { error: complaintError } = await supabase.from("complaints").insert(complaint)

      if (complaintError) {
        throw new Error(`Fehler beim Erstellen der Reklamation: ${complaintError.message}`)
      }

      // Erstelle 1-3 Artikel pro Reklamation
      const numItems = Math.floor(Math.random() * 3) + 1
      for (let j = 0; j < numItems; j++) {
        const manufacturerIndex = Math.floor(Math.random() * articleManufacturers.length)
        const nameIndex = Math.floor(Math.random() * articleNames.length)

        const item = {
          id: crypto.randomUUID(),
          complaint_id: complaintId,
          manufacturer: articleManufacturers[manufacturerIndex],
          article_index: `ART-${1000 + Math.floor(Math.random() * 9000)}`,
          article_name: articleNames[nameIndex],
          purchase_date: new Date(Date.now() - Math.floor(Math.random() * 365) * 24 * 60 * 60 * 1000).toISOString(),
          quantity: Math.floor(Math.random() * 3) + 1,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }

        const { error: itemError } = await supabase.from("complaint_items").insert(item)

        if (itemError) {
          throw new Error(`Fehler beim Erstellen des Artikels: ${itemError.message}`)
        }
      }

      // Erstelle Fahrzeugdaten
      const vehicleTypeIndex = Math.floor(Math.random() * vehicleTypes.length)
      const manufacturerIndex = Math.floor(Math.random() * manufacturers.length)
      const modelIndex = Math.floor(Math.random() * models.length)
      const yearIndex = Math.floor(Math.random() * years.length)
      const installerIndex = Math.floor(Math.random() * installers.length)

      const installationDate = new Date(Date.now() - Math.floor(Math.random() * 365) * 24 * 60 * 60 * 1000)
      const removalDate = new Date(installationDate.getTime() + Math.floor(Math.random() * 180) * 24 * 60 * 60 * 1000)
      const mileageInstallation = 50000 + Math.floor(Math.random() * 50000)
      const mileageRemoval = mileageInstallation + Math.floor(Math.random() * 10000)

      const vehicleData = {
        id: crypto.randomUUID(),
        complaint_id: complaintId,
        vehicle_type: vehicleTypes[vehicleTypeIndex],
        manufacturer: manufacturers[manufacturerIndex],
        model: models[modelIndex],
        vehicle_type_detail: vehicleTypes[vehicleTypeIndex] === "car" ? "Limousine" : "Standard",
        year: years[yearIndex],
        vin: `WBA${Math.floor(Math.random() * 10000000000000000)}`,
        installation_date: installationDate.toISOString(),
        removal_date: removalDate.toISOString(),
        mileage_installation: mileageInstallation,
        mileage_removal: mileageRemoval,
        installer: installers[installerIndex],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }

      const { error: vehicleError } = await supabase.from("complaint_vehicle_data").insert(vehicleData)

      if (vehicleError) {
        throw new Error(`Fehler beim Erstellen der Fahrzeugdaten: ${vehicleError.message}`)
      }

      // Erstelle Anhänge, wenn vorhanden
      if (hasAttachments || hasDiagnosticOutput) {
        const numAttachments = Math.floor(Math.random() * 3) + 1
        for (let j = 0; j < numAttachments; j++) {
          const isDiagnostic = j === 0 && hasDiagnosticOutput

          const attachment = {
            id: crypto.randomUUID(),
            complaint_id: complaintId,
            file_name: isDiagnostic
              ? `diagnose_${Math.floor(Math.random() * 1000)}.pdf`
              : `anhang_${Math.floor(Math.random() * 1000)}.jpg`,
            file_path: `/uploads/${isDiagnostic ? "diagnose" : "anhang"}_${Math.floor(Math.random() * 1000)}${
              isDiagnostic ? ".pdf" : ".jpg"
            }`,
            file_type: isDiagnostic ? "application/pdf" : "image/jpeg",
            is_diagnostic: isDiagnostic,
            created_at: new Date().toISOString(),
          }

          const { error: attachmentError } = await supabase.from("complaint_attachments").insert(attachment)

          if (attachmentError) {
            throw new Error(`Fehler beim Erstellen des Anhangs: ${attachmentError.message}`)
          }
        }
      }

      complaints.push(complaint)
    }

    return NextResponse.json({
      success: true,
      message: "Testdaten für Reklamationen erfolgreich erstellt",
      count: complaints.length,
    })
  } catch (error: any) {
    console.error("Fehler beim Erstellen der Testdaten:", error)
    return NextResponse.json(
      {
        success: false,
        message: `Fehler beim Erstellen der Testdaten: ${error.message}`,
      },
      { status: 500 },
    )
  }
}
