"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { format } from "date-fns"
import {
  Truck,
  Car,
  BikeIcon as Motorcycle,
  Ship,
  Train,
  ChevronRight,
  ChevronLeft,
  Check,
  Upload,
  Loader2,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import type { ComplaintAttachment, ComplaintFormData } from "./types"

const STEPS = ["Kaufbeleg", "Artikel", "Fehlerbeschreibung", "Fahrzeugdaten", "Rechtliches", "Zusammenfassung"]

const VEHICLE_TYPES = [
  { id: "car", label: "PKW", icon: Car },
  { id: "truck", label: "LKW", icon: Truck },
  { id: "motorcycle", label: "Motorrad", icon: Motorcycle },
  { id: "ship", label: "Schiff", icon: Ship },
  { id: "train", label: "Zug", icon: Train },
]

const DELIVERY_FORMS = [
  { value: "personal", label: "Persönlich" },
  { value: "shipping", label: "Versand" },
  { value: "pickup", label: "Abholung" },
]

const PROCESSING_TYPES = [
  { value: "return", label: "Rückgabe" },
  { value: "exchange", label: "Austausch" },
  { value: "repair", label: "Reparatur" },
]

const ADDITIONAL_COSTS = [
  { value: "yes", label: "Ja" },
  { value: "no", label: "Nein" },
]

const ATTACHMENT_OPTIONS = [
  { value: "yes", label: "Ja" },
  { value: "no", label: "Nein" },
]

const INSTALLER_OPTIONS = [
  { value: "user", label: "Benutzer" },
  { value: "workshop", label: "Werkstatt" },
  { value: "dealer", label: "Händler" },
]

export default function ComplaintForm() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<Partial<ComplaintFormData>>({
    customerData: {
      customerNumber: "",
      customerName: "",
      email: "",
      phone: "",
    },
    receiptNumber: "",
    items: [
      {
        manufacturer: "",
        articleIndex: "",
        articleName: "",
        purchaseDate: format(new Date(), "yyyy-MM-dd"),
        quantity: 1,
      },
    ],
    description: "",
    errorDate: format(new Date(), "yyyy-MM-dd"),
    deliveryForm: "",
    preferredProcessing: "",
    additionalInfo: "",
    additionalCosts: false,
    hasAttachments: false,
    hasDiagnosticOutput: false,
    attachments: [],
    vehicleData: {
      vehicleType: "car",
      manufacturer: "",
      model: "",
      vehicleTypeDetail: "",
      year: "",
      vin: "",
      installationDate: "",
      removalDate: "",
      mileageInstallation: undefined,
      mileageRemoval: undefined,
      installer: "",
    },
  })

  const router = useRouter()
  const { toast } = useToast()

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const updateCustomerData = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      customerData: {
        ...prev.customerData!,
        [field]: value,
      },
    }))
  }

  const updateItem = (index: number, field: string, value: any) => {
    const updatedItems = [...(formData.items || [])]
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: value,
    }
    updateFormData("items", updatedItems)
  }

  const addItem = () => {
    const updatedItems = [...(formData.items || [])]
    updatedItems.push({
      manufacturer: "",
      articleIndex: "",
      articleName: "",
      purchaseDate: format(new Date(), "yyyy-MM-dd"),
      quantity: 1,
    })
    updateFormData("items", updatedItems)
  }

  const removeItem = (index: number) => {
    const updatedItems = [...(formData.items || [])]
    updatedItems.splice(index, 1)
    updateFormData("items", updatedItems)
  }

  const updateVehicleData = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      vehicleData: {
        ...prev.vehicleData!,
        [field]: value,
      },
    }))
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, isDiagnostic: boolean) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    const newAttachments: ComplaintAttachment[] = []

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      // In einer realen Anwendung würden wir die Datei hochladen und den Pfad speichern
      // Hier simulieren wir das nur
      newAttachments.push({
        fileName: file.name,
        filePath: `/uploads/${file.name}`,
        fileType: file.type,
        isDiagnostic,
      })
    }

    setFormData((prev) => ({
      ...prev,
      attachments: [...(prev.attachments || []), ...newAttachments],
    }))
  }

  const removeAttachment = (index: number) => {
    const updatedAttachments = [...(formData.attachments || [])]
    updatedAttachments.splice(index, 1)
    updateFormData("attachments", updatedAttachments)
  }

  const nextStep = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1)
      window.scrollTo(0, 0)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      window.scrollTo(0, 0)
    }
  }

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 0: // Kaufbeleg
        return (
          !!formData.receiptNumber &&
          !!formData.customerData?.customerNumber &&
          !!formData.customerData?.customerName &&
          !!formData.customerData?.email
        )
      case 1: // Artikel
        return formData.items?.every(
          (item) =>
            !!item.manufacturer &&
            !!item.articleIndex &&
            !!item.articleName &&
            !!item.purchaseDate &&
            item.quantity > 0,
        )
      case 2: // Fehlerbeschreibung
        return (
          !!formData.description && !!formData.errorDate && !!formData.deliveryForm && !!formData.preferredProcessing
        )
      case 3: // Fahrzeugdaten
        return (
          !!formData.vehicleData?.manufacturer &&
          !!formData.vehicleData?.model &&
          !!formData.vehicleData?.year &&
          !!formData.vehicleData?.vin
        )
      case 4: // Rechtliches
        return true // Keine Validierung für rechtliche Informationen
      default:
        return true
    }
  }

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true)

      // Hier würden wir die Daten an die API senden
      const response = await fetch("/api/complaints", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Fehler beim Senden der Reklamation")
      }

      const result = await response.json()

      toast({
        title: "Reklamation erfolgreich gesendet",
        description: "Ihre Reklamation wurde erfolgreich übermittelt. Wir werden uns in Kürze bei Ihnen melden.",
      })

      // Weiterleitung zur Bestätigungsseite oder Startseite
      router.push(`/reklamation/bestaetigung?id=${result.id}`)
    } catch (error) {
      console.error("Fehler beim Senden der Reklamation:", error)
      toast({
        title: "Fehler",
        description: "Beim Senden der Reklamation ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Kaufbeleg und Kundendaten</h2>

            <div className="space-y-4">
              <div>
                <Label htmlFor="receiptNumber" className="text-base flex items-center">
                  <span className="text-red-500 mr-1">*</span> Kaufbelegnummer
                </Label>
                <Input
                  id="receiptNumber"
                  placeholder="Geben Sie die vollständige Nummer des Kaufbelegs ein, z. B. 1234/LOK/17/R"
                  value={formData.receiptNumber}
                  onChange={(e) => updateFormData("receiptNumber", e.target.value)}
                  className="mt-1"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  <a href="#" className="text-blue-600 hover:underline">
                    Wo kann man die Rechnungsnummer finden
                  </a>
                </p>
              </div>

              <div className="pt-4 border-t">
                <h3 className="text-lg font-medium mb-4">Kundendaten</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="customerNumber" className="flex items-center">
                      <span className="text-red-500 mr-1">*</span> Kundennummer
                    </Label>
                    <Input
                      id="customerNumber"
                      placeholder="Ihre Kundennummer"
                      value={formData.customerData?.customerNumber}
                      onChange={(e) => updateCustomerData("customerNumber", e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="customerName" className="flex items-center">
                      <span className="text-red-500 mr-1">*</span> Name
                    </Label>
                    <Input
                      id="customerName"
                      placeholder="Ihr vollständiger Name"
                      value={formData.customerData?.customerName}
                      onChange={(e) => updateCustomerData("customerName", e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="flex items-center">
                      <span className="text-red-500 mr-1">*</span> E-Mail
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Ihre E-Mail-Adresse"
                      value={formData.customerData?.email}
                      onChange={(e) => updateCustomerData("email", e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Telefon</Label>
                    <Input
                      id="phone"
                      placeholder="Ihre Telefonnummer"
                      value={formData.customerData?.phone}
                      onChange={(e) => updateCustomerData("phone", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Artikel auswählen</h2>

            {formData.items?.map((item, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Artikel {index + 1}</h3>
                    {index > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Entfernen
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`manufacturer-${index}`} className="flex items-center">
                        <span className="text-red-500 mr-1">*</span> Hersteller
                      </Label>
                      <Input
                        id={`manufacturer-${index}`}
                        placeholder="Hersteller des Artikels"
                        value={item.manufacturer}
                        onChange={(e) => updateItem(index, "manufacturer", e.target.value)}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor={`articleIndex-${index}`} className="flex items-center">
                        <span className="text-red-500 mr-1">*</span> Index der gekauften Waren
                      </Label>
                      <Input
                        id={`articleIndex-${index}`}
                        placeholder="Artikelnummer"
                        value={item.articleIndex}
                        onChange={(e) => updateItem(index, "articleIndex", e.target.value)}
                        className="mt-1"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <Label htmlFor={`articleName-${index}`} className="flex items-center">
                        <span className="text-red-500 mr-1">*</span> Name
                      </Label>
                      <Input
                        id={`articleName-${index}`}
                        placeholder="Vollständiger Artikelname"
                        value={item.articleName}
                        onChange={(e) => updateItem(index, "articleName", e.target.value)}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor={`purchaseDate-${index}`} className="flex items-center">
                        <span className="text-red-500 mr-1">*</span> Kaufdatum
                      </Label>
                      <Input
                        id={`purchaseDate-${index}`}
                        type="date"
                        value={item.purchaseDate}
                        onChange={(e) => updateItem(index, "purchaseDate", e.target.value)}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor={`quantity-${index}`} className="flex items-center">
                        <span className="text-red-500 mr-1">*</span> Anzahl / Menge
                      </Label>
                      <Select
                        value={item.quantity.toString()}
                        onValueChange={(value) => updateItem(index, "quantity", Number.parseInt(value))}
                      >
                        <SelectTrigger id={`quantity-${index}`} className="mt-1">
                          <SelectValue placeholder="Menge auswählen" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                            <SelectItem key={num} value={num.toString()}>
                              {num}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Button variant="outline" onClick={addItem} className="w-full">
              Weiteren Artikel hinzufügen
            </Button>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Beschreibung der Reklamation</h2>

            <div className="space-y-4">
              <div>
                <Label htmlFor="description" className="text-base flex items-center">
                  <span className="text-red-500 mr-1">*</span> Beschreibung der Reklamation
                </Label>
                <Textarea
                  id="description"
                  placeholder="Beschreiben Sie das Problem so detailliert wie möglich"
                  value={formData.description}
                  onChange={(e) => updateFormData("description", e.target.value)}
                  className="mt-1 min-h-[150px]"
                />
                <div className="text-right text-sm text-muted-foreground mt-1">0/200</div>
              </div>

              <div>
                <Label htmlFor="errorDate" className="text-base flex items-center">
                  <span className="text-red-500 mr-1">*</span> Datum der Fehlerfeststellung
                </Label>
                <Input
                  id="errorDate"
                  type="date"
                  value={formData.errorDate}
                  onChange={(e) => updateFormData("errorDate", e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="deliveryForm" className="text-base flex items-center">
                  <span className="text-red-500 mr-1">*</span> Reklamation Lieferformular
                </Label>
                <Select value={formData.deliveryForm} onValueChange={(value) => updateFormData("deliveryForm", value)}>
                  <SelectTrigger id="deliveryForm" className="mt-1">
                    <SelectValue placeholder="Wählen" />
                  </SelectTrigger>
                  <SelectContent>
                    {DELIVERY_FORMS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="preferredProcessing" className="text-base flex items-center">
                  <span className="text-red-500 mr-1">*</span> Die bevorzugte Art der Bearbeitung von Reklamationn
                </Label>
                <Select
                  value={formData.preferredProcessing}
                  onValueChange={(value) => updateFormData("preferredProcessing", value)}
                >
                  <SelectTrigger id="preferredProcessing" className="mt-1">
                    <SelectValue placeholder="Wählen" />
                  </SelectTrigger>
                  <SelectContent>
                    {PROCESSING_TYPES.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="additionalInfo" className="text-base">
                  Zusätzliche Informationen
                </Label>
                <Textarea
                  id="additionalInfo"
                  placeholder="Weitere Informationen zur Reklamation"
                  value={formData.additionalInfo}
                  onChange={(e) => updateFormData("additionalInfo", e.target.value)}
                  className="mt-1 min-h-[100px]"
                />
                <div className="text-right text-sm text-muted-foreground mt-1">0/200</div>
              </div>

              <div>
                <Label htmlFor="additionalCosts" className="text-base">
                  Zusätzliche kosten
                </Label>
                <Select
                  value={formData.additionalCosts ? "yes" : "no"}
                  onValueChange={(value) => updateFormData("additionalCosts", value === "yes")}
                >
                  <SelectTrigger id="additionalCosts" className="mt-1">
                    <SelectValue placeholder="Wählen" />
                  </SelectTrigger>
                  <SelectContent>
                    {ADDITIONAL_COSTS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="hasAttachments" className="text-base">
                  Anhänge
                </Label>
                <Select
                  value={formData.hasAttachments ? "yes" : "no"}
                  onValueChange={(value) => {
                    const hasAttachments = value === "yes"
                    updateFormData("hasAttachments", hasAttachments)
                    if (!hasAttachments) {
                      // Entferne alle nicht-diagnostischen Anhänge
                      const diagnosticAttachments = formData.attachments?.filter((a) => a.isDiagnostic) || []
                      updateFormData("attachments", diagnosticAttachments)
                    }
                  }}
                >
                  <SelectTrigger id="hasAttachments" className="mt-1">
                    <SelectValue placeholder="Wählen" />
                  </SelectTrigger>
                  <SelectContent>
                    {ATTACHMENT_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {formData.hasAttachments && (
                <div className="mt-4">
                  <h3 className="text-lg font-medium mb-2">Anhänge</h3>
                  <div className="border rounded-md p-4">
                    <Label htmlFor="attachments" className="block mb-2">
                      Dateien auswählen
                    </Label>
                    <Input
                      id="attachments"
                      type="file"
                      multiple
                      onChange={(e) => handleFileUpload(e, false)}
                      className="mb-4"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full flex items-center justify-center"
                      onClick={() => document.getElementById("attachments")?.click()}
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      Neuer Anhang
                    </Button>

                    {formData.attachments?.filter((a) => !a.isDiagnostic).length > 0 && (
                      <div className="mt-4">
                        <h4 className="text-sm font-medium mb-2">Hochgeladene Dateien:</h4>
                        <ul className="space-y-2">
                          {formData.attachments
                            ?.filter((a) => !a.isDiagnostic)
                            .map((attachment, index) => (
                              <li key={index} className="flex items-center justify-between text-sm">
                                <span>{attachment.fileName}</span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    removeAttachment(
                                      formData.attachments?.findIndex((a) => a.fileName === attachment.fileName) || 0,
                                    )
                                  }
                                  className="text-red-500 hover:text-red-700 h-6 w-6 p-0"
                                >
                                  &times;
                                </Button>
                              </li>
                            ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div>
                <Label htmlFor="hasDiagnosticOutput" className="text-base">
                  Ausdruck vom Diagnosegerät
                </Label>
                <Select
                  value={formData.hasDiagnosticOutput ? "yes" : "no"}
                  onValueChange={(value) => {
                    const hasDiagnosticOutput = value === "yes"
                    updateFormData("hasDiagnosticOutput", hasDiagnosticOutput)
                    if (!hasDiagnosticOutput) {
                      // Entferne alle diagnostischen Anhänge
                      const regularAttachments = formData.attachments?.filter((a) => !a.isDiagnostic) || []
                      updateFormData("attachments", regularAttachments)
                    }
                  }}
                >
                  <SelectTrigger id="hasDiagnosticOutput" className="mt-1">
                    <SelectValue placeholder="Wählen" />
                  </SelectTrigger>
                  <SelectContent>
                    {ATTACHMENT_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {formData.hasDiagnosticOutput && (
                <div className="mt-4">
                  <h3 className="text-lg font-medium mb-2">Diagnostische Ausdrucke</h3>
                  <div className="border rounded-md p-4">
                    <Label htmlFor="diagnosticAttachments" className="block mb-2">
                      Dateien auswählen
                    </Label>
                    <Input
                      id="diagnosticAttachments"
                      type="file"
                      multiple
                      onChange={(e) => handleFileUpload(e, true)}
                      className="mb-4"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full flex items-center justify-center"
                      onClick={() => document.getElementById("diagnosticAttachments")?.click()}
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      Neuer Anhang
                    </Button>

                    {formData.attachments?.filter((a) => a.isDiagnostic).length > 0 && (
                      <div className="mt-4">
                        <h4 className="text-sm font-medium mb-2">Hochgeladene Diagnose-Dateien:</h4>
                        <ul className="space-y-2">
                          {formData.attachments
                            ?.filter((a) => a.isDiagnostic)
                            .map((attachment, index) => (
                              <li key={index} className="flex items-center justify-between text-sm">
                                <span>{attachment.fileName}</span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    removeAttachment(
                                      formData.attachments?.findIndex((a) => a.fileName === attachment.fileName) || 0,
                                    )
                                  }
                                  className="text-red-500 hover:text-red-700 h-6 w-6 p-0"
                                >
                                  &times;
                                </Button>
                              </li>
                            ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Fahrzeugdaten</h2>

            <div className="flex justify-between mb-6 overflow-x-auto">
              {VEHICLE_TYPES.map((type) => {
                const Icon = type.icon
                const isSelected = formData.vehicleData?.vehicleType === type.id
                return (
                  <div
                    key={type.id}
                    className={`flex flex-col items-center p-4 cursor-pointer transition-all ${
                      isSelected ? "bg-primary text-white" : "bg-gray-100 hover:bg-gray-200"
                    } rounded-md min-w-[80px]`}
                    onClick={() => updateVehicleData("vehicleType", type.id)}
                  >
                    <Icon className="h-8 w-8 mb-2" />
                    <span className="text-sm font-medium">{type.label}</span>
                  </div>
                )
              })}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="vehicleManufacturer" className="flex items-center">
                  <span className="text-red-500 mr-1">*</span> Fahrzeug Hersteller
                </Label>
                <Input
                  id="vehicleManufacturer"
                  placeholder="z.B. BMW, Mercedes, Audi"
                  value={formData.vehicleData?.manufacturer}
                  onChange={(e) => updateVehicleData("manufacturer", e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="vehicleModel" className="flex items-center">
                  <span className="text-red-500 mr-1">*</span> Fahrzeug Modell
                </Label>
                <Input
                  id="vehicleModel"
                  placeholder="z.B. 3er, C-Klasse, A4"
                  value={formData.vehicleData?.model}
                  onChange={(e) => updateVehicleData("model", e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="vehicleType" className="flex items-center">
                  <span className="text-red-500 mr-1">*</span> Fahrzeugtyp
                </Label>
                <Input
                  id="vehicleType"
                  placeholder="z.B. Limousine, Kombi, SUV"
                  value={formData.vehicleData?.vehicleTypeDetail}
                  onChange={(e) => updateVehicleData("vehicleTypeDetail", e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="vehicleYear" className="flex items-center">
                  <span className="text-red-500 mr-1">*</span> Baujahr
                </Label>
                <Input
                  id="vehicleYear"
                  placeholder="z.B. 2018"
                  value={formData.vehicleData?.year}
                  onChange={(e) => updateVehicleData("year", e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="vehicleVin" className="flex items-center">
                  <span className="text-red-500 mr-1">*</span> Fahrgestellnummer
                </Label>
                <Input
                  id="vehicleVin"
                  placeholder="VIN / Fahrgestellnummer"
                  value={formData.vehicleData?.vin}
                  onChange={(e) => updateVehicleData("vin", e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="installationDate" className="flex items-center">
                  <span className="text-red-500 mr-1">*</span> Installationsdatum
                </Label>
                <Input
                  id="installationDate"
                  type="date"
                  value={formData.vehicleData?.installationDate}
                  onChange={(e) => updateVehicleData("installationDate", e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="removalDate" className="flex items-center">
                  <span className="text-red-500 mr-1">*</span> Demontagedatum
                </Label>
                <Input
                  id="removalDate"
                  type="date"
                  value={formData.vehicleData?.removalDate}
                  onChange={(e) => updateVehicleData("removalDate", e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="mileageInstallation" className="flex items-center">
                  <span className="text-red-500 mr-1">*</span> Kilometerstand während der Montage [km]
                </Label>
                <Input
                  id="mileageInstallation"
                  type="number"
                  placeholder="z.B. 75000"
                  value={formData.vehicleData?.mileageInstallation?.toString() || ""}
                  onChange={(e) => updateVehicleData("mileageInstallation", Number.parseInt(e.target.value) || 0)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="mileageRemoval" className="flex items-center">
                  <span className="text-red-500 mr-1">*</span> Kilometerstand beim Abbau [km]
                </Label>
                <Input
                  id="mileageRemoval"
                  type="number"
                  placeholder="z.B. 78500"
                  value={formData.vehicleData?.mileageRemoval?.toString() || ""}
                  onChange={(e) => updateVehicleData("mileageRemoval", Number.parseInt(e.target.value) || 0)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="installer" className="flex items-center">
                  <span className="text-red-500 mr-1">*</span> Wer hat das Teil zusammengebaut
                </Label>
                <Select
                  value={formData.vehicleData?.installer}
                  onValueChange={(value) => updateVehicleData("installer", value)}
                >
                  <SelectTrigger id="installer" className="mt-1">
                    <SelectValue placeholder="Wählen" />
                  </SelectTrigger>
                  <SelectContent>
                    {INSTALLER_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Rechtliche Informationen</h2>

            <div className="space-y-4 text-sm">
              <div className="border rounded-md p-4 bg-gray-50">
                <div className="flex items-start space-x-2">
                  <Checkbox id="terms1" className="mt-1" />
                  <Label htmlFor="terms1" className="text-sm">
                    1. Ich erkläre, dass ich berechtigt bin, diese Reklamation und alle darin enthaltenen Angaben
                    einzureichen. Ich bestätige die Richtigkeit der von mir in dieser Reklamation angegebenen Daten.
                  </Label>
                </div>
              </div>

              <div className="border rounded-md p-4 bg-gray-50">
                <div className="flex items-start space-x-2">
                  <Checkbox id="terms2" className="mt-1" />
                  <Label htmlFor="terms2" className="text-sm">
                    2. Ich akzeptiere, dass die Bearbeitungszeit für Reklamationen ab dem Datum der Einreichung der
                    Reklamation auf 90 Kalendertage verlängert werden kann.
                  </Label>
                </div>
              </div>

              <div className="border rounded-md p-4 bg-gray-50">
                <div className="flex items-start space-x-2">
                  <Checkbox id="terms3" className="mt-1" />
                  <Label htmlFor="terms3" className="text-sm">
                    3. ErsatzteilPartner24 weist darauf hin, dass in einigen Fällen zur Beurteilung der Reklamation
                    einer Reklamation und zur Feststellung der Ursachen für mögliche Mängel der Waren und ihrer
                    Ursachen, möglicherweise eine Prüfung durchgeführt werden muss, die das reklamierte Produkt
                    beschädigen und in einigen Fällen sogar zerstören kann ("zerstörende Prüfung"). Die Durchführung
                    einer zerstörenden Prüfung kann die weitere Prüfung der Waren verhindern oder sogar verhindern. In
                    Kenntnis der oben genannten Umstände bin ich damit einverstanden, die zerstörenden Untersuchungen
                    des reklamierten Produkts durchzuführen, wenn dies erforderlich ist.
                  </Label>
                </div>
              </div>

              <div className="border rounded-md p-4 bg-gray-50">
                <div className="flex items-start space-x-2">
                  <Checkbox id="terms4" className="mt-1" />
                  <Label htmlFor="terms4" className="text-sm">
                    4. Hiermit ermächtige ich ErsatzteilPartner24 für die Zerstörung von Waren nach der Reklamation
                    (d.h. reparierte Waren, ersetzte Waren oder Waren in dem Zustand, in dem sie sich befinden, wenn die
                    Reklamation nicht angenommen wird) ("Waren"), wenn (i) ich die Waren nach Prüfung durch
                    ErsatzteilPartner24 meiner Reklamation (d. h. ich werde die Pakete mit der Ware nicht abholen oder
                    ich werde die Ware nicht persönlich abholen) oder wenn ich über die Möglichkeit der Entfernung
                    informiert / informiert habe, gleichzeitig (ii) läuft die zusätzliche 30-tägige Frist für mich ab,
                    um Inter Cars SA das Gut sammeln. Um Zweifel auszuschließen, eine zusätzliche Anfrage zur Abholung
                    der Ware gemäß der von mir im Reklamationsformular ausgewählten Kontaktmethode gesendet wird.
                  </Label>
                </div>
              </div>

              <div className="border rounded-md p-4 bg-gray-50">
                <h3 className="font-bold text-center mb-4">Persönliche Daten</h3>
                <p className="mb-4">
                  Der Verantwortliche für Ihre personenbezogenen Daten ist ErsatzteilPartner24, Dietrich Bonhoeffer Str.
                  4, 21423 Winsen Luhe, Tel: 01705345350, service@ersatzteilpartner24.de. Der Administrator kann unter
                  einer Korrespondenzadresse erreicht oder unter service@ersatzteilpartner24.de kontaktiert werden kann.
                  Die Angabe von Daten ist freiwillig und eine Voraussetzung für die Prüfung der Reklamation.
                  Andernfalls wird deren Prüfung verhindert. Die Daten werden zum Zwecke der Prüfung der Reklamation
                  (Rechtsgrundlage: zur Vertragserfüllung erforderliche Verarbeitung) und zur Feststellung und
                  Verfolgung möglicher Ansprüche (Rechtsgrundlage: berechtigtes Interesse des Administrators)
                  verarbeitet. Gegebenenfalls können Empfänger der Daten Hersteller der reklamierten Waren sein. Die
                  Daten werden für einen Zeitraum von 2 Jahren ab dem Datum der Prüfung der Reklamation, der Beilegung
                  möglicher Ansprüche und nach geltendem Recht (z. B. Rechnungslegungsvorschriften) gespeichert.
                </p>
                <p>Jeder hat das Recht:</p>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>
                    den Zugriff auf seine persönlichen Daten, die Berichtigung, Löschung, Verarbeitungsbeschränkungen
                    und deren Übertragung anzufordern;
                  </li>
                  <li>
                    Einspruch gegen die Datenverarbeitung, Einreichung einer Beschwerde bei der Aufsichtsbehörde und
                    jederzeitigen Widerruf der Einwilligung ohne die Rechtmäßigkeit der Verarbeitung aufgrund der
                    Einwilligung vor deren Rücknahme zu beeinträchtigen;
                  </li>
                  <li>
                    Einspruch gegen die Verarbeitung seiner personenbezogenen Daten auf der Grundlage eines legitimen
                    Verfahrens im Interesse der Administratoren sowie den Widerspruch gegen die Verarbeitung
                    personenbezogener Daten zu Marketingzwecken.
                  </li>
                </ol>
              </div>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Zusammenfassung</h2>

            <div className="border rounded-md overflow-hidden">
              <div className="bg-gray-50 p-4 border-b">
                <h3 className="font-medium">Zusammenfassung</h3>
              </div>

              <div className="p-4 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium">Belegnummer</p>
                    <p>{formData.receiptNumber}</p>
                  </div>

                  {formData.items?.map((item, index) => (
                    <div key={index} className="col-span-2 border-t pt-4 mt-2 first:border-t-0 first:pt-0 first:mt-0">
                      <h4 className="font-medium mb-2">Artikel {index + 1}</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium">Hersteller</p>
                          <p>{item.manufacturer}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Index der gekauften Waren</p>
                          <p>{item.articleIndex}</p>
                        </div>
                        <div className="col-span-2">
                          <p className="text-sm font-medium">Name</p>
                          <p>{item.articleName}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Anzahl / Menge</p>
                          <p>{item.quantity}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Kaufdatum</p>
                          <p>{format(new Date(item.purchaseDate), "dd.MM.yyyy")}</p>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="col-span-2 border-t pt-4 mt-2">
                    <h4 className="font-medium mb-2">Beschreibung der Reklamation</h4>
                    <p className="whitespace-pre-wrap">{formData.description}</p>
                  </div>

                  <div>
                    <p className="text-sm font-medium">Reklamation Lieferformular</p>
                    <p>
                      {DELIVERY_FORMS.find((f) => f.value === formData.deliveryForm)?.label || formData.deliveryForm}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium">Die bevorzugte Art der Bearbeitung von Reklamationn</p>
                    <p>
                      {PROCESSING_TYPES.find((p) => p.value === formData.preferredProcessing)?.label ||
                        formData.preferredProcessing}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium">Zusätzliche kosten</p>
                    <p>{formData.additionalCosts ? "Ja" : "Nein"}</p>
                  </div>

                  <div className="col-span-2 border-t pt-4 mt-2">
                    <h4 className="font-medium mb-2">Fahrzeug</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium">Fahrzeug</p>
                        <p>
                          {VEHICLE_TYPES.find((t) => t.id === formData.vehicleData?.vehicleType)?.label ||
                            formData.vehicleData?.vehicleType}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Fahrgestellnummer</p>
                        <p>{formData.vehicleData?.vin}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Baujahr</p>
                        <p>{formData.vehicleData?.year}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Installationsdatum</p>
                        <p>
                          {formData.vehicleData?.installationDate
                            ? format(new Date(formData.vehicleData.installationDate), "dd.MM.yyyy")
                            : "-"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Demontagedatum</p>
                        <p>
                          {formData.vehicleData?.removalDate
                            ? format(new Date(formData.vehicleData.removalDate), "dd.MM.yyyy")
                            : "-"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Kilometerstand während der Montage [km]</p>
                        <p>{formData.vehicleData?.mileageInstallation || "-"}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Kilometerstand beim Abbau [km]</p>
                        <p>{formData.vehicleData?.mileageRemoval || "-"}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Wer hat das Teil zusammengebaut</p>
                        <p>
                          {INSTALLER_OPTIONS.find((i) => i.value === formData.vehicleData?.installer)?.label ||
                            formData.vehicleData?.installer ||
                            "-"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Fortschrittsanzeige */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {STEPS.map((step, index) => (
            <div
              key={index}
              className={`text-xs font-medium ${index <= currentStep ? "text-primary" : "text-gray-400"}`}
            >
              {step}
            </div>
          ))}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-primary h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Formularinhalt */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderStepContent()}
        </motion.div>
      </AnimatePresence>

      {/* Navigationsschaltflächen */}
      <div className="mt-8 flex justify-between">
        <Button type="button" variant="outline" onClick={prevStep} disabled={currentStep === 0}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Zurück
        </Button>

        {currentStep < STEPS.length - 1 ? (
          <Button type="button" onClick={nextStep} disabled={!validateCurrentStep()}>
            Weiter
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-green-600 hover:bg-green-700"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Wird gesendet...
              </>
            ) : (
              <>
                Schließ eine Zugabe der Reklamation
                <Check className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  )
}
