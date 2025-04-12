import fs from "fs"
import path from "path"

export default function DebugPage() {
  const INQUIRIES_FILE = path.join(process.cwd(), "motor-inquiries.json")
  let fileContent = "Datei nicht gefunden"
  let fileExists = false

  if (fs.existsSync(INQUIRIES_FILE)) {
    fileExists = true
    fileContent = fs.readFileSync(INQUIRIES_FILE, "utf8")
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Debug-Seite</h1>
      <div className="mb-4">
        <strong>Datei existiert:</strong> {fileExists ? "Ja" : "Nein"}
      </div>
      <div>
        <strong>Dateiinhalt:</strong>
        <pre className="bg-gray-100 p-4 rounded mt-2 overflow-auto max-h-96">{fileContent}</pre>
      </div>
    </div>
  )
}
