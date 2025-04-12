"use client"

import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AGBPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        <Button variant="ghost" className="mb-8" asChild>
          <Link href="/">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Zurück zur Startseite
          </Link>
        </Button>

        <div className="prose prose-gray max-w-none">
          <h1>Allgemeine Geschäftsbedingungen (AGB)</h1>

          <h2>1. Geltungsbereich</h2>
          <p>
            1.1 Diese AGB gelten für alle Bestellungen, die von Privatkunden oder Geschäftskunden (nachfolgend "Kunde"
            genannt) bei Ersatzteilpartner24.de, Inhaber Emre Avci, Dietrich-Bonhoeffer-Straße 4, 21423 Winsen (Luhe),
            getätigt werden.
          </p>
          <p>1.2 Für Geschäftskunden gelten ergänzende Regelungen, die in Abschnitt B aufgeführt sind.</p>

          <h2>2. Vertragspartner</h2>
          <p>
            Der Kaufvertrag kommt zustande mit Ersatzteilpartner24.de, Inhaber Emre Avci, Dietrich-Bonhoeffer-Straße 4,
            21423 Winsen (Luhe).
          </p>

          <h2>3. Vertragsschluss</h2>
          <p>
            3.1 Die Darstellung der Produkte im Online-Shop stellt kein rechtlich bindendes Angebot dar, sondern eine
            Aufforderung zur Abgabe einer Bestellung.
          </p>
          <p>
            3.2 Durch Anklicken des Buttons „Jetzt kaufen" gibt der Kunde eine verbindliche Bestellung der im Warenkorb
            enthaltenen Waren ab. Der Kaufvertrag kommt durch unsere Bestätigung per E-Mail oder durch den Versand der
            Ware zustande.
          </p>

          <h2>4. Preise und Zahlungsbedingungen</h2>
          <p>4.1 Alle Preise verstehen sich als Endpreise inklusive der gesetzlichen Mehrwertsteuer.</p>
          <p>4.2 Die Zahlung erfolgt per Vorkasse, PayPal, oder andere im Shop angebotene Zahlungsmethoden.</p>

          <h2>5. Lieferung</h2>
          <p>5.1 Die Lieferung erfolgt innerhalb Deutschlands, es sei denn, es wurde etwas anderes vereinbart.</p>
          <p>5.2 Lieferfristen beginnen ab Zahlungseingang.</p>

          <h2>6. Widerrufsrecht</h2>
          <p>
            6.1 Verbraucher haben ein vierzehntägiges Widerrufsrecht. Die genauen Bedingungen entnehmen Sie bitte
            unserer Widerrufsbelehrung.
          </p>
          <p>
            6.2 Das Widerrufsrecht gilt nicht für speziell angefertigte oder nach Kundenwunsch konfigurierte Artikel.
          </p>

          <h2>7. Haftung</h2>
          <p>
            7.1 Die Haftung des Verkäufers für vertragliche Pflichtverletzungen sowie aus Delikt ist auf Vorsatz und
            grobe Fahrlässigkeit beschränkt, es sei denn, es handelt sich um die Verletzung von Leben, Körper oder
            Gesundheit.
          </p>
          <p>
            7.2 Bei der Verletzung wesentlicher Vertragspflichten haftet der Verkäufer auch bei leichter Fahrlässigkeit,
            jedoch begrenzt auf den typischen vorhersehbaren Schaden.
          </p>
          <p>7.3 Die Haftung nach dem Produkthaftungsgesetz bleibt unberührt.</p>

          <h2>8. Gewährleistung</h2>
          <p>Die gesetzlichen Gewährleistungsrechte gelten uneingeschränkt.</p>

          <h2>9. Schlussbestimmungen</h2>
          <p>9.1 Es gilt deutsches Recht unter Ausschluss des UN-Kaufrechts.</p>
          <p>
            9.2 Sollten einzelne Bestimmungen dieser AGB unwirksam sein oder werden, bleibt die Wirksamkeit der übrigen
            Bestimmungen davon unberührt.
          </p>

          <h2>10. Reklamation und Rücksendung</h2>
          <h3>10.1 Reklamationen</h3>
          <p>
            Sollte die gelieferte Ware Mängel aufweisen, können Sie diese gemäß den gesetzlichen
            Gewährleistungsbestimmungen reklamieren. Bitte setzen Sie sich in diesem Fall umgehend mit uns in Verbindung
            und teilen Sie uns den Mangel schriftlich oder per E-Mail mit, um das weitere Vorgehen abzustimmen.
          </p>

          <p>
            <strong>Privatkunden:</strong> Für Verbraucher gelten die gesetzlichen Gewährleistungsfristen von zwei
            Jahren ab Lieferung.
          </p>
          <p>
            <strong>Geschäftskunden:</strong> Die Gewährleistungsfrist beträgt für Unternehmer ein Jahr ab Lieferung,
            sofern nicht zwingend gesetzliche Regelungen eine längere Frist vorschreiben.
          </p>

          <h3>10.2 Vorgehen bei Reklamationen</h3>
          <p>
            Nach Eingang Ihrer Reklamation werden wir den Mangel prüfen und Ihnen mitteilen, ob die Ware repariert,
            ersetzt oder der Kaufpreis erstattet wird. In jedem Fall ist die mangelhafte Ware unverzüglich an uns
            zurückzusenden.
          </p>

          <h3>10.3 Rücksendung</h3>
          <p>Die Kosten der Rücksendung bei Reklamationen und im Falle eines Widerrufs trägt:</p>

          <p>
            <strong>Privatkunden:</strong> Der Verkäufer übernimmt die Rücksendekosten, sofern die Ware mangelhaft ist
            oder ein Widerruf geltend gemacht wurde.
          </p>
          <p>
            <strong>Geschäftskunden:</strong> Geschäftskunden tragen die Rücksendekosten, es sei denn, es liegt ein
            Gewährleistungsfall vor oder es wurde etwas anderes vereinbart.
          </p>

          <h3>10.4 Rücksendung von Waren ohne Mangel</h3>
          <p>
            Eine Rücksendung von Waren ohne Mangel ist nur nach vorheriger Absprache möglich. Bitte beachten Sie, dass
            Waren, die nach Kundenspezifikation angefertigt wurden, sowie Verbrauchsmaterialien und geöffnete Produkte
            in der Regel von der Rücksendung ausgeschlossen sind.
          </p>

          <h3>10.5 Zustand der zurückgesendeten Ware</h3>
          <p>
            Stellen Sie sicher, dass die Ware ordnungsgemäß verpackt und in dem Zustand zurückgeschickt wird, wie sie
            bei Ihnen eingegangen ist. Bei nicht ordnungsgemäßer Verpackung oder Beschädigung behalten wir uns vor, eine
            angemessene Entschädigung zu verlangen oder die Rücknahme zu verweigern.
          </p>
        </div>
      </div>
    </div>
  )
}
