import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase"

export async function POST(request: Request) {
  try {
    const formData = await request.json()
    const supabase = createClient()

    // Erstellen des Haupteintrags für die Reklamation
    const { data: complaint, error: complaintError } = await supabase
      .from("complaints")
      .insert({
        receipt_number: formData.receiptNumber,
        customer_number: formData.customerNumber,
        customer_name: formData.customerName,
        email: formData.email,
        phone: formData.phone || null,
        complaint_description: formData.complaintDescription,
        error_date: formData.errorDate,
        delivery_form: formData.deliveryForm,
        processing_preference: formData.processingPreference,
        additional_info: formData.additionalInfo || null,
        additional_costs: formData.additionalCosts,
        status: "pending",
      })
      .select()
      .single()

    if (complaintError) {
      console.error("Error creating complaint:", complaintError)
      return NextResponse.json({ error: "Failed to create complaint" }, { status: 500 })
    }

    const complaintId = complaint.id

    // Einfügen der Artikel
    if (formData.items && formData.items.length > 0) {
      const itemsToInsert = formData.items.map((item: any) => ({
        complaint_id: complaintId,
        manufacturer: item.manufacturer,
        article_index: item.articleNumber,
        article_name: item.name,
        purchase_date: item.purchaseDate,
        quantity: item.quantity,
      }))

      const { error: itemsError } = await supabase.from("complaint_items").insert(itemsToInsert)

      if (itemsError) {
        console.error("Error inserting items:", itemsError)
        return NextResponse.json({ error: "Failed to insert items" }, { status: 500 })
      }
    }

    // Einfügen der Fahrzeugdaten
    const { error: vehicleError } = await supabase.from("complaint_vehicle_data").insert({
      complaint_id: complaintId,
      vehicle_type: formData.vehicleType,
      manufacturer: formData.vehicleManufacturer,
      model: formData.vehicleModel,
      vehicle_type_detail: formData.vehicleType, // Kann angepasst werden, falls nötig
      year: formData.vehicleYear,
      vin: formData.vin,
      installation_date: formData.installationDate,
      removal_date: formData.removalDate,
      mileage_installation: Number.parseInt(formData.mileageInstallation) || 0,
      mileage_removal: Number.parseInt(formData.mileageRemoval) || 0,
      installer: formData.installer,
    })

    if (vehicleError) {
      console.error("Error inserting vehicle data:", vehicleError)
      return NextResponse.json({ error: "Failed to insert vehicle data" }, { status: 500 })
    }

    // Einfügen der Anhänge, falls vorhanden
    if (formData.attachments && formData.attachments.length > 0) {
      const attachmentsToInsert = formData.attachments.map((attachment: string) => ({
        complaint_id: complaintId,
        file_name: attachment,
        file_path: `/uploads/${attachment}`,
        file_type: attachment.split(".").pop() || "unknown",
        is_diagnostic: false, // Standard-Wert, kann angepasst werden
      }))

      const { error: attachmentsError } = await supabase.from("complaint_attachments").insert(attachmentsToInsert)

      if (attachmentsError) {
        console.error("Error inserting attachments:", attachmentsError)
        return NextResponse.json({ error: "Failed to insert attachments" }, { status: 500 })
      }
    }

    return NextResponse.json({ id: complaintId, success: true })
  } catch (error) {
    console.error("Error processing complaint:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const customerNumber = searchParams.get("customerNumber")
    const receiptNumber = searchParams.get("receiptNumber")

    const supabase = createClient()
    let query = supabase.from("complaints").select(`
      *,
      complaint_items(*),
      complaint_vehicle_data(*),
      complaint_attachments(*)
    `)

    if (status) {
      query = query.eq("status", status)
    }

    if (customerNumber) {
      query = query.eq("customer_number", customerNumber)
    }

    if (receiptNumber) {
      query = query.eq("receipt_number", receiptNumber)
    }

    const { data, error } = await query.order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching complaints:", error)
      return NextResponse.json({ error: "Failed to fetch complaints" }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching complaints:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
