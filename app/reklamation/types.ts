export interface CustomerData {
  customerNumber: string
  customerName: string
  email: string
  phone?: string
}

export interface ComplaintItem {
  manufacturer: string
  articleIndex: string
  articleName: string
  purchaseDate: string
  quantity: number
}

export interface VehicleData {
  vehicleType: string
  manufacturer: string
  model: string
  vehicleTypeDetail?: string
  year: string
  vin: string
  installationDate?: string
  removalDate?: string
  mileageInstallation?: number
  mileageRemoval?: number
  installer?: string
}

export interface ComplaintAttachment {
  fileName: string
  filePath: string
  fileType: string
  isDiagnostic: boolean
}

export interface ComplaintFormData {
  customerData: CustomerData
  receiptNumber: string
  items: ComplaintItem[]
  description: string
  errorDate: string
  deliveryForm: string
  preferredProcessing: string
  additionalInfo?: string
  additionalCosts: boolean
  hasAttachments: boolean
  hasDiagnosticOutput: boolean
  attachments: ComplaintAttachment[]
  vehicleData?: VehicleData
}
