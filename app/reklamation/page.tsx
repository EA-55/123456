"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ChevronRight, ChevronLeft, Upload, Info, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { submitReklamation } from "./actions"
import { useToast } from "@/components/ui/use-toast"

export default function ReklamationPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    // Kundendaten
    customerNumber: "",
    customerName: "",
    contactEmail: "",
    contactPhone: "",

    // Beleg/Artikel
    receiptNumber: "",
    manufacturer: "",
    articleIndex: "",
    articleName: "",
    purchaseDate: "",
    quantity: "1",

    // Reklamationsbeschreibung
    description: "",
    errorDate: "",
    deliveryForm: "Persönlich",
    preferredHandling: "Bargeldückgabe",
    additionalInfo: "",
    additionalCosts: "Nein",

    // Fahrzeugdaten
    vehicleManufacturer: "",
    vehicleModel: "",
    vehicleType: "",
    constructionYear: "",
    chassisNumber: "",
    installationDate: "",
    removalDate: "",
    mileageInstallation: "",
    mileageRemoval: "",
    assembledBy: "Benutzer",

    // Rechtliches
    termsAccepted: false,
  })

  const [summary, setSummary] = useState({})

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleSelectChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const nextStep = () => {
    if (step === 1 && (!formData.customerNumber || !formData.customerName || !formData.contactEmail)) {
      toast({
        title: "Fehlende Angaben",
        description: "Bitte füllen Sie alle Pflichtfelder aus.",
        variant: "destructive",
      })
      return
    }

    if (step === 2 && (!formData.receiptNumber || !formData.articleName)) {
      toast({
        title: "Fehlende Angaben",
        description: "Bitte füllen Sie alle Pflichtfelder aus.",
        variant: "destructive",
      })
      return
    }

    if (step === 3 && (!formData.description || !formData.errorDate)) {
      toast({
        title: "Fehlende Angaben",
        description: "Bitte füllen Sie alle Pflichtfelder aus.",
        variant: "destructive",
      })
      return
    }

    if (step === 5 && !formData.termsAccepted) {
      toast({
        title: "Zustimmung erforderlich",
        description: "Bitte akzeptieren Sie die Bedingungen, um fortzufahren.",
        variant: "destructive",
      })
      return
    }

    if (step === 5) {
      // Zusammenfassung erstellen
      setSummary({
        ...formData,
      })
    }

    setStep(step + 1)
    window.scrollTo(0, 0)
  }

  const prevStep = () => {
    setStep(step - 1)
    window.scrollTo(0, 0)
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    try {
      const result = await submitReklamation(formData)

      if (result.success) {
        toast({
          title: "Reklamation erfolgreich gesendet",
          description: "Ihre Reklamation wurde erfolgreich übermittelt. Wir werden uns in Kürze bei Ihnen melden.",
        })

        // Zurück zur Startseite nach kurzer Verzögerung
        setTimeout(() => {
          router.push("/")
        }, 2000)
      } else {
        throw new Error(result.error || "Unbekannter Fehler")
      }
    } catch (error) {
      toast({
        title: "Fehler beim Senden",
        description:
          error.message ||
          "Beim Senden Ihrer Reklamation ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.",
        variant: "destructive",
      })
      setIsSubmitting(false)
    }
  }

  const renderStepIndicator = () => {
    return (
      <div className="flex justify-center mb-8">
        <div className="flex items-center space-x-2">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="flex items-center">
              <div
                className={`rounded-full h-10 w-10 flex items-center justify-center ${
                  step === i
                    ? "bg-primary text-white"
                    : step > i
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-500"
                }`}
              >
                {step > i ? <Check className="h-5 w-5" /> : i}
              </div>
              {i < 6 && <div className={`h-1 w-8 ${step > i ? "bg-green-500" : "bg-gray-200"}`}></div>}
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Eine Reklamation melden</h1>

      {renderStepIndicator()}

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>
            {step === 1 && "Kundendaten"}
            {step === 2 && "Artikel auswählen"}
            {step === 3 && "Beschreibung der Reklamation"}
            {step === 4 && "Fahrzeugdaten"}
            {step === 5 && "Rechtliche Hinweise"}
            {step === 6 && "Zusammenfassung"}
          </CardTitle>
        </CardHeader>

        <CardContent>
          {/* Schritt 1: Kundendaten */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="customerNumber" className="font-medium">
                  Kundennummer <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="customerNumber"
                  name="customerNumber"
                  value={formData.customerNumber}
                  onChange={handleChange}
                  placeholder="Ihre Kundennummer"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="customerName" className="font-medium">
                  Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="customerName"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleChange}
                  placeholder="Vor- und Nachname"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactEmail" className="font-medium">
                  E-Mail <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="contactEmail"
                  name="contactEmail"
                  type="email"
                  value={formData.contactEmail}
                  onChange={handleChange}
                  placeholder="ihre-email@beispiel.de"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactPhone" className="font-medium">
                  Telefon
                </Label>
                <Input
                  id="contactPhone"
                  name="contactPhone"
                  value={formData.contactPhone}
                  onChange={handleChange}
                  placeholder="Ihre Telefonnummer"
                />
              </div>
            </motion.div>
          )}

          {/* Schritt 2: Artikel auswählen */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="receiptNumber" className="font-medium">
                  Kaufbelegnummer <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="receiptNumber"
                  name="receiptNumber"
                  value={formData.receiptNumber}
                  onChange={handleChange}
                  placeholder="z. B. 1234/LOK/17/R"
                  required
                />
                <p className="text-sm text-muted-foreground">Geben Sie die vollständige Nummer des Kaufbelegs ein</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="manufacturer" className="font-medium">
                  Hersteller <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="manufacturer"
                  name="manufacturer"
                  value={formData.manufacturer}
                  onChange={handleChange}
                  placeholder="z.B. TRW AUTOMOTIVE"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="articleIndex" className="font-medium">
                  Index der gekauften Waren <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="articleIndex"
                  name="articleIndex"
                  value={formData.articleIndex}
                  onChange={handleChange}
                  placeholder="z.B. DF2734"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="articleName" className="font-medium">
                  Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="articleName"
                  name="articleName"
                  value={formData.articleName}
                  onChange={handleChange}
                  placeholder="Artikelbezeichnung"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="purchaseDate" className="font-medium">
                  Kaufdatum <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="purchaseDate"
                  name="purchaseDate"
                  type="date"
                  value={formData.purchaseDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="quantity" className="font-medium">
                  Anzahl / Menge <span className="text-red-500">*</span>
                </Label>
                <Select value={formData.quantity} onValueChange={(value) => handleSelectChange("quantity", value)}>
                  <SelectTrigger>
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
            </motion.div>
          )}

          {/* Schritt 3: Beschreibung der Reklamation */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="description" className="font-medium">
                  Beschreibung der Reklamation <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Bitte beschreiben Sie das Problem ausführlich..."
                  className="min-h-[150px]"
                  required
                />
                <div className="text-right text-sm text-muted-foreground">{formData.description.length}/200</div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="errorDate" className="font-medium">
                  Datum der Fehlerfeststellung <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="errorDate"
                  name="errorDate"
                  type="date"
                  value={formData.errorDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="deliveryForm" className="font-medium">
                  Reklamation Lieferformular <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.deliveryForm}
                  onValueChange={(value) => handleSelectChange("deliveryForm", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Bitte wählen" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Persönlich">Persönlich</SelectItem>
                    <SelectItem value="Per Post">Per Post</SelectItem>
                    <SelectItem value="Per Kurier">Per Kurier</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="preferredHandling" className="font-medium">
                  Die bevorzugte Art der Bearbeitung von Reklamationn <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.preferredHandling}
                  onValueChange={(value) => handleSelectChange("preferredHandling", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Bitte wählen" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Bargeldückgabe">Bargeldückgabe</SelectItem>
                    <SelectItem value="Ersatzlieferung">Ersatzlieferung</SelectItem>
                    <SelectItem value="Reparatur">Reparatur</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="additionalInfo" className="font-medium">
                  Zusätzliche Informationen
                </Label>
                <Textarea
                  id="additionalInfo"
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleChange}
                  placeholder="Weitere Informationen zur Reklamation..."
                  className="min-h-[100px]"
                />
                <div className="text-right text-sm text-muted-foreground">{formData.additionalInfo.length}/200</div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="additionalCosts" className="font-medium">
                  Zusätzliche kosten
                </Label>
                <Select
                  value={formData.additionalCosts}
                  onValueChange={(value) => handleSelectChange("additionalCosts", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Bitte wählen" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Nein">Nein</SelectItem>
                    <SelectItem value="Ja">Ja</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="font-medium">Anhänge</Label>
                <div className="border border-dashed rounded-md p-6 text-center">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Ziehen Sie Dateien hierher oder klicken Sie, um Dateien auszuwählen
                  </p>
                  <Button variant="outline" className="mt-4">
                    Neuer Anhang
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="font-medium">Ausdruck vom Diagnosegerät</Label>
                <Select
                  value={formData.diagnosticPrintout}
                  onValueChange={(value) => handleSelectChange("diagnosticPrintout", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Bitte wählen" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Ja">Ja</SelectItem>
                    <SelectItem value="Nein">Nein</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </motion.div>
          )}

          {/* Schritt 4: Fahrzeugdaten */}
          {step === 4 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-semibold mb-4">Fahrzeugdaten</h3>

              <div className="grid grid-cols-6 gap-4 mb-6">
                <div className="border rounded-md p-4 flex flex-col items-center justify-center hover:bg-muted cursor-pointer">
                  <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 10.5H4.5V13.5H7V10.5Z" fill="currentColor" />
                    <path d="M19.5 10.5H17V13.5H19.5V10.5Z" fill="currentColor" />
                    <path d="M16 8H8L6 14H18L16 8Z" fill="currentColor" />
                    <path d="M6.5 15H17.5V16H6.5V15Z" fill="currentColor" />
                  </svg>
                  <span className="text-xs mt-2">PKW</span>
                </div>
                <div className="border rounded-md p-4 flex flex-col items-center justify-center hover:bg-muted cursor-pointer">
                  <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 8H17L15 13H9L7 8H4V16H20V8Z" fill="currentColor" />
                    <path d="M6.5 17H8.5V18H6.5V17Z" fill="currentColor" />
                    <path d="M15.5 17H17.5V18H15.5V17Z" fill="currentColor" />
                  </svg>
                  <span className="text-xs mt-2">LKW</span>
                </div>
                <div className="border rounded-md p-4 flex flex-col items-center justify-center hover:bg-muted cursor-pointer">
                  <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 8L14 12H10L8 8H16Z" fill="currentColor" />
                    <path d="M8 13H16V16H8V13Z" fill="currentColor" />
                    <path d="M12 6V8H16L14 12" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                  <span className="text-xs mt-2">Motorrad</span>
                </div>
                <div className="border rounded-md p-4 flex flex-col items-center justify-center hover:bg-muted cursor-pointer">
                  <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 8H6V16H18V8Z" fill="currentColor" />
                    <path d="M5 10H3V14H5V10Z" fill="currentColor" />
                    <path d="M21 10H19V14H21V10Z" fill="currentColor" />
                    <path d="M7 16V18H9V16H7Z" fill="currentColor" />
                    <path d="M15 16V18H17V16H15Z" fill="currentColor" />
                  </svg>
                  <span className="text-xs mt-2">Bus</span>
                </div>
                <div className="border rounded-md p-4 flex flex-col items-center justify-center hover:bg-muted cursor-pointer">
                  <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 10H18V14H6V10Z" fill="currentColor" />
                    <path d="M8 14V16H10V14H8Z" fill="currentColor" />
                    <path d="M14 14V16H16V14H14Z" fill="currentColor" />
                    <path d="M6 8H18V10H6V8Z" fill="currentColor" />
                  </svg>
                  <span className="text-xs mt-2">Anhänger</span>
                </div>
                <div className="border rounded-md p-4 flex flex-col items-center justify-center hover:bg-muted cursor-pointer">
                  <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 6V18M8 10V14M16 10V14" stroke="currentColor" strokeWidth="2" />
                    <path d="M7 16L17 16" stroke="currentColor" strokeWidth="2" />
                  </svg>
                  <span className="text-xs mt-2">Andere</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="vehicleManufacturer" className="font-medium">
                  Fahrzeug Hersteller <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="vehicleManufacturer"
                  name="vehicleManufacturer"
                  value={formData.vehicleManufacturer}
                  onChange={handleChange}
                  placeholder="z.B. Volkswagen"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="vehicleModel" className="font-medium">
                  Fahrzeug Modell <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="vehicleModel"
                  name="vehicleModel"
                  value={formData.vehicleModel}
                  onChange={handleChange}
                  placeholder="z.B. Golf"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="vehicleType" className="font-medium">
                  Fahrzeugtyp <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="vehicleType"
                  name="vehicleType"
                  value={formData.vehicleType}
                  onChange={handleChange}
                  placeholder="z.B. 1.4 TSI"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="constructionYear" className="font-medium">
                  Baujahr <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="constructionYear"
                  name="constructionYear"
                  value={formData.constructionYear}
                  onChange={handleChange}
                  placeholder="z.B. 2018"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="chassisNumber" className="font-medium">
                  Fahrgestellnummer <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="chassisNumber"
                  name="chassisNumber"
                  value={formData.chassisNumber}
                  onChange={handleChange}
                  placeholder="z.B. WDD2052081F123456"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="installationDate" className="font-medium">
                  Installationsdatum <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="installationDate"
                  name="installationDate"
                  type="date"
                  value={formData.installationDate}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="removalDate" className="font-medium">
                  Demontagedatum <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="removalDate"
                  name="removalDate"
                  type="date"
                  value={formData.removalDate}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="mileageInstallation" className="font-medium">
                  Kilometerstand während der Montage [km] <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="mileageInstallation"
                  name="mileageInstallation"
                  value={formData.mileageInstallation}
                  onChange={handleChange}
                  placeholder="z.B. 75000"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="mileageRemoval" className="font-medium">
                  Kilometerstand beim Abbau [km] <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="mileageRemoval"
                  name="mileageRemoval"
                  value={formData.mileageRemoval}
                  onChange={handleChange}
                  placeholder="z.B. 78500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="assembledBy" className="font-medium">
                  Wer hat das Teil zusammengebaut <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.assembledBy}
                  onValueChange={(value) => handleSelectChange("assembledBy", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Bitte wählen" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Benutzer">Benutzer</SelectItem>
                    <SelectItem value="Werkstatt">Werkstatt</SelectItem>
                    <SelectItem value="Andere">Andere</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </motion.div>
          )}

          {/* Schritt 5: Rechtliche Hinweise */}
          {step === 5 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div className="border rounded-md p-4 bg-muted/30 text-sm space-y-4 max-h-[400px] overflow-y-auto">
                <p>
                  1. Ich erkläre, dass ich berechtigt bin, diese Reklamation und alle darin enthaltenen Angaben
                  einzureichen. Ich bestätige die Richtigkeit der von mir in der Reklamation angegebenen Daten.
                </p>

                <p>
                  2. Ich akzeptiere, dass die Bearbeitungszeit für Reklamationen ab dem Datum der Einreichung der
                  Reklamation auf 90 Kalendertage verlängert werden kann.
                </p>

                <p>
                  3. ErsatzteilPartner24 weist darauf hin, dass in einigen Fällen zur Beurteilung der Reklamation einer
                  weist darauf hin, dass in einigen Fällen zur Beurteilung der Reklamation einer Überprüfung der Mängel
                  der Waren und ihrer Ursachen, möglicherweise eine Prüfung durchgeführt werden muss. Diese Prüfung kann
                  die reklamierte Sache beschädigen und in einigen Fällen sogar zerstören kann ("zerstörende Prüfung").
                  Die Durchführung einer zerstörenden Prüfung kann die weitere Prüfung der Ware verhindern oder sogar
                  unmöglich machen. In Kenntnis der genannten Umstände bin ich damit einverstanden, die zerstörenden
                  Untersuchung des reklamierten Produkts durchzuführen, wenn dies erforderlich ist.
                </p>

                <p>
                  4. Hiermit ermächtige ich ErsatzteilPartner24 für die Zerstörung von Waren nach der Reklamation (d.h.
                  reparierte Waren, ersetzte Waren oder Waren in dem Zustand, in dem sie sich befinden, wenn die
                  Reklamation nicht angenommen wird) und/oder Waren, wenn ich die Waren nach Prüfung durch
                  ErsatzteilPartner24 nicht persönlich abhole, wenn ich die Ware auf keine andere Weise abholen /
                  geliefert habe.
                </p>

                <p>
                  5. Gemäß der Datenschutz-Grundverordnung (DSGVO) informieren wir Sie, dass der Verantwortliche für die
                  Verarbeitung Ihrer personenbezogenen Daten ErsatzteilPartner24, Dietrich Bonhoeffer Str. 4, 21423
                  Winsen Luhe, Tel: 01705345350, info@ersatzteilpartner24.de ist. Der Datenschutzbeauftragte kann unter
                  info@ersatzteilpartner24.de kontaktiert werden. Die Angabe von Daten ist freiwillig und die
                  Voraussetzung für die Bearbeitung der Reklamation. Andernfalls wird deren Prüfung verhindert. Die
                  Daten werden zum Zwecke der Prüfung der Reklamation (Rechtsgrundlage: zur Vertragserfüllung
                  erforderliche Verarbeitung) und zur Feststellung und Verfolgung möglicher Ansprüche (Rechtsgrundlage:
                  berechtigtes Interesse des Verantwortlichen) verarbeitet. Gegebenenfalls können Empfänger der Daten
                  Hersteller der reklamierten Waren sein. Die Daten werden für einen Zeitraum von 2 Jahren ab dem Datum
                  der Prüfung der Reklamation, der Beilegung möglicher Ansprüche und nach geltendem Recht (z. B.
                  Rechnungslegungsvorschriften) gespeichert.
                </p>

                <p>Jeder hat das Recht:</p>
                <ol className="list-decimal list-inside pl-4">
                  <li>
                    den Zugriff auf seine personenbezogenen Daten, die Berichtigung, Löschung,
                    Verarbeitungsbeschränkungen und deren Übertragung anzufordern;
                  </li>
                  <li>
                    Einspruch gegen die Datenverarbeitung, Einreichung einer Beschwerde bei der Aufsichtsbehörde und
                    jederzeitiger Widerruf der Einwilligung ohne Beeinträchtigung der Rechtmäßigkeit der Verarbeitung
                    aufgrund der Einwilligung vor deren Rücknahme zu beanspruchen;
                  </li>
                  <li>
                    Einspruch gegen die Verarbeitung seiner personenbezogenen Daten auf der Grundlage eines legitimen
                    Verfahrens im Interesse des Administrators sowie den Widerspruch gegen die Verarbeitung ihrer
                    personenbezogenen Daten zu Marketingzwecken.
                  </li>
                </ol>
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="termsAccepted"
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onCheckedChange={(checked) => {
                    setFormData({
                      ...formData,
                      termsAccepted: checked === true,
                    })
                  }}
                />
                <Label
                  htmlFor="termsAccepted"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Ich habe die obigen Bedingungen gelesen und akzeptiere sie <span className="text-red-500">*</span>
                </Label>
              </div>
            </motion.div>
          )}

          {/* Schritt 6: Zusammenfassung */}
          {step === 6 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-semibold mb-4">Zusammenfassung</h3>

              <div className="border rounded-md divide-y">
                <div className="grid grid-cols-3 p-3">
                  <div className="font-medium">Belegnummer</div>
                  <div className="col-span-2">{formData.receiptNumber}</div>
                </div>

                <div className="grid grid-cols-3 p-3">
                  <div className="font-medium">Hersteller</div>
                  <div className="col-span-2">{formData.manufacturer}</div>
                </div>

                <div className="grid grid-cols-3 p-3">
                  <div className="font-medium">Index der gekauften Waren</div>
                  <div className="col-span-2">{formData.articleIndex}</div>
                </div>

                <div className="grid grid-cols-3 p-3">
                  <div className="font-medium">Name</div>
                  <div className="col-span-2">{formData.articleName}</div>
                </div>

                <div className="grid grid-cols-3 p-3">
                  <div className="font-medium">Anzahl / Menge</div>
                  <div className="col-span-2">{formData.quantity}</div>
                </div>

                <div className="grid grid-cols-3 p-3">
                  <div className="font-medium">Kaufdatum</div>
                  <div className="col-span-2">{formData.purchaseDate}</div>
                </div>

                <div className="grid grid-cols-3 p-3">
                  <div className="font-medium">Beschreibung der Reklamation</div>
                  <div className="col-span-2">{formData.description}</div>
                </div>

                <div className="grid grid-cols-3 p-3">
                  <div className="font-medium">Reklamation Lieferformular</div>
                  <div className="col-span-2">{formData.deliveryForm}</div>
                </div>

                <div className="grid grid-cols-3 p-3">
                  <div className="font-medium">Die bevorzugte Art der Bearbeitung von Reklamationn</div>
                  <div className="col-span-2">{formData.preferredHandling}</div>
                </div>

                <div className="grid grid-cols-3 p-3">
                  <div className="font-medium">Zusätzliche kosten</div>
                  <div className="col-span-2">{formData.additionalCosts}</div>
                </div>

                <div className="grid grid-cols-3 p-3">
                  <div className="font-medium">Beschreibung der Ansprüche</div>
                  <div className="col-span-2">{formData.additionalInfo || "-"}</div>
                </div>

                <div className="grid grid-cols-3 p-3">
                  <div className="font-medium">Fahrzeug</div>
                  <div className="col-span-2">
                    {formData.vehicleManufacturer} {formData.vehicleModel}
                  </div>
                </div>

                <div className="grid grid-cols-3 p-3">
                  <div className="font-medium">Fahrgestellnummer</div>
                  <div className="col-span-2">{formData.chassisNumber}</div>
                </div>

                <div className="grid grid-cols-3 p-3">
                  <div className="font-medium">Baujahr</div>
                  <div className="col-span-2">{formData.constructionYear}</div>
                </div>

                <div className="grid grid-cols-3 p-3">
                  <div className="font-medium">Installationsdatum</div>
                  <div className="col-span-2">{formData.installationDate}</div>
                </div>

                <div className="grid grid-cols-3 p-3">
                  <div className="font-medium">Demontagedatum</div>
                  <div className="col-span-2">{formData.removalDate}</div>
                </div>

                <div className="grid grid-cols-3 p-3">
                  <div className="font-medium">Kilometerstand während der Montage [km]</div>
                  <div className="col-span-2">{formData.mileageInstallation}</div>
                </div>

                <div className="grid grid-cols-3 p-3">
                  <div className="font-medium">Kilometerstand beim Abbau [km]</div>
                  <div className="col-span-2">{formData.mileageRemoval}</div>
                </div>

                <div className="grid grid-cols-3 p-3">
                  <div className="font-medium">Wer hat das Teil zusammengebaut</div>
                  <div className="col-span-2">{formData.assembledBy}</div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 flex items-start">
                <Info className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" />
                <p className="text-sm">
                  Bitte überprüfen Sie alle Angaben sorgfältig. Nach dem Absenden kann die Reklamation nicht mehr
                  bearbeitet werden.
                </p>
              </div>
            </motion.div>
          )}
        </CardContent>

        <CardFooter className="flex justify-between">
          {step > 1 && (
            <Button type="button" variant="outline" onClick={prevStep} disabled={isSubmitting}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Zurück
            </Button>
          )}

          {step < 6 ? (
            <Button type="button" onClick={nextStep} className="ml-auto">
              Weiter
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button type="button" onClick={handleSubmit} className="ml-auto" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                  Wird gesendet...
                </>
              ) : (
                <>
                  Reklamation absenden
                  <ChevronRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
