"use client"
import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface FormSuccessDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title?: string
  description?: string
  formType: "contact" | "motor"
}

export function FormSuccessDialog({
  open,
  onOpenChange,
  title = "Anfrage erfolgreich gesendet",
  description = "Vielen Dank für Ihre Anfrage. Wir werden uns in Kürze bei Ihnen melden.",
  formType,
}: FormSuccessDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-center justify-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              <CheckCircle className="h-6 w-6 text-green-500" />
            </motion.div>
            <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              {title}
            </motion.span>
          </DialogTitle>
          <DialogDescription className="text-center pt-2">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
              {description}
            </motion.div>
          </DialogDescription>
        </DialogHeader>
        <motion.div
          className="bg-green-50 border border-green-100 rounded-lg p-4 my-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <p className="text-sm text-green-800">
            {formType === "contact"
              ? "Wir haben Ihre Kontaktanfrage erhalten und werden uns schnellstmöglich mit Ihnen in Verbindung setzen."
              : "Wir haben Ihre Motorinstandsetzungsanfrage erhalten und werden uns schnellstmöglich mit Ihnen in Verbindung setzen, um die Details zu besprechen."}
          </p>
          <p className="text-sm text-green-800 mt-2">
            {formType === "contact"
              ? "Bei dringenden Anliegen können Sie uns auch telefonisch unter 01705345350 erreichen."
              : "Falls Sie weitere Fragen haben, können Sie uns jederzeit telefonisch unter 01705345350 erreichen."}
          </p>
        </motion.div>
        <DialogFooter className="sm:justify-center">
          <Button type="button" onClick={() => onOpenChange(false)} className="mt-2">
            Schließen
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
