"use client"

import { Label } from "@/components/ui/label"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import { de } from "date-fns/locale"
import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

interface ComplaintData {
  id: string
  customer_number: string
  customer_name: string
  email: string
  phone: string | null
  complaint_description: string
  error_date: string
  delivery_form: string
  processing_preference: string
  additional_info: string | null
  additional_costs: string
  status: string
  created_at: string
  updated_at: string
  complaint_items: any[]
  complaint_vehicle_data: any
  complaint_attachments: any[]
}

export function ComplaintsTab() {
  const [complaints, setComplaints] = useState<ComplaintData[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedComplaint, setSelectedComplaint] = useState<ComplaintData | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    fetchComplaints()
  }, [])

  const fetchComplaints = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/complaints")
      if (!response.ok) throw new Error("Failed to fetch complaints")
      const data = await response.json()
      setComplaints(data)
    } catch (error) {
      console.error("Error fetching complaints:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleViewDetails = (complaint: ComplaintData) => {
    setSelectedComplaint(complaint)
    setIsDialogOpen(true)
  }

  const filteredComplaints = complaints.filter((complaint) => {
    const matchesSearch =
      complaint.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.receipt_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.customer_number.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || complaint.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
            Ausstehend
          </Badge>
        )
      case "in_progress":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800">
            In Bearbeitung
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800">
            Abgeschlossen
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800">
            Abgelehnt
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd.MM.yyyy", { locale: de })
    } catch (error) {
      return dateString
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Suche nach Kunde, Belegnummer oder Kundennummer..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Alle Status</SelectItem>
            <SelectItem value="pending">Ausstehend</SelectItem>
            <SelectItem value="in_progress">In Bearbeitung</SelectItem>
            <SelectItem value="completed">Abgeschlossen</SelectItem>
            <SelectItem value="rejected">Abgelehnt</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={fetchComplaints}>Aktualisieren</Button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : filteredComplaints.length === 0 ? (
        <div className="text-center py-8 text-gray-500">Keine Reklamationen gefunden.</div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Datum</TableHead>
                <TableHead>Kunde</TableHead>
                <TableHead>Belegnummer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aktionen</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredComplaints.map((complaint) => (
                <TableRow key={complaint.id}>
                  <TableCell>{formatDate(complaint.created_at)}</TableCell>
                  <TableCell>{complaint.customer_name}</TableCell>
                  <TableCell>{complaint.receipt_number}</TableCell>
                  <TableCell>{getStatusBadge(complaint.status)}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => handleViewDetails(complaint)}>
                      Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Reklamation Details</DialogTitle>
          </DialogHeader>

          {selectedComplaint && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      <span>Reklamationsinformationen</span>
                      {getStatusBadge(selectedComplaint.status)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Belegnummer</Label>
                        <div className="font-medium">{selectedComplaint.receipt_number}</div>
                      </div>
                      <div>
                        <Label>Datum</Label>
                        <div className="font-medium">{formatDate(selectedComplaint.created_at)}</div>
                      </div>
                    </div>

                    <div>
                      <Label>Beschreibung</Label>
                      <div className="p-3 border rounded-md mt-1 whitespace-pre-wrap">
                        {selectedComplaint.complaint_description}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Kundeninformationen</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div>
                      <Label>Name</Label>
                      <div className="font-medium">{selectedComplaint.customer_name}</div>
                    </div>
                    <div>
                      <Label>Kundennummer</Label>
                      <div className="font-medium">{selectedComplaint.customer_number}</div>
                    </div>
                    <div>
                      <Label>E-Mail</Label>
                      <div className="font-medium">{selectedComplaint.email}</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
