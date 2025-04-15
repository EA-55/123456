export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      complaints: {
        Row: {
          id: string
          customer_number: string
          customer_name: string
          contact_email: string
          contact_phone: string | null
          receipt_number: string
          description: string
          error_date: string | null
          delivery_form: string | null
          preferred_handling: string | null
          additional_info: string | null
          additional_costs: boolean
          status: string
          created_at: string
          updated_at: string | null
          admin_notes: string | null
        }
        Insert: {
          id: string
          customer_number: string
          customer_name: string
          contact_email: string
          contact_phone?: string | null
          receipt_number: string
          description: string
          error_date?: string | null
          delivery_form?: string | null
          preferred_handling?: string | null
          additional_info?: string | null
          additional_costs: boolean
          status: string
          created_at?: string
          updated_at?: string | null
          admin_notes?: string | null
        }
        Update: {
          id?: string
          customer_number?: string
          customer_name?: string
          contact_email?: string
          contact_phone?: string | null
          receipt_number?: string
          description?: string
          error_date?: string | null
          delivery_form?: string | null
          preferred_handling?: string | null
          additional_info?: string | null
          additional_costs?: boolean
          status?: string
          created_at?: string
          updated_at?: string | null
          admin_notes?: string | null
        }
      }
      complaint_items: {
        Row: {
          id: string
          complaint_id: string
          article_name: string
          article_index: string | null
          manufacturer: string | null
          purchase_date: string | null
          quantity: number
          created_at: string
        }
        Insert: {
          id?: string
          complaint_id: string
          article_name: string
          article_index?: string | null
          manufacturer?: string | null
          purchase_date?: string | null
          quantity: number
          created_at?: string
        }
        Update: {
          id?: string
          complaint_id?: string
          article_name?: string
          article_index?: string | null
          manufacturer?: string | null
          purchase_date?: string | null
          quantity?: number
          created_at?: string
        }
      }
      complaint_vehicle_data: {
        Row: {
          id: string
          complaint_id: string
          manufacturer: string | null
          model: string | null
          vehicle_type: string | null
          vehicle_type_detail: string | null
          year: string | null
          vin: string | null
          installation_date: string | null
          removal_date: string | null
          mileage_installation: number | null
          mileage_removal: number | null
          installer: string | null
          created_at: string
        }
        Insert: {
          id?: string
          complaint_id: string
          manufacturer?: string | null
          model?: string | null
          vehicle_type?: string | null
          vehicle_type_detail?: string | null
          year?: string | null
          vin?: string | null
          installation_date?: string | null
          removal_date?: string | null
          mileage_installation?: number | null
          mileage_removal?: number | null
          installer?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          complaint_id?: string
          manufacturer?: string | null
          model?: string | null
          vehicle_type?: string | null
          vehicle_type_detail?: string | null
          year?: string | null
          vin?: string | null
          installation_date?: string | null
          removal_date?: string | null
          mileage_installation?: number | null
          mileage_removal?: number | null
          installer?: string | null
          created_at?: string
        }
      }
      complaint_attachments: {
        Row: {
          id: string
          complaint_id: string
          file_name: string
          file_type: string
          file_path: string
          is_diagnostic: boolean
          created_at: string
        }
        Insert: {
          id?: string
          complaint_id: string
          file_name: string
          file_type: string
          file_path: string
          is_diagnostic: boolean
          created_at?: string
        }
        Update: {
          id?: string
          complaint_id?: string
          file_name?: string
          file_type?: string
          file_path?: string
          is_diagnostic?: boolean
          created_at?: string
        }
      }
      // Weitere Tabellen hier hinzufügen...
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
