"use client"

import { useState, useEffect } from "react"
import { getClientBrowser } from "@/lib/db"

// Typen für die Reklamationsdaten
interface ComplaintItem {
  id: string
  article_name: string
  article_index: string
  manufacturer: string
  purchase_date: string
  quantity: number
}

interface ComplaintVehicleData {
  id: string
  manufacturer: string
  model: string
  vehicle_type: string
  vehicle_type_detail: string
  year: string
  vin: string
  installation_date: string
  removal_date: string
  mileage_installation: number
  mileage_removal: number
  installer: string
}

interface ComplaintAttachment {
  id: string
  file_name: string
  file_type: string
  file_path: string
  is_diagnostic: boolean
}

interface Complaint {
  id: string
  customer_number: string
  customer_name: string
  contact_email: string
  contact_phone: string
  receipt_number: string
  description: string
  error_date: string
  delivery_form: string
  preferred_handling: string
  additional_info: string
  additional_costs: boolean
  status: string
  created_at: string
  items?: ComplaintItem[]
  vehicle_data?: ComplaintVehicleData
  attachments?: ComplaintAttachment[]
}

// Supabase Client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
// Supabase-Client über Singleton-Pattern abrufen
const supabase = getClientBrowser()

export default function ReklamationenTab() {
  const [complaints, setComplaints] = useState<Complaint[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null)
  const [statusFilter, setStatusFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  // Lade Reklamationen beim ersten Rendern
  useEffect(() => {
    fetchComplaints()
  }, [])

  // Lade Reklamationen aus der Datenbank
  const fetchComplaints = async () => {
    setLoading(true)
    try {
      // Haupttabelle abfragen
      const { data: complaintsData, error } = await supabase
        .from("complaints")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) throw error

      // Für jede Reklamation die zugehörigen Daten laden
      const completeComplaints = await Promise.all(
        (complaintsData || []).map(async (complaint) => {
          // Artikel laden
          const { data: items } = await supabase.from("complaint_items").select("*").eq("complaint_id", complaint.id)

          // Fahrzeugdaten laden
          const { data: vehicleData } = await supabase
            .from("complaint_vehicle_data")
            .select("*")
            .eq("complaint_id", complaint.id)
            .single()

          // Anhänge laden
          const { data: attachments } = await supabase
            .from("complaint_attachments")
            .select("*")
            .eq("complaint_id", complaint.id)

          return {
            ...complaint,
            items: items || [],
            vehicle_data: vehicleData || null,
            attachments: attachments || [],
          }
        }),
      )

      setComplaints(completeComplaints)
    } catch (error) {
      console.error("Fehler beim Laden der Reklamationen:", error)
    } finally {
      setLoading(false)
    }
  }

  // Aktualisiere den Status einer Reklamation
  const updateComplaintStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase.from("complaints").update({ status }).eq("id", id)

      if (error) throw error

      // Aktualisiere die lokale Liste
      setComplaints(complaints.map((complaint) => (complaint.id === id ? { ...complaint, status } : complaint)))

      // Wenn die ausgewählte Reklamation aktualisiert wurde, aktualisiere auch diese
      if (selectedComplaint && selectedComplaint.id === id) {
        setSelectedComplaint({ ...selectedComplaint, status })
      }
    } catch (error) {
      console.error("Fehler beim Aktualisieren des Status:", error)
    }
  }

  // Filtere Reklamationen basierend auf Status und Suchbegriff
  const filteredComplaints = complaints.filter((complaint) => {
    const matchesStatus = statusFilter === "all" || complaint.status === statusFilter
    const matchesSearch =
      searchTerm === "" ||
      complaint.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.customer_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.receipt_number.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesStatus && matchesSearch
  })

  // Zeige Details einer Reklamation an
  const showComplaintDetails = (complaint: Complaint) => {
    setSelectedComplaint(complaint)
  }

  // Formatiere Datum für die Anzeige
  const formatDate = (dateString: string) => {
    if (!dateString) return "-"
    const date = new Date(dateString)
    return date.toLocaleDateString("de-DE")
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-1">
        <div className="mb-4 flex flex-col sm:flex-row sm:items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded p-2 w-full sm:w-auto"
          >
            <option value="all">Alle Status</option>
            <option value="Neu">Neu</option>
            <option value="In Bearbeitung">In Bearbeitung</option>
            <option value="Abgeschlossen">Abgeschlossen</option>
            <option value="Abgelehnt">Abgelehnt</option>
          </select>
          <input
            type="text"
            placeholder="Suche nach Name, Kundennummer oder Belegnummer"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded p-2 flex-grow"
          />
          <button onClick={fetchComplaints} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Aktualisieren
          </button>
        </div>

        {loading ? (
          <div className="text-center py-4">Lade Reklamationen...</div>
        ) : filteredComplaints.length === 0 ? (
          <div className="text-center py-4">Keine Reklamationen gefunden</div>
        ) : (
          <div className="overflow-y-auto max-h-[70vh] border rounded">
            {filteredComplaints.map((complaint) => (
              <div
                key={complaint.id}
                className={`p-3 border-b cursor-pointer hover:bg-gray-50 ${
                  selectedComplaint?.id === complaint.id ? "bg-blue-50" : ""
                }`}
                onClick={() => showComplaintDetails(complaint)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold">{complaint.customer_name}</p>
                    <p className="text-sm text-gray-600">Kundennr.: {complaint.customer_number}</p>
                    <p className="text-sm text-gray-600">Belegnr.: {complaint.receipt_number}</p>
                    <p className="text-sm text-gray-600">Datum: {formatDate(complaint.created_at)}</p>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      complaint.status === "Neu"
                        ? "bg-yellow-100 text-yellow-800"
                        : complaint.status === "In Bearbeitung"
                          ? "bg-blue-100 text-blue-800"
                          : complaint.status === "Abgeschlossen"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                    }`}
                  >
                    {complaint.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="md:col-span-2">
        {selectedComplaint ? (
          <div className="border rounded p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Reklamationsdetails</h2>
              <div>
                <select
                  value={selectedComplaint.status}
                  onChange={(e) => updateComplaintStatus(selectedComplaint.id, e.target.value)}
                  className="border rounded p-2 mr-2"
                >
                  <option value="Neu">Neu</option>
                  <option value="In Bearbeitung">In Bearbeitung</option>
                  <option value="Abgeschlossen">Abgeschlossen</option>
                  <option value="Abgelehnt">Abgelehnt</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <h3 className="font-semibold mb-2">Kundendaten</h3>
                <p>
                  <span className="font-medium">Name:</span> {selectedComplaint.customer_name}
                </p>
                <p>
                  <span className="font-medium">Kundennummer:</span> {selectedComplaint.customer_number}
                </p>
                <p>
                  <span className="font-medium">E-Mail:</span> {selectedComplaint.contact_email}
                </p>
                <p>
                  <span className="font-medium">Telefon:</span> {selectedComplaint.contact_phone || "-"}
                </p>
                <p>
                  <span className="font-medium">Belegnummer:</span> {selectedComplaint.receipt_number}
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Reklamationsdetails</h3>
                <p>
                  <span className="font-medium">Fehlerdatum:</span> {selectedComplaint.error_date || "-"}
                </p>
                <p>
                  <span className="font-medium">Lieferform:</span> {selectedComplaint.delivery_form || "-"}
                </p>
                <p>
                  <span className="font-medium">Bevorzugte Abwicklung:</span>{" "}
                  {selectedComplaint.preferred_handling || "-"}
                </p>
                <p>
                  <span className="font-medium">Zusätzliche Kosten:</span>{" "}
                  {selectedComplaint.additional_costs ? "Ja" : "Nein"}
                </p>
                <p>
                  <span className="font-medium">Erstellt am:</span> {formatDate(selectedComplaint.created_at)}
                </p>
              </div>
            </div>

            <div className="mb-4">
              <h3 className="font-semibold mb-2">Fehlerbeschreibung</h3>
              <p className="whitespace-pre-wrap border p-2 rounded bg-gray-50">{selectedComplaint.description}</p>
            </div>

            {selectedComplaint.additional_info && (
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Zusätzliche Informationen</h3>
                <p className="whitespace-pre-wrap border p-2 rounded bg-gray-50">{selectedComplaint.additional_info}</p>
              </div>
            )}

            {selectedComplaint.items && selectedComplaint.items.length > 0 && (
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Reklamierte Artikel</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full border">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border p-2 text-left">Artikelname</th>
                        <th className="border p-2 text-left">Artikelnummer</th>
                        <th className="border p-2 text-left">Hersteller</th>
                        <th className="border p-2 text-left">Kaufdatum</th>
                        <th className="border p-2 text-left">Menge</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedComplaint.items.map((item) => (
                        <tr key={item.id}>
                          <td className="border p-2">{item.article_name}</td>
                          <td className="border p-2">{item.article_index || "-"}</td>
                          <td className="border p-2">{item.manufacturer || "-"}</td>
                          <td className="border p-2">{formatDate(item.purchase_date) || "-"}</td>
                          <td className="border p-2">{item.quantity || "-"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {selectedComplaint.vehicle_data && (
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Fahrzeugdaten</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p>
                      <span className="font-medium">Hersteller:</span>{" "}
                      {selectedComplaint.vehicle_data.manufacturer || "-"}
                    </p>
                    <p>
                      <span className="font-medium">Modell:</span> {selectedComplaint.vehicle_data.model || "-"}
                    </p>
                    <p>
                      <span className="font-medium">Fahrzeugtyp:</span>{" "}
                      {selectedComplaint.vehicle_data.vehicle_type || "-"}
                    </p>
                    <p>
                      <span className="font-medium">Fahrzeugtyp Detail:</span>{" "}
                      {selectedComplaint.vehicle_data.vehicle_type_detail || "-"}
                    </p>
                    <p>
                      <span className="font-medium">Baujahr:</span> {selectedComplaint.vehicle_data.year || "-"}
                    </p>
                    <p>
                      <span className="font-medium">Fahrgestellnummer:</span>{" "}
                      {selectedComplaint.vehicle_data.vin || "-"}
                    </p>
                  </div>
                  <div>
                    <p>
                      <span className="font-medium">Einbaudatum:</span>{" "}
                      {formatDate(selectedComplaint.vehicle_data.installation_date) || "-"}
                    </p>
                    <p>
                      <span className="font-medium">Ausbaudatum:</span>{" "}
                      {formatDate(selectedComplaint.vehicle_data.removal_date) || "-"}
                    </p>
                    <p>
                      <span className="font-medium">Kilometerstand bei Einbau:</span>{" "}
                      {selectedComplaint.vehicle_data.mileage_installation || "-"}
                    </p>
                    <p>
                      <span className="font-medium">Kilometerstand bei Ausbau:</span>{" "}
                      {selectedComplaint.vehicle_data.mileage_removal || "-"}
                    </p>
                    <p>
                      <span className="font-medium">Eingebaut von:</span>{" "}
                      {selectedComplaint.vehicle_data.installer || "-"}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {selectedComplaint.attachments && selectedComplaint.attachments.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Anhänge</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {selectedComplaint.attachments.map((attachment) => (
                    <div key={attachment.id} className="border rounded p-2">
                      <p className="text-sm truncate">{attachment.file_name}</p>
                      <p className="text-xs text-gray-500">{attachment.is_diagnostic ? "Diagnose-Datei" : "Anhang"}</p>
                      <a
                        href={attachment.file_path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline text-sm"
                      >
                        Herunterladen
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="border rounded p-4 text-center">
            <p className="text-gray-500">Wählen Sie eine Reklamation aus, um Details anzuzeigen</p>
          </div>
        )}
      </div>
    </div>
  )
}
