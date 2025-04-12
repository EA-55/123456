import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase"

export async function POST(request: Request) {
  try {
    const supabase = createClient()
    const data = await request.json()

    // Transaktion starten
    const { data: complaint, error: complaintError } = await supabase
      .from("complaints")
      .insert({
        customer_number: data.customerData.customerNumber,
        customer_name: data.customerData.customerName,
        email: data.customerData.email,
        phone: data.customerData.phone,
        receipt_number: data.receiptNumber,
        description: data.description,
        error_date: data.errorDate,
        delivery_form: data.deliveryForm,
        preferred_processing: data.preferredProcessing,
        additional_info: data.additionalInfo,
        additional_costs: data.additionalCosts,
        has_attachments: data.hasAttachments,
        has_diagnostic_output: data.hasDiagnosticOutput,
        status: "pending",
      })
      .select()
      .single()

    if (complaintError) {
      console.error("Fehler beim Erstellen der Reklamation:", complaintError)
      return NextResponse.json({ error: "Fehler beim Erstellen der Reklamation" }, { status: 500 })
    }

    // Artikel hinzufügen
    if (data.items && data.items.length > 0) {
      const itemsWithComplaintId = data.items.map((item: any) => ({
        complaint_id: complaint.id,
        manufacturer: item.manufacturer,
        article_index: item.articleIndex,
        article_name: item.articleName,
        purchase_date: item.purchaseDate,
        quantity: item.quantity,
      }))

      const { error: itemsError } = await supabase.from("complaint_items").insert(itemsWithComplaintId)

      if (itemsError) {
        console.error("Fehler beim Hinzufügen der Artikel:", itemsError)
        return NextResponse.json({ error: "Fehler beim Hinzufügen der Artikel" }, { status: 500 })
      }
    }

    // Fahrzeugdaten hinzufügen
    if (data.vehicleData) {
      const { error: vehicleError } = await supabase.from("complaint_vehicle_data").insert({
        complaint_id: complaint.id,
        vehicle_type: data.vehicleData.vehicleType,
        manufacturer: data.vehicleData.manufacturer,
        model: data.vehicleData.model,
        vehicle_type_detail: data.vehicleData.vehicleTypeDetail,
        year: data.vehicleData.year,
        vin: data.vehicleData.vin,
        installation_date: data.vehicleData.installationDate,
        removal_date: data.vehicleData.removalDate,
        mileage_installation: data.vehicleData.mileageInstallation,
        mileage_removal: data.vehicleData.mileageRemoval,
        installer: data.vehicleData.installer,
      })

      if (vehicleError) {
        console.error("Fehler beim Hinzufügen der Fahrzeugdaten:", vehicleError)
        return NextResponse.json({ error: "Fehler beim Hinzufügen der Fahrzeugdaten" }, { status: 500 })
      }
    }

    // Anhänge hinzufügen (in einer realen Anwendung würden hier Dateien hochgeladen werden)
    if (data.attachments && data.attachments.length > 0) {
      const attachmentsWithComplaintId = data.attachments.map((attachment: any) => ({
        complaint_id: complaint.id,
        file_name: attachment.fileName,
        file_path: attachment.filePath,
        file_type: attachment.fileType,
        is_diagnostic: attachment.isDiagnostic,
      }))

      const { error: attachmentsError } = await supabase
        .from("complaint_attachments")
        .insert(attachmentsWithComplaintId)

      if (attachmentsError) {
        console.error("Fehler beim Hinzufügen der Anhänge:", attachmentsError)
        return NextResponse.json({ error: "Fehler beim Hinzufügen der Anhänge" }, { status: 500 })
      }
    }

    return NextResponse.json({ success: true, id: complaint.id })
  } catch (error) {
    console.error("Fehler bei der Verarbeitung der Reklamation:", error)
    return NextResponse.json({ error: "Fehler bei der Verarbeitung der Reklamation" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const supabase = createClient()

    const { data: complaints, error } = await supabase
      .from("complaints")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Fehler beim Abrufen der Reklamationen:", error)
      return NextResponse.json({ error: "Fehler beim Abrufen der Reklamationen" }, { status: 500 })
    }

    return NextResponse.json(complaints)
  } catch (error) {
    console.error("Fehler bei der Verarbeitung:", error)
    return NextResponse.json({ error: "Fehler bei der Verarbeitung" }, { status: 500 })
  }
}
