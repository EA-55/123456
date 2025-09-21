"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { FormSuccessDialog } from "@/components/form-success-dialog"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"

const formSchema = z.object({
  customerNumber: z.string().min(1, { message: "Kundennummer ist erforderlich" }),
  customerName: z.string().min(2, { message: "Name muss mindestens 2 Zeichen lang sein" }),
  orderNumber: z.string().min(1, { message: "Bestellnummer ist erforderlich" }),
  productName: z.string().min(2, { message: "Produktname ist erforderlich" }),
  returnReasonType: z.enum(["customer_withdrawal", "deposit", "damaged", "wrong_order", "other"], {
    required_error: "Bitte wählen Sie einen Grund für die Rückgabe",
  }),
  returnReasonText: z.string().optional(),
  packageCondition: z.enum(["original", "damaged", "opened", "missing"], {
    required_error: "Bitte wählen Sie den Zustand der Verpackung",
  }),
  productCondition: z.enum(["new", "used", "damaged", "defective"], {
    required_error: "Bitte wählen Sie den Zustand des Produkts",
  }),
  contactEmail: z.string().email({ message: "Bitte geben Sie eine gültige E-Mail-Adresse ein" }),
  contactPhone: z.string().min(5, { message: "Telefonnummer muss mindestens 5 Zeichen lang sein" }),
  additionalInfo: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

export default function ReturnFormPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const { toast } = useToast()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerNumber: "",
      customerName: "",
      orderNumber: "",
      productName: "",
      returnReasonType: undefined,
      returnReasonText: "",
      packageCondition: undefined,
      productCondition: undefined,
      contactEmail: "",
      contactPhone: "",
      additionalInfo: "",
    },
  })

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true)
    try {
      // Bereite die Daten für die API vor
      const submitData = {
        ...values,
        // Kombiniere den Rückgabegrund basierend auf der Auswahl
        reason:
          values.returnReasonType === "other"
            ? values.returnReasonText
            : values.returnReasonType === "customer_withdrawal"
              ? "Kunden Rücktritt"
              : values.returnReasonType === "deposit"
                ? "Altteilpfand"
                : values.returnReasonType === "damaged"
                  ? "Ware ist beschädigt"
                  : "Falsch bestellt",
      }

      const response = await fetch("/api/returns", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Ein Fehler ist aufgetreten")
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
      <div className="mb-6">
        <Link href="/">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft size={16} />
            Zurück zur Startseite
          </Button>
        </Link>
      </div>

      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Rückgabe anmelden</CardTitle>
          <CardDescription>
            Bitte füllen Sie das Formular aus, um eine Rückgabe anzumelden. Wir werden Ihre Anfrage so schnell wie
            möglich bearbeiten.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="customerNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kundennummer</FormLabel>
                      <FormControl>
                        <Input placeholder="Ihre Kundennummer" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="customerName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Ihr vollständiger Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="orderNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bestellnummer</FormLabel>
                      <FormControl>
                        <Input placeholder="Bestellnummer" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="productName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Produktname</FormLabel>
                      <FormControl>
                        <Input placeholder="Name des zurückzusendenden Produkts" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="returnReasonType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Grund für die Rückgabe</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Bitte Grund auswählen" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="customer_withdrawal">Kunden Rücktritt</SelectItem>
                          <SelectItem value="deposit">Altteilpfand</SelectItem>
                          <SelectItem value="damaged">Ware ist beschädigt</SelectItem>
                          <SelectItem value="wrong_order">Falsch bestellt</SelectItem>
                          <SelectItem value="other">Sonstiger Grund</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {form.watch("returnReasonType") === "other" && (
                  <FormField
                    control={form.control}
                    name="returnReasonText"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bitte beschreiben Sie den Grund</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Bitte beschreiben Sie den Grund für die Rückgabe"
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="packageCondition"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Zustand der Verpackung</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Bitte auswählen" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="original">Originalverpackung</SelectItem>
                          <SelectItem value="opened">Geöffnet, aber intakt</SelectItem>
                          <SelectItem value="damaged">Beschädigt</SelectItem>
                          <SelectItem value="missing">Keine Verpackung</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="productCondition"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Zustand des Produkts</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Bitte auswählen" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="new">Neu/Unbenutzt</SelectItem>
                          <SelectItem value="used">Gebraucht</SelectItem>
                          <SelectItem value="damaged">Beschädigt</SelectItem>
                          <SelectItem value="defective">Defekt</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="contactEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E-Mail</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Ihre E-Mail-Adresse" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="contactPhone"
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
              </div>

              <FormField
                control={form.control}
                name="additionalInfo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Zusätzliche Informationen (optional)</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Weitere Informationen zur Rückgabe" className="min-h-[100px]" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Wird gesendet..." : "Rückgabe anmelden"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center pt-2 pb-6">
          <Link href="/">
            <Button variant="ghost" className="flex items-center gap-2">
              <ArrowLeft size={16} />
              Zurück zur Startseite
            </Button>
          </Link>
        </CardFooter>
      </Card>

      <FormSuccessDialog
        open={showSuccessDialog}
        onOpenChange={setShowSuccessDialog}
        title="Rückgabe erfolgreich angemeldet"
        description="Vielen Dank für Ihre Rückgabeanmeldung. Wir werden Ihre Anfrage prüfen und uns in Kürze bei Ihnen melden."
        formType="contact"
      />
    </div>
  )
}
