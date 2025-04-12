"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { AlertTriangle, Check, Clock, X, RefreshCw, Download, Trash2, FileText, Search } from "lucide-react"
import { format } from "date-fns"
import { de } from "date-fns/locale"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createClient } from "@/lib/supabase"

interface Complaint {
  id: string
  customer_number: string
  customer_name: string
  email: string
  phone?: string
  receipt_number: string
  description: string
  status: "pending" | "in-progress" | "completed" | "rejected"
  processor_name?: string
  created_at: string
  updated_at: string
}

interface ComplaintDetails {
  complaint: Complaint
  items: any[]
  vehicleData: any
  attachments: any[]
}

export function ComplaintsTab() {
  const [complaints, setComplaints] = useState<Complaint[]>([])
  const [selectedComplaint, setSelectedComplaint] = useState<ComplaintDetails | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")
  const { toast } = useToast()

  const fetchComplaints = async () => {
    try {
      setIsLoading(true)
      const supabase = createClient()

      const { data, error } = await supabase.from("complaints").select("*").order("created_at", { ascending: false })

      if (error) {
        throw error
      }

      setComplaints(data || [])
    } catch (error) {
      console.error("Fehler beim Laden der Reklamationen:", error)
      toast({
        title: "Fehler",
        description: "Die Reklamationen konnten nicht geladen werden.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const fetchComplaintDetails = async (id: string) => {
    try {
      const response = await fetch(`/api/complaints/${id}`)
      if (!response.ok) {
        throw new Error("Fehler beim Abrufen der Reklamationsdetails")
      }

      const data = await response.json()
      setSelectedComplaint(data)
      setIsDialogOpen(true)
    } catch (error) {
      console.error("Fehler beim Abrufen der Reklamationsdetails:", error)
      toast({
        title: "Fehler",
        description: "Die Reklamationsdetails konnten nicht geladen werden.",
        variant: "destructive",
      })
    }
  }

  useEffect(() => {
    fetchComplaints()
  }, [])

  const updateComplaintStatus = async (id: string, status: string, processorName?: string) => {
    try {
      const response = await fetch(`/api/complaints/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status,
          processorName: processorName || null,
        }),
      })

      if (!response.ok) {
        throw new Error("Fehler beim Aktualisieren des Status")
      }

      // Aktualisiere die lokale Liste
      setComplaints((prev) =>
        prev.map((complaint) => (complaint.id === id ? { ...complaint, status: status as any } : complaint)),
      )

      // Aktualisiere die ausgewählte Reklamation, falls geöffnet
      if (selectedComplaint && selectedComplaint.complaint.id === id) {
        setSelectedComplaint({
          ...selectedComplaint,
          complaint: {
            ...selectedComplaint.complaint,
            status: status as any,
            processor_name: processorName || selectedComplaint.complaint.processor_name,
          },
        })
      }

      toast({
        title: "Status aktualisiert",
        description: `Die Reklamation wurde auf "${status}" gesetzt.`,
      })
    } catch (error) {
      console.error("Fehler beim Aktualisieren des Status:", error)
      toast({
        title: "Fehler",
        description: "Der Status konnte nicht aktualisiert werden.",
        variant: "destructive",
      })
    }
  }

  const deleteComplaint = async (id: string) => {
    if (!confirm("Sind Sie sicher, dass Sie diese Reklamation löschen möchten?")) {
      return
    }

    try {
      const response = await fetch(`/api/complaints/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Fehler beim Löschen der Reklamation")
      }

      // Aktualisiere die lokale Liste
      setComplaints((prev) => prev.filter((complaint) => complaint.id !== id))

      // Schließe den Dialog, falls geöffnet
      if (selectedComplaint && selectedComplaint.complaint.id === id) {
        setIsDialogOpen(false)
        setSelectedComplaint(null)
      }

      toast({
        title: "Reklamation gelöscht",
        description: "Die Reklamation wurde erfolgreich gelöscht.",
      })
    } catch (error) {
      console.error("Fehler beim Löschen der Reklamation:", error)
      toast({
        title: "Fehler",
        description: "Die Reklamation konnte nicht gelöscht werden.",
        variant: "destructive",
      })
    }
  }

  const exportComplaints = () => {
    const dataStr = JSON.stringify(complaints, null, 2)
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`

    const exportFileDefaultName = `reklamationen-export-${new Date().toISOString().slice(0, 10)}.json`

    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportFileDefaultName)
    linkElement.click()

    toast({
      title: "Export erfolgreich",
      description: "Alle Reklamationen wurden erfolgreich exportiert.",
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="default" className="bg-blue-500">
            Offen
          </Badge>
        )
      case "in-progress":
        return (
          <Badge variant="default" className="bg-yellow-500">
            In Bearbeitung
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="default" className="bg-green-500">
            Abgeschlossen
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="default" className="bg-red-500">
            Abgelehnt
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const filteredComplaints = complaints
    .filter((complaint) => filter === "all" || complaint.status === filter)
    .filter((complaint) => {
      if (!searchTerm) return true
      const searchLower = searchTerm.toLowerCase()
      return (
        complaint.customer_name.toLowerCase().includes(searchLower) ||
        complaint.customer_number.toLowerCase().includes(searchLower) ||
        complaint.receipt_number.toLowerCase().includes(searchLower) ||
        complaint.email.toLowerCase().includes(searchLower)
      )
    })

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Reklamationen</CardTitle>
            <CardDescription>Verwalten Sie Kundenreklamationen und bearbeiten Sie Anfragen.</CardDescription>
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Suchen..."
                className="w-[200px] pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle Reklamationen</SelectItem>
                <SelectItem value="pending">Offene Reklamationen</SelectItem>
                <SelectItem value="in-progress">In Bearbeitung</SelectItem>
                <SelectItem value="completed">Abgeschlossen</SelectItem>
                <SelectItem value="rejected">Abgelehnt</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={exportComplaints}>
              <Download className="mr-2 h-4 w-4" />
              Exportieren
            </Button>
            <Button variant="outline" onClick={fetchComplaints}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Aktualisieren
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <RefreshCw className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : filteredComplaints.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              {searchTerm
                ? "Keine Reklamationen gefunden, die Ihren Suchkriterien entsprechen."
                : "Keine Reklamationen vorhanden."}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredComplaints.map((complaint) => (
                <motion.div
                  key={complaint.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
                  onClick={() => fetchComplaintDetails(complaint.id)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{complaint.customer_name}</h3>
                        <span className="text-sm text-muted-foreground">({complaint.customer_number})</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{complaint.email}</p>
                      <p className="text-sm text-muted-foreground mt-1">Belegnummer: {complaint.receipt_number}</p>
                      <p className="text-sm text-muted-foreground">
                        {format(new Date(complaint.created_at), "PPP, HH:mm", { locale: de })}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">{getStatusBadge(complaint.status)}</div>
                  </div>
                  <p className="mt-2 text-sm line-clamp-2">{complaint.description}</p>
                </motion.div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Detail-Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedComplaint && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                  Reklamation: {selectedComplaint.complaint.receipt_number}
                  {getStatusBadge(selectedComplaint.complaint.status)}
                </DialogTitle>
                <DialogDescription>
                  Eingegangen am{" "}
                  {format(new Date(selectedComplaint.complaint.created_at), "PPP, HH:mm", { locale: de })}
                </DialogDescription>
              </DialogHeader>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                <div>
                  <h3 className="font-medium mb-2">Kundendaten</h3>
                  <div className="space-y-2">
                    <p>
                      <span className="font-medium">Kundennummer:</span> {selectedComplaint.complaint.customer_number}
                    </p>
                    <p>
                      <span className="font-medium">Name:</span> {selectedComplaint.complaint.customer_name}
                    </p>
                    <p>
                      <span className="font-medium">E-Mail:</span> {selectedComplaint.complaint.email}
                    </p>
                    {selectedComplaint.complaint.phone && (
                      <p>
                        <span className="font-medium">Telefon:</span> {selectedComplaint.complaint.phone}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Reklamationsdetails</h3>
                  <div className="space-y-2">
                    <p>
                      <span className="font-medium">Belegnummer:</span> {selectedComplaint.complaint.receipt_number}
                    </p>
                    <p>
                      <span className="font-medium">Status:</span> {getStatusBadge(selectedComplaint.complaint.status)}
                    </p>
                    {selectedComplaint.complaint.processor_name && (
                      <p>
                        <span className="font-medium">Bearbeiter:</span> {selectedComplaint.complaint.processor_name}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {selectedComplaint.items && selectedComplaint.items.length > 0 && (
                <div className="py-2">
                  <h3 className="font-medium mb-2">Reklamierte Artikel</h3>
                  <div className="space-y-4">
                    {selectedComplaint.items.map((item, index) => (
                      <div key={index} className="border rounded-md p-3 bg-gray-50">
                        <div className="grid grid-cols-2 gap-2">
                          <p>
                            <span className="font-medium">Hersteller:</span> {item.manufacturer}
                          </p>
                          <p>
                            <span className="font-medium">Artikelnummer:</span> {item.article_index}
                          </p>
                          <p className="col-span-2">
                            <span className="font-medium">Artikelname:</span> {item.article_name}
                          </p>
                          <p>
                            <span className="font-medium">Kaufdatum:</span>{" "}
                            {format(new Date(item.purchase_date), "dd.MM.yyyy")}
                          </p>
                          <p>
                            <span className="font-medium">Menge:</span> {item.quantity}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="py-2">
                <h3 className="font-medium mb-2">Beschreibung der Reklamation</h3>
                <div className="border rounded-md p-3 bg-gray-50 whitespace-pre-wrap">
                  {selectedComplaint.complaint.description}
                </div>
              </div>

              {selectedComplaint.vehicleData && (
                <div className="py-2">
                  <h3 className="font-medium mb-2">Fahrzeugdaten</h3>
                  <div className="border rounded-md p-3 bg-gray-50">
                    <div className="grid grid-cols-2 gap-2">
                      <p>
                        <span className="font-medium">Fahrzeugtyp:</span> {selectedComplaint.vehicleData.vehicle_type}
                      </p>
                      <p>
                        <span className="font-medium">Hersteller:</span> {selectedComplaint.vehicleData.manufacturer}
                      </p>
                      <p>
                        <span className="font-medium">Modell:</span> {selectedComplaint.vehicleData.model}
                      </p>
                      <p>
                        <span className="font-medium">Baujahr:</span> {selectedComplaint.vehicleData.year}
                      </p>
                      <p>
                        <span className="font-medium">Fahrgestellnummer:</span> {selectedComplaint.vehicleData.vin}
                      </p>
                      {selectedComplaint.vehicleData.installation_date && (
                        <p>
                          <span className="font-medium">Installationsdatum:</span>{" "}
                          {format(new Date(selectedComplaint.vehicleData.installation_date), "dd.MM.yyyy")}
                        </p>
                      )}
                      {selectedComplaint.vehicleData.removal_date && (
                        <p>
                          <span className="font-medium">Demontagedatum:</span>{" "}
                          {format(new Date(selectedComplaint.vehicleData.removal_date), "dd.MM.yyyy")}
                        </p>
                      )}
                      {selectedComplaint.vehicleData.mileage_installation && (
                        <p>
                          <span className="font-medium">Kilometerstand bei Installation:</span>{" "}
                          {selectedComplaint.vehicleData.mileage_installation} km
                        </p>
                      )}
                      {selectedComplaint.vehicleData.mileage_removal && (
                        <p>
                          <span className="font-medium">Kilometerstand bei Demontage:</span>{" "}
                          {selectedComplaint.vehicleData.mileage_removal} km
                        </p>
                      )}
                      {selectedComplaint.vehicleData.installer && (
                        <p>
                          <span className="font-medium">Einbau durch:</span> {selectedComplaint.vehicleData.installer}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {selectedComplaint.attachments && selectedComplaint.attachments.length > 0 && (
                <div className="py-2">
                  <h3 className="font-medium mb-2">Anhänge</h3>
                  <div className="border rounded-md p-3 bg-gray-50">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {selectedComplaint.attachments.map((attachment, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-blue-500" />
                          <span className="text-sm">
                            {attachment.file_name}
                            {attachment.is_diagnostic && " (Diagnose)"}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <DialogFooter className="flex justify-between items-center">
                <div className="flex gap-2">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteComplaint(selectedComplaint.complaint.id)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Löschen
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Select
                    value={selectedComplaint.complaint.status}
                    onValueChange={(value) => updateComplaintStatus(selectedComplaint.complaint.id, value, "Admin")}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Status ändern" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">
                        <div className="flex items-center">
                          <Clock className="mr-2 h-4 w-4 text-blue-500" />
                          Offen
                        </div>
                      </SelectItem>
                      <SelectItem value="in-progress">
                        <div className="flex items-center">
                          <RefreshCw className="mr-2 h-4 w-4 text-yellow-500" />
                          In Bearbeitung
                        </div>
                      </SelectItem>
                      <SelectItem value="completed">
                        <div className="flex items-center">
                          <Check className="mr-2 h-4 w-4 text-green-500" />
                          Abgeschlossen
                        </div>
                      </SelectItem>
                      <SelectItem value="rejected">
                        <div className="flex items-center">
                          <X className="mr-2 h-4 w-4 text-red-500" />
                          Abgelehnt
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <Button onClick={() => setIsDialogOpen(false)}>Schließen</Button>
                </div>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}
