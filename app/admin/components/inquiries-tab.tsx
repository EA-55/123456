"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Mail, Wrench, Check, Clock, X, RefreshCw, Download, Trash2, Building } from "lucide-react"
import { format } from "date-fns"
import { de } from "date-fns/locale"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Inquiry {
  id: string
  type: "contact" | "motor" | "b2b"
  data: any
  timestamp: string
  status: "new" | "in-progress" | "completed" | "archived"
}

export function InquiriesTab() {
  const [contactInquiries, setContactInquiries] = useState<Inquiry[]>([])
  const [motorInquiries, setMotorInquiries] = useState<Inquiry[]>([])
  const [b2bRegistrations, setB2bRegistrations] = useState<Inquiry[]>([])
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [filter, setFilter] = useState<string>("all")
  const { toast } = useToast()

  useEffect(() => {
    // Laden der gespeicherten Anfragen
    const loadInquiries = () => {
      const contactData = JSON.parse(localStorage.getItem("contactInquiries") || "[]")
      const motorData = JSON.parse(localStorage.getItem("motorInquiries") || "[]")
      const b2bData = JSON.parse(localStorage.getItem("b2bRegistrations") || "[]")

      setContactInquiries(contactData)
      setMotorInquiries(motorData)
      setB2bRegistrations(b2bData)
    }

    loadInquiries()

    // Event-Listener für Änderungen in anderen Tabs
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "contactInquiries") {
        setContactInquiries(JSON.parse(e.newValue || "[]"))
      } else if (e.key === "motorInquiries") {
        setMotorInquiries(JSON.parse(e.newValue || "[]"))
      } else if (e.key === "b2bRegistrations") {
        setB2bRegistrations(JSON.parse(e.newValue || "[]"))
      }
    }

    window.addEventListener("storage", handleStorageChange)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [])

  const updateInquiryStatus = (id: string, type: "contact" | "motor" | "b2b", newStatus: string) => {
    if (type === "contact") {
      const updatedInquiries = contactInquiries.map((inquiry) =>
        inquiry.id === id ? { ...inquiry, status: newStatus } : inquiry,
      )
      setContactInquiries(updatedInquiries)
      localStorage.setItem("contactInquiries", JSON.stringify(updatedInquiries))

      // Dispatch storage event für andere Tabs
      window.dispatchEvent(
        new StorageEvent("storage", {
          key: "contactInquiries",
          newValue: JSON.stringify(updatedInquiries),
        }),
      )
    } else if (type === "motor") {
      const updatedInquiries = motorInquiries.map((inquiry) =>
        inquiry.id === id ? { ...inquiry, status: newStatus } : inquiry,
      )
      setMotorInquiries(updatedInquiries)
      localStorage.setItem("motorInquiries", JSON.stringify(updatedInquiries))

      // Dispatch storage event für andere Tabs
      window.dispatchEvent(
        new StorageEvent("storage", {
          key: "motorInquiries",
          newValue: JSON.stringify(updatedInquiries),
        }),
      )
    } else if (type === "b2b") {
      const updatedRegistrations = b2bRegistrations.map((registration) =>
        registration.id === id ? { ...registration, status: newStatus } : registration,
      )
      setB2bRegistrations(updatedRegistrations)
      localStorage.setItem("b2bRegistrations", JSON.stringify(updatedRegistrations))

      // Dispatch storage event für andere Tabs
      window.dispatchEvent(
        new StorageEvent("storage", {
          key: "b2bRegistrations",
          newValue: JSON.stringify(updatedRegistrations),
        }),
      )
    }

    toast({
      title: "Status aktualisiert",
      description: `Die Anfrage wurde auf "${newStatus}" gesetzt.`,
    })

    if (selectedInquiry && selectedInquiry.id === id) {
      setSelectedInquiry({ ...selectedInquiry, status: newStatus as any })
    }
  }

  const deleteInquiry = (id: string, type: "contact" | "motor" | "b2b") => {
    if (type === "contact") {
      const updatedInquiries = contactInquiries.filter((inquiry) => inquiry.id !== id)
      setContactInquiries(updatedInquiries)
      localStorage.setItem("contactInquiries", JSON.stringify(updatedInquiries))

      // Dispatch storage event für andere Tabs
      window.dispatchEvent(
        new StorageEvent("storage", {
          key: "contactInquiries",
          newValue: JSON.stringify(updatedInquiries),
        }),
      )
    } else if (type === "motor") {
      const updatedInquiries = motorInquiries.filter((inquiry) => inquiry.id !== id)
      setMotorInquiries(updatedInquiries)
      localStorage.setItem("motorInquiries", JSON.stringify(updatedInquiries))

      // Dispatch storage event für andere Tabs
      window.dispatchEvent(
        new StorageEvent("storage", {
          key: "motorInquiries",
          newValue: JSON.stringify(updatedInquiries),
        }),
      )
    } else if (type === "b2b") {
      const updatedRegistrations = b2bRegistrations.filter((registration) => registration.id !== id)
      setB2bRegistrations(updatedRegistrations)
      localStorage.setItem("b2bRegistrations", JSON.stringify(updatedRegistrations))

      // Dispatch storage event für andere Tabs
      window.dispatchEvent(
        new StorageEvent("storage", {
          key: "b2bRegistrations",
          newValue: JSON.stringify(updatedRegistrations),
        }),
      )
    }

    toast({
      title: "Anfrage gelöscht",
      description: "Die Anfrage wurde erfolgreich gelöscht.",
    })

    if (selectedInquiry && selectedInquiry.id === id) {
      setIsDialogOpen(false)
      setSelectedInquiry(null)
    }
  }

  const exportInquiries = () => {
    const allInquiries = [...contactInquiries, ...motorInquiries, ...b2bRegistrations]
    const dataStr = JSON.stringify(allInquiries, null, 2)
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`

    const exportFileDefaultName = `anfragen-export-${new Date().toISOString().slice(0, 10)}.json`

    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportFileDefaultName)
    linkElement.click()

    toast({
      title: "Export erfolgreich",
      description: "Alle Anfragen wurden erfolgreich exportiert.",
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return (
          <Badge variant="default" className="bg-blue-500">
            Neu
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
      case "archived":
        return <Badge variant="outline">Archiviert</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const filteredContactInquiries =
    filter === "all" ? contactInquiries : contactInquiries.filter((inquiry) => inquiry.status === filter)

  const filteredMotorInquiries =
    filter === "all" ? motorInquiries : motorInquiries.filter((inquiry) => inquiry.status === filter)

  const filteredB2bRegistrations =
    filter === "all" ? b2bRegistrations : b2bRegistrations.filter((registration) => registration.status === filter)

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Kundenanfragen</CardTitle>
            <CardDescription>
              Verwalten Sie Kontakt-, Motorinstandsetzungsanfragen und B2B-Registrierungen.
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle Anfragen</SelectItem>
                <SelectItem value="new">Neue Anfragen</SelectItem>
                <SelectItem value="in-progress">In Bearbeitung</SelectItem>
                <SelectItem value="completed">Abgeschlossen</SelectItem>
                <SelectItem value="archived">Archiviert</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={exportInquiries}>
              <Download className="mr-2 h-4 w-4" />
              Exportieren
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="contact">
            <TabsList className="mb-4">
              <TabsTrigger value="contact" className="flex items-center">
                <Mail className="mr-2 h-4 w-4" />
                Kontaktanfragen
                {contactInquiries.filter((i) => i.status === "new").length > 0 && (
                  <Badge variant="default" className="ml-2 bg-blue-500">
                    {contactInquiries.filter((i) => i.status === "new").length}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="motor" className="flex items-center">
                <Wrench className="mr-2 h-4 w-4" />
                Motorinstandsetzung
                {motorInquiries.filter((i) => i.status === "new").length > 0 && (
                  <Badge variant="default" className="ml-2 bg-blue-500">
                    {motorInquiries.filter((i) => i.status === "new").length}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="b2b" className="flex items-center">
                <Building className="mr-2 h-4 w-4" />
                B2B-Registrierungen
                {b2bRegistrations.filter((i) => i.status === "new").length > 0 && (
                  <Badge variant="default" className="ml-2 bg-blue-500">
                    {b2bRegistrations.filter((i) => i.status === "new").length}
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="contact">
              {filteredContactInquiries.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">Keine Kontaktanfragen vorhanden.</div>
              ) : (
                <div className="space-y-4">
                  {filteredContactInquiries
                    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                    .map((inquiry) => (
                      <motion.div
                        key={inquiry.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
                        onClick={() => {
                          setSelectedInquiry(inquiry)
                          setIsDialogOpen(true)
                        }}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{inquiry.data.name}</h3>
                            <p className="text-sm text-muted-foreground">{inquiry.data.email}</p>
                            <p className="text-sm text-muted-foreground mt-1">
                              {format(new Date(inquiry.timestamp), "PPP, HH:mm", { locale: de })}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">{getStatusBadge(inquiry.status)}</div>
                        </div>
                        <p className="mt-2 text-sm line-clamp-2">{inquiry.data.message}</p>
                      </motion.div>
                    ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="motor">
              {filteredMotorInquiries.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  Keine Motorinstandsetzungsanfragen vorhanden.
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredMotorInquiries
                    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                    .map((inquiry) => (
                      <motion.div
                        key={inquiry.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
                        onClick={() => {
                          setSelectedInquiry(inquiry)
                          setIsDialogOpen(true)
                        }}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{inquiry.data.name}</h3>
                            <p className="text-sm text-muted-foreground">{inquiry.data.email}</p>
                            <p className="text-sm text-muted-foreground mt-1">
                              {format(new Date(inquiry.timestamp), "PPP, HH:mm", { locale: de })}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">{getStatusBadge(inquiry.status)}</div>
                        </div>
                        <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                          <p>
                            <span className="font-medium">Fahrzeug:</span> {inquiry.data.carModel}
                          </p>
                          <p>
                            <span className="font-medium">Baujahr:</span> {inquiry.data.carYear}
                          </p>
                          <p>
                            <span className="font-medium">Motortyp:</span> {inquiry.data.engineType}
                          </p>
                          <p>
                            <span className="font-medium">Telefon:</span> {inquiry.data.phone}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="b2b">
              {filteredB2bRegistrations.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">Keine B2B-Registrierungen vorhanden.</div>
              ) : (
                <div className="space-y-4">
                  {filteredB2bRegistrations
                    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                    .map((registration) => (
                      <motion.div
                        key={registration.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
                        onClick={() => {
                          setSelectedInquiry(registration)
                          setIsDialogOpen(true)
                        }}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{registration.data.companyName}</h3>
                            <p className="text-sm text-muted-foreground">{registration.data.contactPerson}</p>
                            <p className="text-sm text-muted-foreground">{registration.data.email}</p>
                            <p className="text-sm text-muted-foreground mt-1">
                              {format(new Date(registration.timestamp), "PPP, HH:mm", { locale: de })}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">{getStatusBadge(registration.status)}</div>
                        </div>
                        <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                          <p>
                            <span className="font-medium">Geschäftsart:</span> {registration.data.businessType}
                          </p>
                          <p>
                            <span className="font-medium">Telefon:</span> {registration.data.phone}
                          </p>
                          <p className="col-span-2">
                            <span className="font-medium">Adresse:</span> {registration.data.address}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Detail-Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl">
          {selectedInquiry && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  {selectedInquiry.type === "contact" ? (
                    <Mail className="h-5 w-5" />
                  ) : selectedInquiry.type === "motor" ? (
                    <Wrench className="h-5 w-5" />
                  ) : (
                    <Building className="h-5 w-5" />
                  )}
                  {selectedInquiry.type === "contact"
                    ? "Kontaktanfrage"
                    : selectedInquiry.type === "motor"
                      ? "Motorinstandsetzungsanfrage"
                      : "B2B-Registrierung"}
                  {getStatusBadge(selectedInquiry.status)}
                </DialogTitle>
                <DialogDescription>
                  Eingegangen am {format(new Date(selectedInquiry.timestamp), "PPP, HH:mm", { locale: de })}
                </DialogDescription>
              </DialogHeader>

              <div className="grid grid-cols-2 gap-4 py-4">
                <div>
                  <h3 className="font-medium mb-2">Kontaktinformationen</h3>
                  <div className="space-y-2">
                    {selectedInquiry.type === "b2b" ? (
                      <>
                        <p>
                          <span className="font-medium">Firma:</span> {selectedInquiry.data.companyName}
                        </p>
                        <p>
                          <span className="font-medium">Ansprechpartner:</span> {selectedInquiry.data.contactPerson}
                        </p>
                      </>
                    ) : (
                      <p>
                        <span className="font-medium">Name:</span> {selectedInquiry.data.name}
                      </p>
                    )}
                    <p>
                      <span className="font-medium">E-Mail:</span> {selectedInquiry.data.email}
                    </p>
                    <p>
                      <span className="font-medium">Telefon:</span> {selectedInquiry.data.phone}
                    </p>
                    {selectedInquiry.type === "b2b" && (
                      <>
                        <p>
                          <span className="font-medium">Adresse:</span> {selectedInquiry.data.address}
                        </p>
                        <p>
                          <span className="font-medium">Geschäftsart:</span> {selectedInquiry.data.businessType}
                        </p>
                      </>
                    )}
                  </div>
                </div>

                {selectedInquiry.type === "motor" && (
                  <div>
                    <h3 className="font-medium mb-2">Fahrzeuginformationen</h3>
                    <div className="space-y-2">
                      <p>
                        <span className="font-medium">Fahrzeugmodell:</span> {selectedInquiry.data.carModel}
                      </p>
                      <p>
                        <span className="font-medium">Baujahr:</span> {selectedInquiry.data.carYear}
                      </p>
                      <p>
                        <span className="font-medium">Motortyp:</span> {selectedInquiry.data.engineType}
                      </p>
                      {selectedInquiry.data.vin && (
                        <p>
                          <span className="font-medium">VIN:</span> {selectedInquiry.data.vin}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="py-2">
                <h3 className="font-medium mb-2">Nachricht</h3>
                <div className="border rounded-md p-3 bg-gray-50 whitespace-pre-wrap">
                  {selectedInquiry.type === "contact"
                    ? selectedInquiry.data.message
                    : selectedInquiry.type === "motor"
                      ? selectedInquiry.data.description || "Keine Beschreibung angegeben."
                      : selectedInquiry.data.message || "Keine Nachricht angegeben."}
                </div>
              </div>

              <DialogFooter className="flex justify-between items-center">
                <div className="flex gap-2">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteInquiry(selectedInquiry.id, selectedInquiry.type as any)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Löschen
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Select
                    value={selectedInquiry.status}
                    onValueChange={(value) =>
                      updateInquiryStatus(selectedInquiry.id, selectedInquiry.type as any, value)
                    }
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Status ändern" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">
                        <div className="flex items-center">
                          <Clock className="mr-2 h-4 w-4 text-blue-500" />
                          Neu
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
                      <SelectItem value="archived">
                        <div className="flex items-center">
                          <X className="mr-2 h-4 w-4 text-gray-500" />
                          Archiviert
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
