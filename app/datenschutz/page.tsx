"use client"

import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function DatenschutzPage() {
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
          <h1>Datenschutzerklärung</h1>

          <p>
            Wir freuen uns über Ihren Besuch auf unserer Webseite www.ersatzteilpartner24.de und Ihr Interesse an
            unserem Unternehmen und unseren Angeboten. Für externe Links zu fremden Inhalten übernehmen wir trotz
            sorgfältiger inhaltlicher Kontrolle keine Haftung, da wir die Übermittlung dieser Information nicht
            veranlasst, den Adressaten der übermittelten Information und die übermittelten Informationen selbst nicht
            ausgewählt oder verändert haben.
          </p>

          <h2>Name und Kontaktdaten des für die Verarbeitung Verantwortlichen</h2>
          <p>Diese Datenschutz-Information gilt für die Datenverarbeitung durch:</p>
          <p>
            Emre Avci
            <br />
            Dietrich Bonhoeffer Str. 4<br />
            21423 Winsen Luhe
            <br />
            E-Mail: info@ersatzteilpartner24.de
            <br />
            Telefon: 01705345350
          </p>

          <h2>Datenschutzbeauftragter:</h2>
          <p>
            Emre Avci
            <br />
            Dietrich Bonhoeffer Str. 4<br />
            21423 Winsen Luhe
            <br />
            E-Mail: info@ersatzteilpartner24.de
            <br />
            Telefon: 01705345350
          </p>

          <h2>Erhebung und Speicherung personenbezogener Daten sowie Art und Zweck von deren Verwendung</h2>
          <h3>a) Beim Besuch der Website</h3>
          <p>
            Beim Aufrufen unserer Website www.ersatzteilpartner24.de werden durch den auf Ihrem Endgerät zum Einsatz
            kommenden Browser automatisch Informationen an den Server unserer Website gesendet. Diese Informationen
            werden temporär in einem sog. Logfile gespeichert. Folgende Informationen werden dabei ohne Ihr Zutun
            erfasst und bis zur automatisierten Löschung gespeichert:
          </p>
          <ul>
            <li>IP-Adresse des anfragenden Rechners,</li>
            <li>Datum und Uhrzeit des Zugriffs,</li>
            <li>Name und URL der abgerufenen Datei,</li>
            <li>Website, von der aus der Zugriff erfolgt (Referrer-URL),</li>
            <li>
              verwendeter Browser und ggf. das Betriebssystem Ihres Rechners sowie der Name Ihres Access-Providers
            </li>
          </ul>
          <p>Die genannten Daten werden durch uns zu folgenden Zwecken verarbeitet:</p>
          <ul>
            <li>Gewährleistung eines reibungslosen Verbindungsaufbaus der Website,</li>
            <li>Gewährleistung einer komfortablen Nutzung unserer Website,</li>
            <li>Auswertung der Systemsicherheit und -stabilität sowie</li>
            <li>zu weiteren administrativen Zwecken</li>
          </ul>
          <p>
            Die Rechtsgrundlage für die Datenverarbeitung ist Art. 6 Abs. 1 S. 1 lit. f DSGVO. Unser berechtigtes
            Interesse folgt aus oben aufgelisteten Zwecken zur Datenerhebung. In keinem Fall verwenden wir die erhobenen
            Daten zu dem Zweck, Rückschlüsse auf Ihre Person zu ziehen.
          </p>

          <h3>b) Bei Nutzung unseres Kontaktformulars</h3>
          <p>
            Bei Fragen jeglicher Art bieten wir Ihnen die Möglichkeit, mit uns über ein auf der Website bereitgestelltes
            Formular Kontakt aufzunehmen. Dabei ist die Angabe einer gültigen E-Mail-Adresse erforderlich, damit wir
            wissen, von wem die Anfrage stammt und um diese beantworten zu können. Weitere Angaben können freiwillig
            getätigt werden.
          </p>
          <p>
            Die Datenverarbeitung zum Zwecke der Kontaktaufnahme mit uns erfolgt nach Art. 6 Abs. 1 S. 1 lit. a DSGVO
            auf Grundlage Ihrer freiwillig erteilten Einwilligung.
          </p>
          <p>
            Die für die Benutzung des Kontaktformulars von uns erhobenen personenbezogenen Daten werden nach Erledigung
            der von Ihnen gestellten Anfrage automatisch gelöscht.
          </p>

          <h2>Weitergabe von Daten</h2>
          <p>
            Eine Übermittlung Ihrer persönlichen Daten an Dritte zu anderen als den im Folgenden aufgeführten Zwecken
            findet nicht statt.
          </p>
          <p>Wir geben Ihre persönlichen Daten nur an Dritte weiter, wenn:</p>
          <ul>
            <li>Sie Ihre nach Art. 6 Abs. 1 S. 1 lit. a DSGVO ausdrückliche Einwilligung dazu erteilt haben,</li>
            <li>
              die Weitergabe nach Art. 6 Abs. 1 S. 1 lit. f DSGVO zur Geltendmachung, Ausübung oder Verteidigung von
              Rechtsansprüchen erforderlich ist und kein Grund zur Annahme besteht, dass Sie ein überwiegendes
              schutzwürdiges Interesse an der Nichtweitergabe Ihrer Daten haben,
            </li>
            <li>
              für den Fall, dass für die Weitergabe nach Art. 6 Abs. 1 S. 1 lit. c DSGVO eine gesetzliche Verpflichtung
              besteht, sowie
            </li>
            <li>
              dies gesetzlich zulässig und nach Art. 6 Abs. 1 S. 1 lit. b DSGVO für die Abwicklung von
              Vertragsverhältnissen mit Ihnen erforderlich ist.
            </li>
          </ul>

          <h2>Cookies und Tracking-Technologien</h2>
          <p>
            Wir verwenden auf unserer Webseite Cookies. Cookies sind kleine Textdateien, die über einen Internetbrowser
            auf einem Computersystem abgelegt und gespeichert werden.
          </p>
          <p>
            Viele Cookies enthalten eine sogenannte Cookie-ID. Eine Cookie-ID ist eine eindeutige Kennung des Cookies.
            Sie besteht aus einer Zeichenfolge, durch welche Internetseiten und Server dem konkreten Internetbrowser
            zugeordnet werden können, in dem das Cookie gespeichert wurde. Dies ermöglicht es den besuchten
            Internetseiten und Servern, den individuellen Browser der betroffenen Person von anderen Internetbrowsern,
            die andere Cookies enthalten, zu unterscheiden.
          </p>
          <h3>Arten von Cookies, die wir verwenden:</h3>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>
              <strong>Notwendige Cookies:</strong> Diese Cookies sind für den Betrieb unserer Website erforderlich und
              können in unseren Systemen nicht abgeschaltet werden. Sie werden in der Regel nur als Reaktion auf von
              Ihnen getätigte Aktionen gesetzt, die einer Dienstanforderung entsprechen, wie etwa dem Festlegen Ihrer
              Datenschutzeinstellungen, dem Anmelden oder dem Ausfüllen von Formularen.
            </li>
            <li>
              <strong>Funktionale Cookies:</strong> Diese Cookies ermöglichen es uns, die Nutzung der Website zu
              analysieren, um deren Leistung zu messen und zu verbessern. Sie helfen uns zu verstehen, wie Besucher mit
              unserer Website interagieren.
            </li>
            <li>
              <strong>Targeting-Cookies:</strong> Diese Cookies können von unseren Werbepartnern über unsere Website
              gesetzt werden. Sie können von diesen Unternehmen verwendet werden, um ein Profil Ihrer Interessen zu
              erstellen und Ihnen relevante Werbung auf anderen Websites zu zeigen.
            </li>
          </ul>
          <h3>Ihre Einwilligungsmöglichkeiten</h3>
          <p>
            Sie können selbst entscheiden, ob Sie Cookies akzeptieren oder ablehnen möchten. Die meisten Webbrowser
            akzeptieren Cookies automatisch, aber Sie können Ihre Browsereinstellungen in der Regel so ändern, dass
            Cookies abgelehnt werden, wenn Sie dies bevorzugen. Dies kann jedoch dazu führen, dass einige Funktionen und
            Services auf unseren Websites nicht korrekt funktionieren.
          </p>
          <p>
            Beim ersten Besuch unserer Website haben Sie die Möglichkeit, der Verwendung von Cookies zuzustimmen oder
            diese abzulehnen. Sie können Ihre Entscheidung jederzeit ändern, indem Sie Ihre Browsercookies löschen und
            unsere Website erneut besuchen.
          </p>

          <h2>Betroffenenrechte</h2>
          <p>Sie haben das Recht:</p>
          <ul>
            <li>
              gemäß Art. 15 DSGVO Auskunft über Ihre von uns verarbeiteten personenbezogenen Daten zu verlangen.
              Insbesondere können Sie Auskunft über die Verarbeitungszwecke, die Kategorie der personenbezogenen Daten,
              die Kategorien von Empfängern, gegenüber denen Ihre Daten offengelegt wurden oder werden, die geplante
              Speicherdauer, das Bestehen eines Rechts auf Berichtigung, Löschung, Einschränkung der Verarbeitung oder
              Widerspruch, das Bestehen eines Beschwerderechts, die Herkunft ihrer Daten, sofern diese nicht bei uns
              erhoben wurden, sowie über das Bestehen einer automatisierten Entscheidungsfindung einschließlich
              Profiling und ggf. aussagekräftigen Informationen zu deren Einzelheiten verlangen;
            </li>
            <li>
              gemäß Art. 16 DSGVO unverzüglich die Berichtigung unrichtiger oder Vervollständigung Ihrer bei uns
              gespeicherten personenbezogenen Daten zu verlangen;
            </li>
            <li>
              gemäß Art. 17 DSGVO die Löschung Ihrer bei uns gespeicherten personenbezogenen Daten zu verlangen, soweit
              nicht die Verarbeitung zur Ausübung des Rechts auf freie Meinungsäußerung und Information, zur Erfüllung
              einer rechtlichen Verpflichtung, aus Gründen des öffentlichen Interesses oder zur Geltendmachung, Ausübung
              oder Verteidigung von Rechtsansprüchen erforderlich ist;
            </li>
            <li>
              gemäß Art. 18 DSGVO die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen, soweit
              die Richtigkeit der Daten von Ihnen bestritten wird, die Verarbeitung unrechtmäßig ist, Sie aber deren
              Löschung ablehnen und wir die Daten nicht mehr benötigen, Sie jedoch diese zur Geltendmachung, Ausübung
              oder Verteidigung von Rechtsansprüchen benötigen oder Sie gemäß Art. 21 DSGVO Widerspruch gegen die
              Verarbeitung eingelegt haben;
            </li>
            <li>
              gemäß Art. 20 DSGVO Ihre personenbezogenen Daten, die Sie uns bereitgestellt haben, in einem
              strukturierten, gängigen und maschinenlesbaren Format zu erhalten oder die Übermittlung an einen anderen
              Verantwortlichen zu verlangen;
            </li>
            <li>
              gemäß Art. 7 Abs. 3 DSGVO Ihre einmal erteilte Einwilligung jederzeit gegenüber uns zu widerrufen. Dies
              hat zur Folge, dass wir die Datenverarbeitung, die auf dieser Einwilligung beruhte, für die Zukunft nicht
              mehr fortführen dürfen und
            </li>
            <li>
              gemäß Art. 77 DSGVO sich bei einer Aufsichtsbehörde zu beschweren. In der Regel können Sie sich hierfür an
              die Aufsichtsbehörde Ihres üblichen Aufenthaltsortes oder Arbeitsplatzes oder unseres Firmensitzes wenden.
            </li>
          </ul>

          <h2>Widerspruchsrecht</h2>
          <p>
            Sofern Ihre personenbezogenen Daten auf Grundlage von berechtigten Interessen gemäß Art. 6 Abs. 1 S. 1 lit.
            f DSGVO verarbeitet werden, haben Sie das Recht, gemäß Art. 21 DSGVO Widerspruch gegen die Verarbeitung
            Ihrer personenbezogenen Daten einzulegen, soweit dafür Gründe vorliegen, die sich aus Ihrer besonderen
            Situation ergeben oder sich der Widerspruch gegen Direktwerbung richtet. Im letzteren Fall haben Sie ein
            generelles Widerspruchsrecht, das ohne Angabe einer besonderen Situation von uns umgesetzt wird.
          </p>
          <p>
            Möchten Sie von Ihrem Widerrufs- oder Widerspruchsrecht Gebrauch machen, genügt eine E-Mail an
            info@ersatzteilpartner24.de
          </p>

          <h2>Datensicherheit</h2>
          <p>
            Wir verwenden innerhalb des Website-Besuchs das verbreitete SSL-Verfahren (Secure Socket Layer) in
            Verbindung mit der jeweils höchsten Verschlüsselungsstufe, die von Ihrem Browser unterstützt wird. In der
            Regel handelt es sich dabei um eine 256 Bit Verschlüsselung. Falls Ihr Browser keine 256-Bit Verschlüsselung
            unterstützt, greifen wir stattdessen auf 128-Bit v3 Technologie zurück. Ob eine einzelne Seite unseres
            Internetauftrittes verschlüsselt übertragen wird, erkennen Sie an der geschlossenen Darstellung des
            Schüssel- beziehungsweise Schloss-Symbols in der unteren Statusleiste Ihres Browsers.
          </p>
          <p>
            Wir bedienen uns im Übrigen geeigneter technischer und organisatorischer Sicherheitsmaßnahmen, um Ihre Daten
            gegen zufällige oder vorsätzliche Manipulationen, teilweisen oder vollständigen Verlust, Zerstörung oder
            gegen den unbefugten Zugriff Dritter zu schützen. Unsere Sicherheitsmaßnahmen werden entsprechend der
            technologischen Entwicklung fortlaufend verbessert.
          </p>

          <h2>Aktualität und Änderung dieser Datenschutzerklärung</h2>
          <p>Diese Datenschutzerklärung ist aktuell gültig und hat den Stand Mai 2018.</p>
          <p>
            Durch die Weiterentwicklung unserer Website und Angebote darüber oder aufgrund geänderter gesetzlicher
            beziehungsweise behördlicher Vorgaben kann es notwendig werden, diese Datenschutzerklärung zu ändern. Die
            jeweils aktuelle Datenschutzerklärung kann jederzeit auf der Website unter
            https://www.ersatzteilpartner24.de/datenschutz von Ihnen abgerufen und ausgedruckt werden.
          </p>
        </div>
      </div>
    </div>
  )
}
