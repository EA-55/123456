"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Check, Loader2, Plus, Trash2 } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFieldArray } from "react-hook-form"
import * as z from "zod"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

// Schema für einen einzelnen Artikel
const articleSchema = z.object({
  articleNumber: z.string().min(1, "Artikelnummer ist erforderlich"),
  quantity: z.string().min(1, "Menge ist erforderlich"),
  deliveryNoteNumber: z.string().optional(),
  condition: z.string().min(1, "Zustand der Ware ist erforderlich"),
  returnReason: z.string().min(1, "Grund für die Rückgabe ist erforderlich"),
  otherReason: z.string().optional(),
})

// Formular-Schema mit Zod
const returnFormSchema = z.object({
  customerNumber: z.string().min(1, "Kundennummer ist erforderlich"),
  customerName: z.string().min(1, "Kundenname ist erforderlich"),
  email: z.string().email("Ungültige E-Mail-Adresse"),
  comments: z.string().optional(),
  articles: z.array(articleSchema).min(1, "Mindestens ein Artikel muss hinzugefügt werden"),
})

type ReturnFormValues = z.infer<typeof returnFormSchema>

export default function ReturnPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const [returnId, setReturnId] = useState("")

  // Formular initialisieren
  const form = useForm<ReturnFormValues>({
    resolver: zodResolver(returnFormSchema),
    defaultValues: {
      customerNumber: "",
      customerName: "",
      email: "",
      comments: "",
      articles: [
        {
          articleNumber: "",
          quantity: "",
          deliveryNoteNumber: "",
          condition: "",
          returnReason: "",
          otherReason: "",
        },
      ],
    },
  })

  // FieldArray für die Artikel
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "articles",
  })

  // Formular absenden
  const onSubmit = async (data: ReturnFormValues) => {
    setIsSubmitting(true)

    try {
      // Verarbeite die Daten für jeden Artikel
      const processedData = {
        ...data,
        articles: data.articles.map((article) => ({
          ...article,
          returnReason:
            article.returnReason === "Sonstiger Grund"
              ? `Sonstiger Grund: ${article.otherReason}`
              : article.returnReason,
        })),
      }

      console.log("Absenden der Daten:", processedData)

      // Simuliere API-Aufruf
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Generiere eine zufällige Rückgabe-ID
      setReturnId("RMA-" + Math.floor(Math.random() * 10000))
      setShowSuccessDialog(true)
      form.reset()
    } catch (error) {
      console.error("Fehler beim Absenden:", error)
      // Hier könnte eine Fehlerbehandlung erfolgen
    } finally {
      setIsSubmitting(false)
    }
  }

  // Artikel hinzufügen
  const addArticle = () => {
    append({
      articleNumber: "",
      quantity: "",
      deliveryNoteNumber: "",
      condition: "",
      returnReason: "",
      otherReason: "",
    })
  }

  return (
    <div className="container py-10">
      <div className="mb-6">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Zurück zur Startseite
          </Link>
        </Button>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-3xl font-bold tracking-tight">Rückgabe anmelden</h1>
          <p className="text-muted-foreground mt-2">
            Füllen Sie das Formular aus, um eine Rückgabe anzumelden. Sie können mehrere Artikel zurückgeben.
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Rückgabeformular</CardTitle>
            <CardDescription>
              Bitte geben Sie Ihre Kontaktdaten und die Artikel an, die Sie zurücksenden möchten.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Kundendaten</h3>
                  <div className="grid gap-4 sm:grid-cols-3">
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
                          <FormLabel>Kundenname</FormLabel>
                          <FormControl>
                            <Input placeholder="Ihr Name" {...field} />
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
                            <Input type="email" placeholder="Ihre E-Mail-Adresse" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Artikel zur Rückgabe</h3>
                    <Badge variant="outline" className="ml-2">
                      {fields.length} {fields.length === 1 ? "Artikel" : "Artikel"}
                    </Badge>
                  </div>

                  {fields.map((field, index) => (
                    <div key={field.id} className="p-4 border rounded-md bg-muted/30">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-medium">Artikel {index + 1}</h4>
                        {fields.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => remove(index)}
                            className="h-8 px-2 text-destructive"
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Entfernen
                          </Button>
                        )}
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <FormField
                          control={form.control}
                          name={`articles.${index}.articleNumber`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Artikelnummer</FormLabel>
                              <FormControl>
                                <Input placeholder="z.B. GDB1550" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`articles.${index}.quantity`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Menge</FormLabel>
                              <FormControl>
                                <Input placeholder="z.B. 3" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2 mt-4">
                        <FormField
                          control={form.control}
                          name={`articles.${index}.deliveryNoteNumber`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Lieferscheinnummer (optional)</FormLabel>
                              <FormControl>
                                <Input placeholder="Lieferscheinnummer" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`articles.${index}.condition`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Zustand der Ware</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Zustand auswählen" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-white border border-gray-200 shadow-md">
                                  <SelectItem value="Originalverpackung">Originalverpackung</SelectItem>
                                  <SelectItem value="Geöffnet, aber intakt">Geöffnet, aber intakt</SelectItem>
                                  <SelectItem value="Beschädigt">Beschädigt</SelectItem>
                                  <SelectItem value="Keine Verpackung">Keine Verpackung</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2 mt-4">
                        <FormField
                          control={form.control}
                          name={`articles.${index}.returnReason`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Grund für die Rückgabe</FormLabel>
                              <Select
                                onValueChange={(value) => {
                                  field.onChange(value)
                                  // Wenn "Sonstiger Grund" ausgewählt wird, setze otherReason zurück
                                  if (value !== "Sonstiger Grund") {
                                    form.setValue(`articles.${index}.otherReason`, "")
                                  }
                                }}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Grund auswählen" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-white border border-gray-200 shadow-md">
                                  <SelectItem value="Kunden Rücktritt">Kunden Rücktritt</SelectItem>
                                  <SelectItem value="Altteilpfand">Altteilpfand</SelectItem>
                                  <SelectItem value="Ware ist beschädigt">Ware ist beschädigt</SelectItem>
                                  <SelectItem value="Falsch bestellt">Falsch bestellt</SelectItem>
                                  <SelectItem value="Sonstiger Grund">Sonstiger Grund</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {form.watch(`articles.${index}.returnReason`) === "Sonstiger Grund" && (
                          <FormField
                            control={form.control}
                            name={`articles.${index}.otherReason`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Sonstiger Grund</FormLabel>
                                <FormControl>
                                  <Input placeholder="Bitte geben Sie Ihren Grund an" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}
                      </div>
                    </div>
                  ))}

                  <Button type="button" variant="outline" size="sm" onClick={addArticle} className="mt-2 w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Weiteren Artikel hinzufügen
                  </Button>
                </div>

                <FormField
                  control={form.control}
                  name="comments"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Zusätzliche Kommentare</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Weitere Informationen zur Rückgabe (optional)" {...field} />
                      </FormControl>
                      <FormDescription>
                        Hier können Sie zusätzliche Informationen angeben, die für die Bearbeitung Ihrer Rückgabe
                        wichtig sein könnten.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Wird gesendet...
                    </>
                  ) : (
                    "Rückgabe anmelden"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" asChild>
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Zurück zur Startseite
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </motion.div>

      {/* Erfolgs-Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Check className="mr-2 h-6 w-6 text-green-500" />
              Rückgabe erfolgreich angemeldet
            </DialogTitle>
            <DialogDescription>
              Ihre Rückgabe wurde erfolgreich angemeldet. Wir werden uns schnellstmöglich mit Ihnen in Verbindung
              setzen.
            </DialogDescription>
          </DialogHeader>
          <div className="p-4 bg-muted rounded-md">
            <p className="font-medium">Ihre Rückgabe-Referenznummer:</p>
            <p className="text-xl font-bold mt-1">{returnId}</p>
            <p className="text-sm text-muted-foreground mt-2">Bitte bewahren Sie diese Nummer für Rückfragen auf.</p>
          </div>
          <div className="flex justify-end">
            <Button onClick={() => setShowSuccessDialog(false)}>Schließen</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
