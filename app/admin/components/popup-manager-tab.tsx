"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Bell, Type, Clock, Palette, Link } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { Slider } from "@/components/ui/slider"

interface PopupConfig {
  active: boolean
  title: string
  description: string
  imageUrl: string
  buttonText: string
  buttonUrl: string
  redirectEnabled: boolean // Neue Eigenschaft
  duration: number // in days
  maxViews: number
  viewInterval: number // in days
  backgroundColor: string
  textColor: string
}

const defaultConfig: PopupConfig = {
  active: false,
  title: "Willkommen zurück!",
  description: "Schön, dass Sie wieder da sind. Entdecken Sie unsere neuesten Angebote und Dienstleistungen.",
  imageUrl: "",
  buttonText: "Jetzt entdecken",
  buttonUrl: "/",
  redirectEnabled: true, // Standardmäßig aktiviert
  duration: 7, // 1 week
  maxViews: 2,
  viewInterval: 2, // 2 days
  backgroundColor: "#ffffff",
  textColor: "#000000",
}

export function PopupManagerTab() {
  const [config, setConfig] = useState<PopupConfig>(defaultConfig)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    // Load saved configuration
    const savedConfig = localStorage.getItem("popupConfig")
    if (savedConfig) {
      const parsedConfig = JSON.parse(savedConfig)
      // Fallback für ältere Konfigurationen ohne redirectEnabled
      if (parsedConfig.redirectEnabled === undefined) {
        parsedConfig.redirectEnabled = true
      }
      setConfig(parsedConfig)
    }
    setIsLoading(false)

    // Listen for custom events
    const handleCustomEvent = (e: CustomEvent) => {
      if (e.detail && e.detail.config) {
        setConfig(e.detail.config)
      }
    }

    window.addEventListener("popupConfigUpdated", handleCustomEvent as EventListener)

    return () => {
      window.removeEventListener("popupConfigUpdated", handleCustomEvent as EventListener)
    }
  }, [])

  const handleSave = () => {
    // Speichern der Konfiguration im localStorage
    localStorage.setItem("popupConfig", JSON.stringify(config))

    // Reset popup history to force showing it again
    localStorage.removeItem("popupHistory")
    localStorage.removeItem("popupCreated")

    // Dispatch storage event to update other tabs
    window.dispatchEvent(
      new StorageEvent("storage", {
        key: "popupConfig",
        newValue: JSON.stringify(config),
      }),
    )

    // Dispatch a custom event for the same tab
    const customEvent = new CustomEvent("popupConfigUpdated", {
      detail: { config },
    })
    window.dispatchEvent(customEvent)

    toast({
      title: "Änderungen gespeichert",
      description: "Die Popup-Einstellungen wurden aktualisiert.",
    })
  }

  const handleReset = () => {
    if (confirm("Möchten Sie wirklich alle Popup-Einstellungen zurücksetzen?")) {
      setConfig(defaultConfig)
      localStorage.removeItem("popupConfig")
      localStorage.removeItem("popupHistory")
      localStorage.removeItem("popupCreated")

      toast({
        title: "Einstellungen zurückgesetzt",
        description: "Die Popup-Einstellungen wurden auf die Standardwerte zurückgesetzt.",
      })
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Popup-Manager
          </CardTitle>
          <CardDescription>Erstellen und verwalten Sie Popup-Nachrichten für wiederkehrende Besucher.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="content">
            <TabsList className="mb-4">
              <TabsTrigger value="content">
                <Type className="mr-2 h-4 w-4" />
                Inhalt
              </TabsTrigger>
              <TabsTrigger value="appearance">
                <Palette className="mr-2 h-4 w-4" />
                Aussehen
              </TabsTrigger>
              <TabsTrigger value="timing">
                <Clock className="mr-2 h-4 w-4" />
                Timing
              </TabsTrigger>
              <TabsTrigger value="behavior">
                <Link className="mr-2 h-4 w-4" />
                Verhalten
              </TabsTrigger>
            </TabsList>

            <TabsContent value="content">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="popup-active"
                    checked={config.active}
                    onCheckedChange={(checked) => setConfig({ ...config, active: checked })}
                  />
                  <Label htmlFor="popup-active">Popup aktivieren</Label>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="popup-title">Überschrift</Label>
                  <Input
                    id="popup-title"
                    value={config.title}
                    onChange={(e) => setConfig({ ...config, title: e.target.value })}
                    placeholder="Willkommen zurück!"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="popup-description">Beschreibung</Label>
                  <Textarea
                    id="popup-description"
                    value={config.description}
                    onChange={(e) => setConfig({ ...config, description: e.target.value })}
                    placeholder="Schön, dass Sie wieder da sind..."
                    rows={4}
                  />
                  <p className="text-xs text-muted-foreground">
                    Sie können HTML-Tags verwenden, um den Text zu formatieren.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="popup-image">Bild-URL</Label>
                  <Input
                    id="popup-image"
                    value={config.imageUrl}
                    onChange={(e) => setConfig({ ...config, imageUrl: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                  />
                  <p className="text-xs text-muted-foreground">
                    Geben Sie die URL eines Bildes ein, das im Popup angezeigt werden soll.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="popup-button-text">Button-Text</Label>
                    <Input
                      id="popup-button-text"
                      value={config.buttonText}
                      onChange={(e) => setConfig({ ...config, buttonText: e.target.value })}
                      placeholder="Jetzt entdecken"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="popup-button-url">Button-URL</Label>
                    <Input
                      id="popup-button-url"
                      value={config.buttonUrl}
                      onChange={(e) => setConfig({ ...config, buttonUrl: e.target.value })}
                      placeholder="/"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="appearance">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="popup-bg-color">Hintergrundfarbe</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="popup-bg-color"
                      type="color"
                      value={config.backgroundColor}
                      onChange={(e) => setConfig({ ...config, backgroundColor: e.target.value })}
                      className="w-12 h-10 p-1"
                    />
                    <Input
                      value={config.backgroundColor}
                      onChange={(e) => setConfig({ ...config, backgroundColor: e.target.value })}
                      placeholder="#ffffff"
                      className="flex-1"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="popup-text-color">Textfarbe</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="popup-text-color"
                      type="color"
                      value={config.textColor}
                      onChange={(e) => setConfig({ ...config, textColor: e.target.value })}
                      className="w-12 h-10 p-1"
                    />
                    <Input
                      value={config.textColor}
                      onChange={(e) => setConfig({ ...config, textColor: e.target.value })}
                      placeholder="#000000"
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="timing">
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="popup-duration">Anzeigedauer (Tage)</Label>
                    <span className="text-sm font-medium">{config.duration} Tage</span>
                  </div>
                  <Slider
                    id="popup-duration"
                    min={1}
                    max={30}
                    step={1}
                    value={[config.duration]}
                    onValueChange={(value) => setConfig({ ...config, duration: value[0] })}
                  />
                  <p className="text-xs text-muted-foreground">
                    Wie lange soll das Popup aktiv sein? Nach dieser Zeit wird es nicht mehr angezeigt.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="popup-max-views">Maximale Anzeigen pro Besucher</Label>
                    <span className="text-sm font-medium">{config.maxViews}x</span>
                  </div>
                  <Slider
                    id="popup-max-views"
                    min={1}
                    max={5}
                    step={1}
                    value={[config.maxViews]}
                    onValueChange={(value) => setConfig({ ...config, maxViews: value[0] })}
                  />
                  <p className="text-xs text-muted-foreground">
                    Wie oft soll das Popup demselben Besucher maximal angezeigt werden?
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="popup-interval">Mindestabstand zwischen Anzeigen (Tage)</Label>
                    <span className="text-sm font-medium">{config.viewInterval} Tage</span>
                  </div>
                  <Slider
                    id="popup-interval"
                    min={0}
                    max={7}
                    step={1}
                    value={[config.viewInterval]}
                    onValueChange={(value) => setConfig({ ...config, viewInterval: value[0] })}
                  />
                  <p className="text-xs text-muted-foreground">
                    Wie viele Tage sollen mindestens zwischen zwei Anzeigen liegen?
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="behavior">
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="popup-redirect"
                      checked={config.redirectEnabled}
                      onCheckedChange={(checked) => setConfig({ ...config, redirectEnabled: checked })}
                    />
                    <Label htmlFor="popup-redirect">Weiterleitung aktivieren</Label>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Wenn aktiviert, wird der Besucher beim Klicken auf den Button zur angegebenen URL weitergeleitet.
                    Wenn deaktiviert, wird das Popup beim Klicken auf den Button nur geschlossen.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-6 p-4 border rounded-md bg-gray-50">
            <h3 className="font-medium mb-2">Vorschau:</h3>
            <div className="bg-white border rounded-md overflow-hidden shadow-md">
              {config.imageUrl && (
                <div
                  className="w-full h-32 bg-center bg-cover"
                  style={{ backgroundImage: `url(${config.imageUrl})` }}
                ></div>
              )}
              <div className="p-4" style={{ backgroundColor: config.backgroundColor }}>
                <h3 className="text-lg font-bold mb-2" style={{ color: config.textColor }}>
                  {config.title || "Willkommen zurück!"}
                </h3>
                <p className="text-sm mb-3" style={{ color: config.textColor }}>
                  {config.description || "Schön, dass Sie wieder da sind..."}
                </p>
                {config.buttonText && (
                  <Button size="sm" className="w-full">
                    {config.buttonText}
                  </Button>
                )}
                {config.buttonText && (
                  <div className="mt-2 text-xs text-center text-muted-foreground">
                    {config.redirectEnabled
                      ? `Klick leitet weiter zu: ${config.buttonUrl}`
                      : "Klick schließt nur das Popup"}
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleReset}>
            Zurücksetzen
          </Button>
          <Button onClick={handleSave}>Änderungen speichern</Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
