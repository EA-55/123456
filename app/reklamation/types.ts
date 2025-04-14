export enum ComplaintStep {
  ReceiptInfo = 0,
  ItemSelection = 1,
  ComplaintDetails = 2,
  VehicleInfo = 3,
  LegalInfo = 4,
  Summary = 5,
}

export enum VehicleType {
  Car = "PKW",
  Truck = "LKW",
  Motorcycle = "Motorrad",
  Bus = "Bus",
  Tractor = "Traktor",
  Ship = "Schiff",
}

export interface ComplaintItem {
  manufacturer: string
  articleNumber: string
  name: string
  purchaseDate: string
  quantity: number
}

export interface ComplaintFormData {
  receiptNumber: string
  customerNumber: string
  customerName: string
  email: string
  phone: string
  items: ComplaintItem[]
  complaintDescription: string
  errorDate: string
  deliveryForm: string
  processingPreference: string
  additionalInfo: string
  additionalCosts: string
  vehicleType: VehicleType
  vehicleManufacturer: string
  vehicleModel: string
  vehicleYear: string
  vin: string
  installationDate: string
  removalDate: string
  mileageInstallation: string
  mileageRemoval: string
  installer: string
  termsAccepted: boolean
  attachments: string[]
}

export interface ComplaintData {
  id: string
  receipt_number: string
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
  complaint_items: ComplaintItem[]
  complaint_vehicle_data: {
    vehicle_type: string
    manufacturer: string
    model: string
    vehicle_type_detail: string
    year: string
    vin: string
    installation_date: string
    removal_date: string
    mileage_installation: number
    mileage_removal: number
    installer: string
  }
  complaint_attachments: {
    id: string
    file_name: string
    file_path: string
    file_type: string
    is_diagnostic: boolean
  }[]
}
