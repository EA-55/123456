"use server"

import { createClient } from "@supabase/supabase-js"
import { revalidatePath } from "next/cache"
import { v4 as uuidv4 } from "uuid"

// Supabase Client erstellen
const supabaseUrl = process.env.SUPABASE_URL || ""
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ""
const supabase = createClient(supabaseUrl, supabaseKey)

export async function submitReklamation(formData: any) {
  try {
    // Generiere eine UUID für die Reklamation
    const complaintId = uuidv4()

    // 1. Hauptreklamation einfügen
    const { error: complaintError } = await supabase.from("complaints").insert([
      {
        id: complaintId,
        customer_number: formData.customerNumber,
        customer_name: formData.customerName,
        contact_email: formData.contactEmail,
        contact_phone: formData.contactPhone,
        receipt_number: formData.receiptNumber,
        description: formData.description,
        error_date: formData.errorDate,
        delivery_form: formData.deliveryForm,
        preferred_handling: formData.preferredHandling,
        additional_info: formData.additionalInfo,
        additional_costs: formData.additionalCosts === "Ja",
        status: "Neu",
      },
    ])

    if (complaintError) {
      console.error("Fehler beim Speichern der Hauptreklamation:", complaintError)
      return { success: false, error: complaintError.message }
    }

    // 2. Artikeldaten einfügen
    const { error: itemError } = await supabase.from("complaint_items").insert([
      {
        complaint_id: complaintId,
        manufacturer: formData.manufacturer,
        article_index: formData.articleIndex,
        article_name: formData.articleName,
        purchase_date: formData.purchaseDate,
        quantity: Number.parseInt(formData.quantity, 10),
      },
    ])

    if (itemError) {
      console.error("Fehler beim Speichern der Artikeldaten:", itemError)
      return { success: false, error: itemError.message }
    }

    // 3. Fahrzeugdaten einfügen
    const { error: vehicleError } = await supabase.from("complaint_vehicle_data").insert([
      {
        complaint_id: complaintId,
        manufacturer: formData.vehicleManufacturer,
        model: formData.vehicleModel,
        vehicle_type: formData.vehicleType,
        year: formData.constructionYear,
        vin: formData.chassisNumber,
        installation_date: formData.installationDate,
        removal_date: formData.removalDate,
        mileage_installation: Number.parseInt(formData.mileageInstallation, 10) || 0,
        mileage_removal: Number.parseInt(formData.mileageRemoval, 10) || 0,
        installer: formData.assembledBy,
      },
    ])

    if (vehicleError) {
      console.error("Fehler beim Speichern der Fahrzeugdaten:", vehicleError)
      return { success: false, error: vehicleError.message }
    }

    // Pfad revalidieren
    revalidatePath("/admin")

    return { success: true, data: { id: complaintId } }
  } catch (error: any) {
    console.error("Unerwarteter Fehler:", error)
    return { success: false, error: error.message || "Ein unerwarteter Fehler ist aufgetreten" }
  }
}
