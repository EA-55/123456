import type { Metadata } from "next"
import ComplaintForm from "./complaint-form"

export const metadata: Metadata = {
  title: "Reklamation melden | ErsatzteilPartner24",
  description: "Melden Sie eine Reklamation für Ihre Ersatzteile bei ErsatzteilPartner24",
}

export default function ComplaintPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Eine Reklamation melden</h1>
      <ComplaintForm />
    </div>
  )
}
