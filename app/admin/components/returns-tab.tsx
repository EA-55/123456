"use client"

import React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { format } from "date-fns"
import { de } from "date-fns/locale"
import { Package, Search, Filter, RefreshCw, ChevronDown, ChevronUp, Edit, FileText, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface ReturnItem {
  id: string
  return_id: string
  article_number: string
  quantity: number
  delivery_note_number?: string
  condition: string
  return_reason: string
  other_reason?: string
  created_at: string
  updated_at: string
}

interface Return {
  id: string
  customer_number: string
  customer_name: string
  email: string
  comments?: string
  status: string
  processor_name?: string
  created_at: string
  updated_at: string
}

export function ReturnsTab() {
  const [returns, setReturns] = useState<Return[]>([])
  const [filteredReturns, setFilteredReturns] = useState<Return[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedReturn, setSelectedReturn] = useState<Return | null>(null)
  const [returnItems, setReturnItems] = useState<ReturnItem[]>([])
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [processorName, setProcessorName] = useState("")
  const [notes, setNotes] = useState("")
  const [newStatus, setNewStatus] = useState("")
  const { toast } = useToast()
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({})

  const toggleRowExpanded = (id: string) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  useEffect(() => {
    fetchReturns()
  }, [])

  useEffect(() => {
    filterReturns()
  }, [returns, searchTerm, statusFilter])

  const fetchReturns = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/returns")
      const data = await response.json()

      if (data.returns) {
        setReturns(data.returns)
      }
    } catch (error) {
      console.error("Fehler beim Laden der Rückgaben:", error)
      toast({
        variant: "destructive",
        title: "Fehler",
        description: "Die Rückgaben konnten nicht geladen werden.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const filterReturns = () => {
    let filtered = [...returns]

    // Suche
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(
        (item) =>
          item.customer_name.toLowerCase().includes(term) ||
          item.customer_number.toLowerCase().includes(term) ||
          item.email.toLowerCase().includes(term),
      )
    }

    // Status-Filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((item) => item.status === statusFilter)
    }

    // Sortieren nach Erstellungsdatum (neueste zuerst)
    filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

    setFilteredReturns(filtered)
  }

  const handleViewDetails = async (returnItem: Return) => {
    setSelectedReturn(returnItem)
    setIsDetailsOpen(true)

    try {
      const response = await fetch(`/api/returns/${returnItem.id}`)
      const data = await response.json()

      if (data.items) {
        setReturnItems(data.items)
      } else {
        setReturnItems([])
      }
    } catch (error) {
      console.error("Fehler beim Laden der Artikeldetails:", error)
      toast({
        variant: "destructive",
        title: "Fehler",
        description: "Die Artikeldetails konnten nicht geladen werden.",
      })
      setReturnItems([])
    }
  }

  const handleEditReturn = (returnItem: Return) => {
    setSelectedReturn(returnItem)
    setProcessorName(returnItem.processor_name || "")
    setNotes(returnItem.comments || "")
    setNewStatus(returnItem.status)
    setIsEditOpen(true)
  }

  const handleDeleteReturn = (returnItem: Return) => {
    setSelectedReturn(returnItem)
    setIsDeleteDialogOpen(true)
  }

  const confirmDeleteReturn = async () => {
    if (!selectedReturn) return

    try {
      const response = await fetch(`/api/returns/${selectedReturn.id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Fehler beim Löschen der Rückgabe")
      }

      // Aktualisieren der lokalen Daten
      setReturns((prev) => prev.filter((item) => item.id !== selectedReturn.id))
      setIsDeleteDialogOpen(false)

      toast({
        title: "Erfolgreich gelöscht",
        description: "Die Rückgabe wurde erfolgreich gelöscht.",
      })
    } catch (error) {
      console.error("Fehler beim Löschen der Rückgabe:", error)
      toast({
        variant: "destructive",
        title: "Fehler",
        description: "Die Rückgabe konnte nicht gelöscht werden.",
      })
    }
  }

  const handleUpdateReturn = async () => {
    if (!selectedReturn) return

    try {
      const response = await fetch(`/api/returns/${selectedReturn.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: newStatus,
          processorName,
          additionalInfo: notes,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Ein Fehler ist aufgetreten")
      }

      // Aktualisieren der lokalen Daten
      setReturns((prev) =>
        prev.map((item) =>
          item.id === selectedReturn.id
            ? {
                ...item,
                status: newStatus,
                processor_name: processorName,
                comments: notes,
              }
            : item,
        ),
      )

      setIsEditOpen(false)
      toast({
        title: "Erfolgreich aktualisiert",
        description: "Die Rückgabe wurde erfolgreich aktualisiert.",
      })
    } catch (error) {
      console.error("Fehler beim Aktualisieren der Rückgabe:", error)
      toast({
        variant: "destructive",
        title: "Fehler",
        description: "Die Rückgabe konnte nicht aktualisiert werden.",
      })
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
            Ausstehend
          </Badge>
        )
      case "approved":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800">
            Genehmigt
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800">
            Abgelehnt
          </Badge>
        )
      case "processing":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800">
            In Bearbeitung
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="bg-purple-100 text-purple-800">
            Abgeschlossen
          </Badge>
        )
      default:
        return <Badge variant="outline">Unbekannt</Badge>
    }
  }

  const getPackageConditionText = (condition: string) => {
    switch (condition) {
      case "Originalverpackung":
        return "Originalverpackung"
      case "Geöffnet, aber intakt":
        return "Geöffnet, aber intakt"
      case "Beschädigt":
        return "Beschädigt"
      case "Keine Verpackung":
        return "Keine Verpackung"
      default:
        return condition
    }
  }

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd.MM.yyyy HH:mm", { locale: de })
    } catch (error) {
      return "Ungültiges Datum"
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Package className="mr-2 h-5 w-5" />
            Rückgaben verwalten
          </CardTitle>
          <CardDescription>Verwalten Sie alle Rückgabeanfragen Ihrer Kunden.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Suche nach Kunde, Kundennummer oder E-Mail..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status filtern" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200 shadow-md">
                  <SelectItem value="all">Alle Status</SelectItem>
                  <SelectItem value="pending">Ausstehend</SelectItem>
                  <SelectItem value="approved">Genehmigt</SelectItem>
                  <SelectItem value="rejected">Abgelehnt</SelectItem>
                  <SelectItem value="processing">In Bearbeitung</SelectItem>
                  <SelectItem value="completed">Abgeschlossen</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button variant="outline" onClick={fetchReturns} className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4" />
              Aktualisieren
            </Button>
          </div>

          {filteredReturns.length === 0 ? (
            <div className="text-center py-8">
              <Package className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
              <h3 className="mt-4 text-lg font-medium">Keine Rückgaben gefunden</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Es wurden keine Rückgaben gefunden, die Ihren Filterkriterien entsprechen.
              </p>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Datum</TableHead>
                    <TableHead>Kunde</TableHead>
                    <TableHead>Kundennr.</TableHead>
                    <TableHead>E-Mail</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Aktionen</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReturns.map((returnItem) => (
                    <React.Fragment key={returnItem.id}>
                      <TableRow
                        className="cursor-pointer hover:bg-muted/50"
                        onClick={() => toggleRowExpanded(returnItem.id)}
                      >
                        <TableCell className="font-mono text-xs">{formatDate(returnItem.created_at)}</TableCell>
                        <TableCell>{returnItem.customer_name}</TableCell>
                        <TableCell>{returnItem.customer_number}</TableCell>
                        <TableCell className="max-w-[200px] truncate">{returnItem.email}</TableCell>
                        <TableCell>{getStatusBadge(returnItem.status)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={(e) => {
                                e.stopPropagation()
                                toggleRowExpanded(returnItem.id)
                              }}
                            >
                              {expandedRows[returnItem.id] ? (
                                <ChevronUp className="h-4 w-4" />
                              ) : (
                                <ChevronDown className="h-4 w-4" />
                              )}
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleViewDetails(returnItem)
                              }}
                            >
                              <FileText className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleEditReturn(returnItem)
                              }}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-destructive hover:text-destructive"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleDeleteReturn(returnItem)
                              }}
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                      {expandedRows[returnItem.id] && (
                        <TableRow>
                          <TableCell colSpan={6} className="bg-muted/30 p-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <h4 className="font-medium mb-2">Kundeninformationen</h4>
                                <p className="text-sm mb-1">
                                  <span className="font-medium">Kundennummer:</span> {returnItem.customer_number}
                                </p>
                                <p className="text-sm mb-1">
                                  <span className="font-medium">E-Mail:</span> {returnItem.email}
                                </p>
                              </div>
                              <div>
                                <h4 className="font-medium mb-2">Bearbeitungsinformationen</h4>
                                <p className="text-sm mb-1">
                                  <span className="font-medium">Status:</span> {getStatusBadge(returnItem.status)}
                                </p>
                                <p className="text-sm mb-1">
                                  <span className="font-medium">Bearbeiter:</span>{" "}
                                  {returnItem.processor_name || "Noch nicht zugewiesen"}
                                </p>
                                <p className="text-sm mb-1">
                                  <span className="font-medium">Eingereicht am:</span>{" "}
                                  {formatDate(returnItem.created_at)}
                                </p>
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Rückgabe Details</DialogTitle>
            <DialogDescription>Vollständige Informationen zur Rückgabe #{selectedReturn?.id}</DialogDescription>
          </DialogHeader>

          {selectedReturn && (
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="overview">Übersicht</TabsTrigger>
                <TabsTrigger value="articles">Artikel ({returnItems.length})</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium">Kundeninformationen</h3>
                      <div className="mt-2 space-y-2">
                        <p>
                          <span className="font-medium">Name:</span> {selectedReturn.customer_name}
                        </p>
                        <p>
                          <span className="font-medium">Kundennummer:</span> {selectedReturn.customer_number}
                        </p>
                        <p>
                          <span className="font-medium">E-Mail:</span> {selectedReturn.email}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium">Bestellinformationen</h3>
                      <div className="mt-2 space-y-2">
                        <p>
                          <span className="font-medium">Eingereicht am:</span> {formatDate(selectedReturn.created_at)}
                        </p>
                        <p>
                          <span className="font-medium">Status:</span> {getStatusBadge(selectedReturn.status)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium">Bearbeitung</h3>
                      <div className="mt-2 space-y-2">
                        <p>
                          <span className="font-medium">Bearbeiter:</span>{" "}
                          {selectedReturn.processor_name || "Noch nicht zugewiesen"}
                        </p>
                        <p>
                          <span className="font-medium">Rückgabe-ID:</span> {selectedReturn.id}
                        </p>
                      </div>
                    </div>
                  </div>

                  {selectedReturn.comments && (
                    <div className="md:col-span-2">
                      <h3 className="text-lg font-medium">Zusätzliche Informationen</h3>
                      <div className="mt-2 p-3 bg-muted rounded-md">{selectedReturn.comments}</div>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="articles" className="space-y-4 pt-4">
                {returnItems.length > 0 ? (
                  <div className="space-y-4">
                    {returnItems.map((article, index) => (
                      <div key={article.id} className="p-4 border rounded-md">
                        <h3 className="font-medium mb-2">Artikel {index + 1}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm mb-1">
                              <span className="font-medium">Artikelnummer:</span> {article.article_number}
                            </p>
                            <p className="text-sm mb-1">
                              <span className="font-medium">Menge:</span> {article.quantity}
                            </p>
                            {article.delivery_note_number && (
                              <p className="text-sm mb-1">
                                <span className="font-medium">Lieferscheinnummer:</span> {article.delivery_note_number}
                              </p>
                            )}
                          </div>
                          <div>
                            <p className="text-sm mb-1">
                              <span className="font-medium">Zustand:</span> {getPackageConditionText(article.condition)}
                            </p>
                            <p className="text-sm mb-1">
                              <span className="font-medium">Grund für Rückgabe:</span> {article.return_reason}
                            </p>
                            {article.other_reason && (
                              <p className="text-sm mb-1">
                                <span className="font-medium">Sonstiger Grund:</span> {article.other_reason}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">Keine detaillierten Artikelinformationen verfügbar.</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDetailsOpen(false)}>
              Schließen
            </Button>
            <Button
              onClick={() => {
                setIsDetailsOpen(false)
                if (selectedReturn) handleEditReturn(selectedReturn)
              }}
            >
              Bearbeiten
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rückgabe bearbeiten</DialogTitle>
            <DialogDescription>
              Aktualisieren Sie den Status und fügen Sie Bearbeitungsinformationen hinzu
            </DialogDescription>
          </DialogHeader>

          {selectedReturn && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={newStatus} onValueChange={setNewStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Status auswählen" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-gray-200 shadow-md">
                    <SelectItem value="pending">Ausstehend</SelectItem>
                    <SelectItem value="approved">Genehmigt</SelectItem>
                    <SelectItem value="rejected">Abgelehnt</SelectItem>
                    <SelectItem value="processing">In Bearbeitung</SelectItem>
                    <SelectItem value="completed">Abgeschlossen</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="processor">Bearbeiter</Label>
                <Input
                  id="processor"
                  value={processorName}
                  onChange={(e) => setProcessorName(e.target.value)}
                  placeholder="Name des Bearbeiters"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notizen</Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Interne Notizen zur Rückgabe"
                  rows={4}
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>
              Abbrechen
            </Button>
            <Button onClick={handleUpdateReturn}>Speichern</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Rückgabe löschen</AlertDialogTitle>
            <AlertDialogDescription>
              Sind Sie sicher, dass Sie diese Rückgabe löschen möchten? Diese Aktion kann nicht rückgängig gemacht
              werden.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Abbrechen</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteReturn} className="bg-destructive text-destructive-foreground">
              Löschen
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </motion.div>
  )
}
