"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { FormSuccessDialog } from "@/components/form-success-dialog"

const formSchema = z.object({
  companyName: z.string().min(2, { message: "Firmenname muss mindestens 2 Zeichen lang sein." }),
  contactPerson: z.string().min(2, { message: "Name muss mindestens 2 Zeichen lang sein." }),
  email: z.string().email({ message: "Bitte geben Sie eine gültige E-Mail-Adresse ein." }),
  phone: z.string().min(5, { message: "Telefonnummer muss mindestens 5 Zeichen lang sein." }),
  address: z.string().min(5, { message: "Adresse muss mindestens 5 Zeichen lang sein." }),
  businessType: z.string().min(1, { message: "Bitte wählen Sie eine Geschäftsart aus." }),
  message: z.string().optional(),
})

export default function B2BRegistrierungPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      contactPerson: "",
      email: "",
      phone: "",
      address: "",
      businessType: "",
      message: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    try {
      const response = await fetch("/api/b2b-registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Ein Fehler ist aufgetreten")
      }

      // Speichern der B2B-Registrierung im localStorage für den Admin-Bereich
      if (data.registration) {
        const existingRegistrations = JSON.parse(localStorage.getItem("b2bRegistrations") || "[]")
        existingRegistrations.push(data.registration)
        localStorage.setItem("b2bRegistrations", JSON.stringify(existingRegistrations))
      }

      form.reset()
      setShowSuccessDialog(true)
    } catch (error) {
      console.error("Fehler beim Senden des Formulars:", error)
      toast({
        variant: "destructive",
        title: "Fehler",
        description: error instanceof Error ? error.message : "Ein unbekannter Fehler ist aufgetreten",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6">B2B Shop Registrierung</h1>
      <p className="text-lg mb-8">
        Registrieren Sie sich für unseren B2B-Shop und profitieren Sie von exklusiven Konditionen und einem
        umfangreichen Sortiment an Qualitäts-Ersatzteilen.
      </p>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Firmenname</FormLabel>
                  <FormControl>
                    <Input placeholder="Name Ihres Unternehmens" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="contactPerson"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ansprechpartner</FormLabel>
                    <FormControl>
                      <Input placeholder="Vor- und Nachname" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-Mail</FormLabel>
                    <FormControl>
                      <Input placeholder="ihre-email@beispiel.de" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefon</FormLabel>
                    <FormControl>
                      <Input placeholder="Ihre Telefonnummer" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="businessType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Art des Geschäfts</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Wählen Sie eine Option" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Werkstatt">Werkstatt</SelectItem>
                        <SelectItem value="Händler">Händler</SelectItem>
                        <SelectItem value="Flottenbetreiber">Flottenbetreiber</SelectItem>
                        <SelectItem value="Sonstiges">Sonstiges</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Adresse</FormLabel>
                  <FormControl>
                    <Input placeholder="Straße, Hausnummer, PLZ, Ort" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nachricht (optional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Weitere Informationen oder Fragen" className="min-h-[120px]" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Wird gesendet..." : "Registrierung absenden"}
            </Button>
          </form>
        </Form>
      </div>

      <FormSuccessDialog
        open={showSuccessDialog}
        onOpenChange={setShowSuccessDialog}
        title="Registrierung erfolgreich"
        description="Vielen Dank für Ihre Registrierung. Wir werden Ihre Anfrage prüfen und uns in Kürze bei Ihnen melden."
      />
    </div>
  )
}
