"use client"

import { useState, useEffect } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import type { Database } from "@/types/supabase"

// Verhindere zirkuläre Abhängigkeiten
export default function ReklamationenTab() {
  const [complaints, setComplaints] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Erstelle Supabase-Client nur auf Client-Seite
  const supabase = createClientComponentClient<Database>()

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        setIsLoading(true)
        const { data, error } = await supabase
          .from("complaints")
          .select(`
            *,
            complaint_items(*),
            complaint_vehicle_data(*)
          `)
          .order("created_at", { ascending: false })

        if (error) throw error
        setComplaints(data || [])
      } catch (err) {
        console.error("Error fetching complaints:", err)
        setError("Fehler beim Laden der Reklamationen")
      } finally {
        setIsLoading(false)
      }
    }

    fetchComplaints()
  }, [supabase])

  if (isLoading) {
    return <div className="py-4">Reklamationen werden geladen...</div>
  }

  if (error) {
    return <div className="py-4 text-red-500">{error}</div>
  }

  if (complaints.length === 0) {
    return <div className="py-4">Keine Reklamationen vorhanden.</div>
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Kundennummer
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Kontakt
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Datum
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Aktionen
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {complaints.map((complaint) => (
            <tr key={complaint.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{complaint.id}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{complaint.customer_number || "-"}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {complaint.customer_name || "-"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {complaint.customer_email || complaint.customer_phone || "-"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(complaint.created_at).toLocaleDateString("de-DE")}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    complaint.status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : complaint.status === "in_progress"
                        ? "bg-blue-100 text-blue-800"
                        : complaint.status === "resolved"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {complaint.status === "pending"
                    ? "Ausstehend"
                    : complaint.status === "in_progress"
                      ? "In Bearbeitung"
                      : complaint.status === "resolved"
                        ? "Gelöst"
                        : "Unbekannt"}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  className="text-indigo-600 hover:text-indigo-900 mr-4"
                  onClick={() => {
                    // Details anzeigen (kann später implementiert werden)
                    alert(`Details für Reklamation ${complaint.id}`)
                  }}
                >
                  Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
