"use client"

import React from "react"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { type ComplaintFormData, ComplaintStep, VehicleType } from "./types"

export default function ComplaintForm() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState<ComplaintStep>(ComplaintStep.ReceiptInfo)
  const [formData, setFormData] = useState<ComplaintFormData>({
    receiptNumber: "",
    customerNumber: "",
    customerName: "",
    email: "",
    phone: "",
    items: [{ manufacturer: "", articleNumber: "", name: "", purchaseDate: "", quantity: 1 }],
    complaintDescription: "",
    errorDate: "",
    deliveryForm: "",
    processingPreference: "",
    additionalInfo: "",
    additionalCosts: "Nein",
    vehicleType: VehicleType.Car,
    vehicleManufacturer: "",
    vehicleModel: "",
    vehicleYear: "",
    vin: "",
    installationDate: "",
    removalDate: "",
    mileageInstallation: "",
    mileageRemoval: "",
    installer: "Benutzer",
    termsAccepted: false,
    attachments: [],
  })
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleItemChange = (index: number, field: string, value: string | number) => {
    const updatedItems = [...formData.items]
    updatedItems[index] = { ...updatedItems[index], [field]: value }
    setFormData((prev) => ({ ...prev, items: updatedItems }))
  }

  const addItem = () => {
    setFormData((prev) => ({
      ...prev,
      items: [...prev.items, { manufacturer: "", articleNumber: "", name: "", purchaseDate: "", quantity: 1 }],
    }))
  }

  const removeItem = (index: number) => {
    if (formData.items.length > 1) {
      const updatedItems = formData.items.filter((_, i) => i !== index)
      setFormData((prev) => ({ ...prev, items: updatedItems }))
    }
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleVehicleTypeChange = (type: VehicleType) => {
    setFormData((prev) => ({ ...prev, vehicleType: type }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // In a real implementation, you would handle file uploads here
      // For now, we'll just store the file names
      const newFiles = Array.from(e.target.files).map((file) => file.name)
      setFormData((prev) => ({
        ...prev,
        attachments: [...prev.attachments, ...newFiles],
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch("/api/complaints", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const data = await response.json()
        router.push(`/reklamation/bestaetigung?id=${data.id}`)
      } else {
        console.error("Failed to submit complaint")
        // Handle error
      }
    } catch (error) {
      console.error("Error submitting complaint:", error)
      // Handle error
    }
  }

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1)
    window.scrollTo(0, 0)
  }

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1)
    window.scrollTo(0, 0)
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return ""

    try {
      const date = new Date(dateString)
      return date.toLocaleDateString("de-DE")
    } catch (error) {
      return dateString
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Eine Reklamation melden</h1>

      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex justify-between">
          {Object.values(ComplaintStep)
            .filter((v) => typeof v === "number")
            .map((step) => (
              <div
                key={step}
                className={`flex flex-col items-center ${Number(step) <= currentStep ? "text-primary" : "text-gray-400"}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${Number(step) <= currentStep ? "bg-primary text-white" : "bg-gray-200"}`}
                >
                  {Number(step) + 1}
                </div>
                <span className="text-xs hidden sm:block">
                  {step === ComplaintStep.ReceiptInfo && "Beleg & Kunde"}
                  {step === ComplaintStep.ItemSelection && "Artikel"}
                  {step === ComplaintStep.ComplaintDetails && "Beschreibung"}
                  {step === ComplaintStep.VehicleInfo && "Fahrzeugdaten"}
                  {step === ComplaintStep.LegalInfo && "Rechtliches"}
                  {step === ComplaintStep.Summary && "Zusammenfassung"}
                </span>
              </div>
            ))}
        </div>
        <div className="w-full h-2 bg-gray-200 mt-4 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${(((currentStep + 1) / Object.keys(ComplaintStep).length) * 100) / 2}%` }}
          ></div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Step 1: Receipt and Customer Information */}
        {currentStep === ComplaintStep.ReceiptInfo && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Beleg- und Kundendaten</h2>

            <div className="form-group">
              <label className="block mb-1 font-medium">
                <span className="text-red-500">*</span> Kaufbelegnummer
              </label>
              <input
                type="text"
                name="receiptNumber"
                value={formData.receiptNumber}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                placeholder="z. B. 1234/LOK/17/R"
                required
              />
              <p className="text-sm text-gray-500 mt-1">Geben Sie die vollständige Nummer des Kaufbelegs ein</p>
            </div>

            <div className="form-group">
              <label className="block mb-1 font-medium">
                <span className="text-red-500">*</span> Kundennummer
              </label>
              <input
                type="text"
                name="customerNumber"
                value={formData.customerNumber}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div className="form-group">
              <label className="block mb-1 font-medium">
                <span className="text-red-500">*</span> Name
              </label>
              <input
                type="text"
                name="customerName"
                value={formData.customerName}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div className="form-group">
              <label className="block mb-1 font-medium">
                <span className="text-red-500">*</span> E-Mail
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div className="form-group">
              <label className="block mb-1 font-medium">Telefon</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>

            <div className="flex justify-between mt-8">
              <button type="button" className="px-4 py-2 bg-gray-200 rounded" onClick={() => router.push("/")}>
                Abbrechen
              </button>
              <button type="button" className="px-4 py-2 bg-primary text-white rounded" onClick={nextStep}>
                Weiter
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Item Selection */}
        {currentStep === ComplaintStep.ItemSelection && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Artikel auswählen</h2>

            {formData.items.map((item, index) => (
              <div key={index} className="p-4 border rounded mb-4">
                <div className="flex justify-between mb-2">
                  <h3 className="font-medium">Artikel {index + 1}</h3>
                  {formData.items.length > 1 && (
                    <button type="button" onClick={() => removeItem(index)} className="text-red-500">
                      Entfernen
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="block mb-1 font-medium">
                      <span className="text-red-500">*</span> Hersteller
                    </label>
                    <input
                      type="text"
                      value={item.manufacturer}
                      onChange={(e) => handleItemChange(index, "manufacturer", e.target.value)}
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="block mb-1 font-medium">
                      <span className="text-red-500">*</span> Index der gekauften Waren
                    </label>
                    <input
                      type="text"
                      value={item.articleNumber}
                      onChange={(e) => handleItemChange(index, "articleNumber", e.target.value)}
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>

                  <div className="form-group md:col-span-2">
                    <label className="block mb-1 font-medium">
                      <span className="text-red-500">*</span> Name
                    </label>
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) => handleItemChange(index, "name", e.target.value)}
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="block mb-1 font-medium">
                      <span className="text-red-500">*</span> Kaufdatum
                    </label>
                    <input
                      type="date"
                      value={item.purchaseDate}
                      onChange={(e) => handleItemChange(index, "purchaseDate", e.target.value)}
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="block mb-1 font-medium">
                      <span className="text-red-500">*</span> Anzahl / Menge
                    </label>
                    <select
                      value={item.quantity}
                      onChange={(e) => handleItemChange(index, "quantity", Number.parseInt(e.target.value))}
                      className="w-full p-2 border rounded"
                      required
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                        <option key={num} value={num}>
                          {num}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            ))}

            <button type="button" onClick={addItem} className="px-4 py-2 bg-gray-200 rounded w-full">
              + Weiteren Artikel hinzufügen
            </button>

            <div className="flex justify-between mt-8">
              <button type="button" className="px-4 py-2 bg-gray-200 rounded" onClick={prevStep}>
                Zurück
              </button>
              <button type="button" className="px-4 py-2 bg-primary text-white rounded" onClick={nextStep}>
                Weiter
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Complaint Details */}
        {currentStep === ComplaintStep.ComplaintDetails && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Beschreibung der Reklamation</h2>

            <div className="form-group">
              <label className="block mb-1 font-medium">
                <span className="text-red-500">*</span> Beschreibung der Reklamation
              </label>
              <textarea
                name="complaintDescription"
                value={formData.complaintDescription}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                rows={5}
                required
              ></textarea>
              <div className="text-right text-sm text-gray-500">0/200</div>
            </div>

            <div className="form-group">
              <label className="block mb-1 font-medium">
                <span className="text-red-500">*</span> Datum der Fehlerfeststellung
              </label>
              <input
                type="date"
                name="errorDate"
                value={formData.errorDate}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div className="form-group">
              <label className="block mb-1 font-medium">
                <span className="text-red-500">*</span> Reklamation Lieferformular
              </label>
              <select
                name="deliveryForm"
                value={formData.deliveryForm}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              >
                <option value="">Wählen</option>
                <option value="Persönlich">Persönlich</option>
                <option value="Per Post">Per Post</option>
                <option value="Per E-Mail">Per E-Mail</option>
              </select>
            </div>

            <div className="form-group">
              <label className="block mb-1 font-medium">
                <span className="text-red-500">*</span> Die bevorzugte Art der Bearbeitung von Reklamationn
              </label>
              <select
                name="processingPreference"
                value={formData.processingPreference}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              >
                <option value="">Wählen</option>
                <option value="Reparatur">Reparatur</option>
                <option value="Austausch">Austausch</option>
                <option value="Rückerstattung">Rückerstattung</option>
                <option value="Bargeldückgabe">Bargeldückgabe</option>
              </select>
            </div>

            <div className="form-group">
              <label className="block mb-1 font-medium">Zusätzliche Informationen</label>
              <textarea
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                rows={3}
              ></textarea>
              <div className="text-right text-sm text-gray-500">0/200</div>
            </div>

            <div className="form-group">
              <label className="block mb-1 font-medium">Zusätzliche kosten</label>
              <select
                name="additionalCosts"
                value={formData.additionalCosts}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              >
                <option value="Nein">Nein</option>
                <option value="Ja">Ja</option>
              </select>
            </div>

            <div className="form-group">
              <label className="block mb-1 font-medium">Anhänge</label>
              <div className="flex items-center space-x-2">
                <select className="w-full p-2 border rounded" onChange={() => fileInputRef.current?.click()}>
                  <option value="Ja">Ja</option>
                  <option value="Nein">Nein</option>
                </select>
                <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" multiple />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-2 bg-blue-900 text-white rounded"
                >
                  + Neuer Anhang
                </button>
              </div>
              {formData.attachments.length > 0 && (
                <div className="mt-2">
                  <h4 className="font-medium">Anhänge</h4>
                  <ul className="list-disc pl-5">
                    {formData.attachments.map((file, index) => (
                      <li key={index}>{file}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="flex justify-between mt-8">
              <button type="button" className="px-4 py-2 bg-gray-200 rounded" onClick={prevStep}>
                Zurück
              </button>
              <button type="button" className="px-4 py-2 bg-primary text-white rounded" onClick={nextStep}>
                Weiter
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Vehicle Information */}
        {currentStep === ComplaintStep.VehicleInfo && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Fahrzeugdaten</h2>

            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-4">
              <button
                type="button"
                className={`p-2 border rounded flex flex-col items-center ${formData.vehicleType === VehicleType.Car ? "border-primary bg-blue-50" : ""}`}
                onClick={() => handleVehicleTypeChange(VehicleType.Car)}
              >
                <div className="w-12 h-12 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-8 h-8"
                  >
                    <path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                    <path d="M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                    <path d="M5 9l2 -4h8l2 4"></path>
                    <path d="M5 9h12v5h-3"></path>
                  </svg>
                </div>
                <span className="text-xs mt-1">PKW</span>
              </button>

              <button
                type="button"
                className={`p-2 border rounded flex flex-col items-center ${formData.vehicleType === VehicleType.Truck ? "border-primary bg-blue-50" : ""}`}
                onClick={() => handleVehicleTypeChange(VehicleType.Truck)}
              >
                <div className="w-12 h-12 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-8 h-8"
                  >
                    <path d="M4 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                    <path d="M13 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                    <path d="M18 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                    <path d="M4 17h-2v-11a1 1 0 0 1 1 -1h14a5 7 0 0 1 5 7v5h-2m-10 0h-4"></path>
                  </svg>
                </div>
                <span className="text-xs mt-1">LKW</span>
              </button>

              <button
                type="button"
                className={`p-2 border rounded flex flex-col items-center ${formData.vehicleType === VehicleType.Motorcycle ? "border-primary bg-blue-50" : ""}`}
                onClick={() => handleVehicleTypeChange(VehicleType.Motorcycle)}
              >
                <div className="w-12 h-12 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-8 h-8"
                  >
                    <path d="M5 16m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
                    <path d="M19 16m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
                    <path d="M7.5 14l5 -5"></path>
                    <path d="M16 9l-3 3"></path>
                    <path d="M7 9l2.5 5"></path>
                    <path d="M13 5h4l2 4"></path>
                  </svg>
                </div>
                <span className="text-xs mt-1">Motorrad</span>
              </button>

              <button
                type="button"
                className={`p-2 border rounded flex flex-col items-center ${formData.vehicleType === VehicleType.Bus ? "border-primary bg-blue-50" : ""}`}
                onClick={() => handleVehicleTypeChange(VehicleType.Bus)}
              >
                <div className="w-12 h-12 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-8 h-8"
                  >
                    <path d="M6 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                    <path d="M18 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                    <path d="M4 17h-2v-11a1 1 0 0 1 1 -1h14a5 7 0 0 1 5 7v5h-2m-10 0h-4"></path>
                    <path d="M16 5l1.5 7l4.5 0"></path>
                    <path d="M2 10l15 0"></path>
                    <path d="M7 5l0 5"></path>
                    <path d="M12 5l0 5"></path>
                  </svg>
                </div>
                <span className="text-xs mt-1">Bus</span>
              </button>

              <button
                type="button"
                className={`p-2 border rounded flex flex-col items-center ${formData.vehicleType === VehicleType.Tractor ? "border-primary bg-blue-50" : ""}`}
                onClick={() => handleVehicleTypeChange(VehicleType.Tractor)}
              >
                <div className="w-12 h-12 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-8 h-8"
                  >
                    <path d="M7 15m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"></path>
                    <path d="M7 15l0 .01"></path>
                    <path d="M19 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                    <path d="M10.5 17l6.5 0"></path>
                    <path d="M20 8v7"></path>
                    <path d="M15 4v12"></path>
                    <path d="M13 4l-3 12"></path>
                    <path d="M4 8l9 -4"></path>
                  </svg>
                </div>
                <span className="text-xs mt-1">Traktor</span>
              </button>

              <button
                type="button"
                className={`p-2 border rounded flex flex-col items-center ${formData.vehicleType === VehicleType.Ship ? "border-primary bg-blue-50" : ""}`}
                onClick={() => handleVehicleTypeChange(VehicleType.Ship)}
              >
                <div className="w-12 h-12 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-8 h-8"
                  >
                    <path d="M2 20a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2 -1a2.4 2.4 0 0 1 2 -1a2.4 2.4 0 0 1 2 1a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2 -1"></path>
                    <path d="M4 18l-1 -5h18l-2 5"></path>
                    <path d="M5 13v-6h8l4 6"></path>
                    <path d="M7 7v-4h5l3 4"></path>
                  </svg>
                </div>
                <span className="text-xs mt-1">Schiff</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-group">
                <label className="block mb-1 font-medium">
                  <span className="text-red-500">*</span> Fahrzeug Hersteller
                </label>
                <input
                  type="text"
                  name="vehicleManufacturer"
                  value={formData.vehicleManufacturer}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              <div className="form-group">
                <label className="block mb-1 font-medium">
                  <span className="text-red-500">*</span> Fahrzeug Modell
                </label>
                <input
                  type="text"
                  name="vehicleModel"
                  value={formData.vehicleModel}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              <div className="form-group">
                <label className="block mb-1 font-medium">
                  <span className="text-red-500">*</span> Baujahr
                </label>
                <input
                  type="text"
                  name="vehicleYear"
                  value={formData.vehicleYear}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              <div className="form-group">
                <label className="block mb-1 font-medium">
                  <span className="text-red-500">*</span> Fahrgestellnummer
                </label>
                <input
                  type="text"
                  name="vin"
                  value={formData.vin}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              <div className="form-group">
                <label className="block mb-1 font-medium">
                  <span className="text-red-500">*</span> Installationsdatum
                </label>
                <input
                  type="date"
                  name="installationDate"
                  value={formData.installationDate}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              <div className="form-group">
                <label className="block mb-1 font-medium">
                  <span className="text-red-500">*</span> Demontagedatum
                </label>
                <input
                  type="date"
                  name="removalDate"
                  value={formData.removalDate}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              <div className="form-group">
                <label className="block mb-1 font-medium">
                  <span className="text-red-500">*</span> Kilometerstand während der Montage [km]
                </label>
                <input
                  type="number"
                  name="mileageInstallation"
                  value={formData.mileageInstallation}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              <div className="form-group">
                <label className="block mb-1 font-medium">
                  <span className="text-red-500">*</span> Kilometerstand beim Abbau [km]
                </label>
                <input
                  type="number"
                  name="mileageRemoval"
                  value={formData.mileageRemoval}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              <div className="form-group md:col-span-2">
                <label className="block mb-1 font-medium">
                  <span className="text-red-500">*</span> Wer hat das Teil zusammengebaut
                </label>
                <select
                  name="installer"
                  value={formData.installer}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                >
                  <option value="Benutzer">Benutzer</option>
                  <option value="Werkstatt">Werkstatt</option>
                  <option value="Andere">Andere</option>
                </select>
              </div>
            </div>

            <div className="flex justify-between mt-8">
              <button type="button" className="px-4 py-2 bg-gray-200 rounded" onClick={prevStep}>
                Zurück
              </button>
              <button type="button" className="px-4 py-2 bg-primary text-white rounded" onClick={nextStep}>
                Weiter
              </button>
            </div>
          </div>
        )}

        {/* Step 5: Legal Information */}
        {currentStep === ComplaintStep.LegalInfo && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Rechtliche Informationen</h2>

            <div className="p-4 border rounded bg-gray-50 max-h-96 overflow-y-auto text-sm">
              <div className="space-y-4">
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="terms"
                    name="termsAccepted"
                    checked={formData.termsAccepted}
                    onChange={handleCheckboxChange}
                    className="mt-1 mr-2"
                    required
                  />
                  <div>
                    <ol className="list-decimal pl-5 space-y-2">
                      <li>
                        Ich erkläre, dass ich berechtigt bin, diese Reklamation und alle darin enthaltenen Angaben
                        einzureichen. Ich bestätige die Richtigkeit der von mir in dieser Reklamation angegebenen Daten.
                      </li>
                      <li>
                        Ich akzeptiere, dass die Bearbeitungszeit für Reklamationen ab dem Datum der Einreichung der
                        Reklamation auf 90 Kalendertage verlängert werden kann.
                      </li>
                      <li>
                        Inter Cars S.A. weist darauf hin, dass in einigen Fällen zur Beurteilung der Reklamation einer
                        Reklamation einer Reklamation und zur Feststellung der Mängel der Waren und ihrer Ursachen,
                        möglicherweise eine Prüfung durchgeführt werden muss, die das reklamierte Produkt beschädigen
                        und in einigen Fällen sogar zerstören kann ("zerstörende Prüfung"). Die Durchführung einer
                        zerstörenden Prüfung kann die weitere Prüfung der Waren verhindern oder sogar verhindern. In
                        Kenntnis der oben genannten Umstände bin ich damit einverstanden, die zerstörenden Untersuchung
                        des reklamierten Produkts durchzuführen, wenn dies erforderlich ist.
                      </li>
                      <li>
                        Hiermit ermächtige ich Inter Cars S.A. für die Zerstörung von Waren nach der Reklamation (d. h.
                        reparierte Waren, ersetzte Waren oder Waren in dem Zustand, in dem sie sich befinden, wenn die
                        Reklamation nicht angenommen wird) ("Waren"), wenn (i) ich die Waren nach Prüfung durch Inter
                        Cars S.A. meiner Reklamation (d. h. ich werde die Waren nicht abholen oder ich werde die Ware
                        nicht auf andere Weise abholen / geliefert habe, wenn ich über die Möglichkeit der Entfernung /
                        Lieferung der Ware nach Prüfung durch Inter Cars S.A. meiner Reklamation informiert / informiert
                        habe, gleichgültig) ist auch die zusätzliche 30-Tage-Frist für mich ab von Inter Cars S.A. das
                        Gut sammeln. Um Zweifel auszuschließen, eine zusätzliche Anfrage zur Abholung der Ware gemäß der
                        von mir im Reklamationsformular ausgewählten Kontaktmethode gesendet wird.
                      </li>
                    </ol>
                    <p className="mt-4 font-semibold">Persönliche Daten</p>
                    <p className="mt-2">
                      Der Administrator Ihrer personenbezogenen Daten ist Inter Cars S.A. mit Sitz in Warschau,
                      Powsińska 64, 02-903 Warszawa, Tel. 801 80 20 20, sekretariat@intercars.eu. Der Administrator hat
                      einen Datenschutzbeauftragten ernannt, der unter iod@intercars.eu kontaktiert werden kann. Die
                      Angabe von Daten ist freiwillig und die Voraussetzung für die Bearbeitung der Reklamation.
                      Andernfalls wird deren Prüfung verhindert. Die Daten werden zum Zwecke der Prüfung der Reklamation
                      (Rechtsgrundlage: zur Vertragserfüllung erforderliche Verarbeitung) und zur Feststellung und
                      Verfolgung möglicher Ansprüche (Rechtsgrundlage: berechtigtes Interesse des Administrators)
                      verarbeitet. Gegebenenfalls können Empfänger der Daten Hersteller der reklamierten Waren sein. Die
                      Daten werden für einen Zeitraum von 2 Jahren ab dem Datum der Prüfung der Reklamation, der
                      Beilegung möglicher Ansprüche und nach geltendem Recht (z. B. Rechnungslegungsvorschriften)
                      gespeichert.
                    </p>
                    <p className="mt-2">Jeder hat das Recht:</p>
                    <ol className="list-decimal pl-5 space-y-1 mt-1">
                      <li>
                        den Zugriff auf seine persönlichen Daten, die Berichtigung, Löschung,
                        Verarbeitungsbeschränkungen und deren Übertragung anzufordern;
                      </li>
                      <li>
                        Einspruch gegen die Datenverarbeitung, Einreichung einer Beschwerde bei der Aufsichtsbehörde und
                        jederzeitiger Widerruf der Einwilligung ohne die Rechtmäßigkeit der Verarbeitung aufgrund der
                        Einwilligung vor deren Rücknahme zu beeinträchtigen;
                      </li>
                      <li>
                        Einspruch gegen die Verarbeitung seiner personenbezogenen Daten auf der Grundlage eines
                        legitimen Verfahrens des Interesse des Administrators sowie den Widerspruch gegen die
                        Verarbeitung seiner personenbezogenen Daten zu Marketingzwecken.
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-8">
              <button type="button" className="px-4 py-2 bg-gray-200 rounded" onClick={prevStep}>
                Zurück
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-primary text-white rounded"
                onClick={nextStep}
                disabled={!formData.termsAccepted}
              >
                Weiter
              </button>
            </div>
          </div>
        )}

        {/* Step 6: Summary */}
        {currentStep === ComplaintStep.Summary && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Zusammenfassung</h2>

            <div className="border rounded overflow-hidden">
              <table className="w-full">
                <tbody>
                  <tr className="border-b">
                    <th className="p-2 text-left bg-gray-50">Belegnummer</th>
                    <td className="p-2">{formData.receiptNumber}</td>
                  </tr>
                  <tr className="border-b">
                    <th className="p-2 text-left bg-gray-50">Kundennummer</th>
                    <td className="p-2">{formData.customerNumber}</td>
                  </tr>
                  <tr className="border-b">
                    <th className="p-2 text-left bg-gray-50">Name</th>
                    <td className="p-2">{formData.customerName}</td>
                  </tr>
                  <tr className="border-b">
                    <th className="p-2 text-left bg-gray-50">E-Mail</th>
                    <td className="p-2">{formData.email}</td>
                  </tr>
                  <tr className="border-b">
                    <th className="p-2 text-left bg-gray-50">Telefon</th>
                    <td className="p-2">{formData.phone || "-"}</td>
                  </tr>

                  {formData.items.map((item, index) => (
                    <React.Fragment key={index}>
                      <tr className="border-b bg-gray-100">
                        <th className="p-2 text-left" colSpan={2}>
                          Artikel {index + 1}
                        </th>
                      </tr>
                      <tr className="border-b">
                        <th className="p-2 text-left bg-gray-50">Hersteller</th>
                        <td className="p-2">{item.manufacturer}</td>
                      </tr>
                      <tr className="border-b">
                        <th className="p-2 text-left bg-gray-50">Index der gekauften Waren</th>
                        <td className="p-2">{item.articleNumber}</td>
                      </tr>
                      <tr className="border-b">
                        <th className="p-2 text-left bg-gray-50">Name</th>
                        <td className="p-2">{item.name}</td>
                      </tr>
                      <tr className="border-b">
                        <th className="p-2 text-left bg-gray-50">Anzahl / Menge</th>
                        <td className="p-2">{item.quantity}</td>
                      </tr>
                      <tr className="border-b">
                        <th className="p-2 text-left bg-gray-50">Kaufdatum</th>
                        <td className="p-2">{formatDate(item.purchaseDate)}</td>
                      </tr>
                    </React.Fragment>
                  ))}

                  <tr className="border-b">
                    <th className="p-2 text-left bg-gray-50">Beschreibung der Reklamation</th>
                    <td className="p-2">{formData.complaintDescription}</td>
                  </tr>
                  <tr className="border-b">
                    <th className="p-2 text-left bg-gray-50">Reklamation Lieferformular</th>
                    <td className="p-2">{formData.deliveryForm}</td>
                  </tr>
                  <tr className="border-b">
                    <th className="p-2 text-left bg-gray-50">Die bevorzugte Art der Bearbeitung von Reklamationn</th>
                    <td className="p-2">{formData.processingPreference}</td>
                  </tr>
                  <tr className="border-b">
                    <th className="p-2 text-left bg-gray-50">Zusätzliche kosten</th>
                    <td className="p-2">{formData.additionalCosts}</td>
                  </tr>

                  <tr className="border-b bg-gray-100">
                    <th className="p-2 text-left" colSpan={2}>
                      Fahrzeugdaten
                    </th>
                  </tr>
                  <tr className="border-b">
                    <th className="p-2 text-left bg-gray-50">Fahrzeug</th>
                    <td className="p-2">{formData.vehicleType}</td>
                  </tr>
                  <tr className="border-b">
                    <th className="p-2 text-left bg-gray-50">Fahrzeug Hersteller</th>
                    <td className="p-2">{formData.vehicleManufacturer}</td>
                  </tr>
                  <tr className="border-b">
                    <th className="p-2 text-left bg-gray-50">Fahrzeug Modell</th>
                    <td className="p-2">{formData.vehicleModel}</td>
                  </tr>
                  <tr className="border-b">
                    <th className="p-2 text-left bg-gray-50">Baujahr</th>
                    <td className="p-2">{formData.vehicleYear}</td>
                  </tr>
                  <tr className="border-b">
                    <th className="p-2 text-left bg-gray-50">Fahrgestellnummer</th>
                    <td className="p-2">{formData.vin}</td>
                  </tr>
                  <tr className="border-b">
                    <th className="p-2 text-left bg-gray-50">Installationsdatum</th>
                    <td className="p-2">{formatDate(formData.installationDate)}</td>
                  </tr>
                  <tr className="border-b">
                    <th className="p-2 text-left bg-gray-50">Demontagedatum</th>
                    <td className="p-2">{formatDate(formData.removalDate)}</td>
                  </tr>
                  <tr className="border-b">
                    <th className="p-2 text-left bg-gray-50">Kilometerstand während der Montage [km]</th>
                    <td className="p-2">{formData.mileageInstallation}</td>
                  </tr>
                  <tr className="border-b">
                    <th className="p-2 text-left bg-gray-50">Kilometerstand beim Abbau [km]</th>
                    <td className="p-2">{formData.mileageRemoval}</td>
                  </tr>
                  <tr className="border-b">
                    <th className="p-2 text-left bg-gray-50">Wer hat das Teil zusammengebaut</th>
                    <td className="p-2">{formData.installer}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex justify-between mt-8">
              <button type="button" className="px-4 py-2 bg-gray-200 rounded" onClick={prevStep}>
                Zurück
              </button>
              <button type="submit" className="px-4 py-2 bg-primary text-white rounded">
                Schließ eine Zugabe der Reklamation
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  )
}
