import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase"
import { v4 as uuidv4 } from "uuid"

// Hilfsfunktion zum Generieren eines zufälligen Elements aus einem Array
function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)]
}

// Hilfsfunktion zum Generieren eines zufälligen Datums innerhalb der letzten 90 Tage
function getRandomDate(daysBack = 90): Date {
  const date = new Date()
  date.setDate(date.getDate() - Math.floor(Math.random() * daysBack))
  return date
}

// Hilfsfunktion zum Formatieren eines Datums als ISO-String ohne Zeitzone
function formatDate(date: Date): string {
  return date.toISOString().split("T")[0]
}

export async function POST() {
  try {
    const supabase = createClient()

    // Löschen aller vorhandenen Testdaten
    await supabase.from("complaint_attachments").delete().neq("id", "00000000-0000-0000-0000-000000000000")
    await supabase.from("complaint_vehicle_data").delete().neq("id", "00000000-0000-0000-0000-000000000000")
    await supabase.from("complaint_items").delete().neq("id", "00000000-0000-0000-0000-000000000000")
    await supabase.from("complaints").delete().neq("id", "00000000-0000-0000-0000-000000000000")

    // Beispieldaten für Reklamationen
    const customerData = [
      {
        customer_number: "KD-10001",
        customer_name: "Max Mustermann",
        email: "max.mustermann@example.com",
        phone: "+49 123 4567890",
      },
      {
        customer_number: "KD-10002",
        customer_name: "Anna Schmidt",
        email: "anna.schmidt@example.com",
        phone: "+49 987 6543210",
      },
      {
        customer_number: "KD-10003",
        customer_name: "Thomas Müller",
        email: "thomas.mueller@example.com",
        phone: "+49 555 1234567",
      },
      {
        customer_number: "KD-10004",
        customer_name: "Laura Weber",
        email: "laura.weber@example.com",
        phone: "+49 333 7654321",
      },
      {
        customer_number: "KD-10005",
        customer_name: "Michael Wagner",
        email: "michael.wagner@example.com",
        phone: "+49 444 9876543",
      },
    ]

    const receiptNumbers = [
      "RE-2023-001234",
      "RE-2023-005678",
      "RE-2023-009012",
      "RE-2023-003456",
      "RE-2023-007890",
      "RE-2023-002345",
      "RE-2023-006789",
      "RE-2023-000123",
      "RE-2023-004567",
      "RE-2023-008901",
    ]

    const descriptions = [
      "Der Motor startet nicht mehr, nachdem ich das Teil eingebaut habe. Es gibt ein klickendes Geräusch, aber der Motor springt nicht an.",
      "Das Ersatzteil passt nicht wie beschrieben. Die Bohrlöcher stimmen nicht mit meinem Fahrzeugmodell überein.",
      "Nach dem Einbau der neuen Bremsen quietschen diese sehr laut bei jeder Bremsung. Das war bei den alten Bremsen nicht der Fall.",
      "Die gelieferte Stoßstange hat eine andere Farbe als in der Beschreibung angegeben. Ich habe Schwarz bestellt, aber Dunkelgrau erhalten.",
      "Der Turbolader hat nach nur 500 km den Geist aufgegeben. Es sollte laut Beschreibung mindestens 100.000 km halten.",
      "Die Dichtung ist bereits beim ersten Einbauversuch gerissen. Das Material scheint minderwertig zu sein.",
      "Nach dem Einbau des Steuergeräts zeigt das Fahrzeug mehrere Fehlercodes an, die vorher nicht da waren. Das Auto läuft sehr unrund.",
      "Die Motorhaube schließt nicht richtig, obwohl laut Beschreibung eine 100%ige Passgenauigkeit garantiert wurde.",
      "Der Katalysator verursacht ein lautes Rasseln bei höheren Geschwindigkeiten. Das sollte nicht normal sein für ein neues Teil.",
      "Die Scheinwerfer haben nach nur zwei Wochen Nutzung Wasser im Inneren. Sie sollten wasserdicht sein.",
    ]

    const statuses = ["pending", "in-progress", "completed", "rejected"]

    const deliveryForms = ["Abholung", "Rücksendung", "Vor-Ort-Reparatur"]

    const preferredProcessing = ["Reparatur", "Austausch", "Rückerstattung", "Gutschrift", "Teilweise Rückerstattung"]

    const processorNames = ["Max Müller", "Sarah Schmidt", "Thomas Weber", null, null]

    // Artikel-Daten
    const articleData = [
      {
        manufacturer: "Bosch",
        article_index: "0986452044",
        article_name: "Ölfilter für VW, Audi, Skoda",
        purchase_date: formatDate(getRandomDate(60)),
        quantity: 1,
      },
      {
        manufacturer: "Febi Bilstein",
        article_index: "26921",
        article_name: "Querlenker vorne links",
        purchase_date: formatDate(getRandomDate(45)),
        quantity: 1,
      },
      {
        manufacturer: "Sachs",
        article_index: "3000951097",
        article_name: "Kupplungssatz komplett",
        purchase_date: formatDate(getRandomDate(30)),
        quantity: 1,
      },
      {
        manufacturer: "Valeo",
        article_index: "811307",
        article_name: "Klimakompressor",
        purchase_date: formatDate(getRandomDate(90)),
        quantity: 1,
      },
      {
        manufacturer: "Brembo",
        article_index: "09.9772.11",
        article_name: "Bremsscheiben Set vorne",
        purchase_date: formatDate(getRandomDate(20)),
        quantity: 2,
      },
      {
        manufacturer: "NGK",
        article_index: "LZKAR6-11",
        article_name: "Zündkerzen Set",
        purchase_date: formatDate(getRandomDate(15)),
        quantity: 4,
      },
      {
        manufacturer: "Mann-Filter",
        article_index: "C 2433/2",
        article_name: "Luftfilter",
        purchase_date: formatDate(getRandomDate(40)),
        quantity: 1,
      },
      {
        manufacturer: "Continental",
        article_index: "CT1168",
        article_name: "Zahnriemen",
        purchase_date: formatDate(getRandomDate(75)),
        quantity: 1,
      },
      {
        manufacturer: "Pierburg",
        article_index: "7.00373.10.0",
        article_name: "AGR-Ventil",
        purchase_date: formatDate(getRandomDate(50)),
        quantity: 1,
      },
      {
        manufacturer: "Hella",
        article_index: "8MK376762-261",
        article_name: "Kühler, Motorkühlung",
        purchase_date: formatDate(getRandomDate(65)),
        quantity: 1,
      },
    ]

    // Fahrzeugdaten
    const vehicleData = [
      {
        vehicle_type: "PKW",
        manufacturer: "Volkswagen",
        model: "Golf VII",
        vehicle_type_detail: "Limousine",
        year: "2018",
        vin: "WVWZZZ1KZAM654321",
        installation_date: formatDate(getRandomDate(30)),
        removal_date: formatDate(getRandomDate(10)),
        mileage_installation: 65000,
        mileage_removal: 67500,
        installer: "Selbsteinbau",
      },
      {
        vehicle_type: "PKW",
        manufacturer: "BMW",
        model: "3er E90",
        vehicle_type_detail: "Limousine",
        year: "2010",
        vin: "WBAPK73579E123456",
        installation_date: formatDate(getRandomDate(45)),
        removal_date: formatDate(getRandomDate(15)),
        mileage_installation: 120000,
        mileage_removal: 122000,
        installer: "Fachwerkstatt",
      },
      {
        vehicle_type: "PKW",
        manufacturer: "Mercedes-Benz",
        model: "C-Klasse W204",
        vehicle_type_detail: "Kombi",
        year: "2012",
        vin: "WDD2040071A987654",
        installation_date: formatDate(getRandomDate(60)),
        removal_date: formatDate(getRandomDate(20)),
        mileage_installation: 95000,
        mileage_removal: 97000,
        installer: "Vertragswerkstatt",
      },
      {
        vehicle_type: "LKW",
        manufacturer: "MAN",
        model: "TGX",
        vehicle_type_detail: "Sattelzugmaschine",
        year: "2015",
        vin: "WMAH06ZZ7FM456789",
        installation_date: formatDate(getRandomDate(90)),
        removal_date: formatDate(getRandomDate(30)),
        mileage_installation: 350000,
        mileage_removal: 375000,
        installer: "Werkstatt",
      },
      {
        vehicle_type: "Motorrad",
        manufacturer: "Honda",
        model: "CBR 1000 RR",
        vehicle_type_detail: "Supersport",
        year: "2019",
        vin: "JH2SC5934KM123456",
        installation_date: formatDate(getRandomDate(20)),
        removal_date: formatDate(getRandomDate(5)),
        mileage_installation: 15000,
        mileage_removal: 16000,
        installer: "Fachwerkstatt",
      },
    ]

    // Erstellen von 10 Reklamationen mit zufälligen Daten
    const complaintIds = []
    for (let i = 0; i < 10; i++) {
      const customer = getRandomElement(customerData)
      const complaintId = uuidv4()
      complaintIds.push(complaintId)

      const createdAt = getRandomDate(90)
      const updatedAt = new Date(createdAt)
      updatedAt.setDate(createdAt.getDate() + Math.floor(Math.random() * 5))

      // Reklamation erstellen
      await supabase.from("complaints").insert({
        id: complaintId,
        customer_number: customer.customer_number,
        customer_name: customer.customer_name,
        email: customer.email,
        phone: customer.phone,
        receipt_number: getRandomElement(receiptNumbers),
        description: getRandomElement(descriptions),
        error_date: formatDate(getRandomDate(60)),
        delivery_form: getRandomElement(deliveryForms),
        preferred_processing: getRandomElement(preferredProcessing),
        additional_info:
          Math.random() > 0.5 ? "Bitte schnellstmöglich bearbeiten, da Fahrzeug nicht fahrbereit ist." : null,
        additional_costs: Math.random() > 0.7,
        has_attachments: Math.random() > 0.5,
        has_diagnostic_output: Math.random() > 0.7,
        status: getRandomElement(statuses),
        processor_name: getRandomElement(processorNames),
        created_at: createdAt.toISOString(),
        updated_at: updatedAt.toISOString(),
      })

      // 1-3 Artikel pro Reklamation hinzufügen
      const numItems = Math.floor(Math.random() * 3) + 1
      const usedArticleIndices = new Set()

      for (let j = 0; j < numItems; j++) {
        let articleIndex
        do {
          articleIndex = Math.floor(Math.random() * articleData.length)
        } while (usedArticleIndices.has(articleIndex))

        usedArticleIndices.add(articleIndex)
        const article = articleData[articleIndex]

        await supabase.from("complaint_items").insert({
          id: uuidv4(),
          complaint_id: complaintId,
          manufacturer: article.manufacturer,
          article_index: article.article_index,
          article_name: article.article_name,
          purchase_date: article.purchase_date,
          quantity: article.quantity,
        })
      }

      // Fahrzeugdaten hinzufügen
      const vehicle = getRandomElement(vehicleData)
      await supabase.from("complaint_vehicle_data").insert({
        id: uuidv4(),
        complaint_id: complaintId,
        vehicle_type: vehicle.vehicle_type,
        manufacturer: vehicle.manufacturer,
        model: vehicle.model,
        vehicle_type_detail: vehicle.vehicle_type_detail,
        year: vehicle.year,
        vin: vehicle.vin,
        installation_date: vehicle.installation_date,
        removal_date: vehicle.removal_date,
        mileage_installation: vehicle.mileage_installation,
        mileage_removal: vehicle.mileage_removal,
        installer: vehicle.installer,
      })

      // Anhänge hinzufügen (wenn has_attachments true ist)
      if (Math.random() > 0.5) {
        const numAttachments = Math.floor(Math.random() * 3) + 1

        for (let k = 0; k < numAttachments; k++) {
          const isDiagnostic = Math.random() > 0.7
          const fileType = isDiagnostic ? "pdf" : getRandomElement(["jpg", "png", "pdf"])
          const fileName = isDiagnostic
            ? `Diagnoseausdruck_${Math.floor(Math.random() * 1000)}.${fileType}`
            : `Foto_${Math.floor(Math.random() * 1000)}.${fileType}`

          await supabase.from("complaint_attachments").insert({
            id: uuidv4(),
            complaint_id: complaintId,
            file_name: fileName,
            file_path: `/uploads/complaints/${complaintId}/${fileName}`,
            file_type: fileType,
            is_diagnostic: isDiagnostic,
          })
        }
      }
    }

    return NextResponse.json({ success: true, message: "Testdaten erfolgreich erstellt", count: 10 })
  } catch (error) {
    console.error("Fehler beim Erstellen der Testdaten:", error)
    return NextResponse.json({ success: false, error: "Fehler beim Erstellen der Testdaten" }, { status: 500 })
  }
}
