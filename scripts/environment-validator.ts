/**
 * Umgebungsvariablen-Validator
 *
 * Dieses Skript überprüft, ob alle erforderlichen Umgebungsvariablen
 * vorhanden und korrekt formatiert sind.
 */

// Erforderliche Umgebungsvariablen und ihre Validierungsregeln
const REQUIRED_VARIABLES = [
  {
    name: "SUPABASE_URL",
    required: true,
    validator: (value: string) => value.startsWith("https://") && value.includes(".supabase.co"),
  },
  {
    name: "SUPABASE_ANON_KEY",
    required: true,
    validator: (value: string) => value.length > 20,
  },
  {
    name: "SUPABASE_SERVICE_ROLE_KEY",
    required: true,
    validator: (value: string) => value.length > 20,
  },
  {
    name: "NEXT_PUBLIC_SUPABASE_URL",
    required: true,
    validator: (value: string) => value.startsWith("https://") && value.includes(".supabase.co"),
  },
  {
    name: "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    required: true,
    validator: (value: string) => value.length > 20,
  },
  {
    name: "EMAIL_PASS",
    required: true,
    validator: (value: string) => value.length > 0,
  },
  {
    name: "SMTP_HOST",
    required: true,
    validator: (value: string) => value.includes("."),
  },
  {
    name: "SMTP_USER",
    required: true,
    validator: (value: string) => value.includes("@"),
  },
  {
    name: "SMTP_PASS",
    required: true,
    validator: (value: string) => value.length > 0,
  },
  {
    name: "SMTP_PORT",
    required: true,
    validator: (value: string) => !isNaN(Number.parseInt(value)),
  },
  {
    name: "NEXT_PUBLIC_APP_URL",
    required: true,
    validator: (value: string) => value.startsWith("http"),
  },
  {
    name: "NEXTAUTH_SECRET",
    required: true,
    validator: (value: string) => value.length > 10,
  },
  {
    name: "NEXT_PUBLIC_ADMIN_USERNAME",
    required: true,
    validator: (value: string) => value.length > 0,
  },
  {
    name: "NEXT_PUBLIC_ADMIN_PASSWORD",
    required: true,
    validator: (value: string) => value.length > 0,
  },
  {
    name: "JWT_SECRET",
    required: true,
    validator: (value: string) => value.length > 10,
  },
  {
    name: "NEXTAUTH_URL",
    required: true,
    validator: (value: string) => value.startsWith("http"),
  },
  {
    name: "ADMIN_USERNAME",
    required: true,
    validator: (value: string) => value.length > 0,
  },
  {
    name: "ADMIN_PASSWORD",
    required: true,
    validator: (value: string) => value.length > 0,
  },
  {
    name: "NEXT_PUBLIC_IMAGE_PROXY_ENABLED",
    required: true,
    validator: (value: string) => value === "true" || value === "false",
  },
]

/**
 * Validiert eine einzelne Umgebungsvariable
 */
function validateVariable(variable: {
  name: string
  required: boolean
  validator: (value: string) => boolean
}): { valid: boolean; message: string } {
  const value = process.env[variable.name]

  // Überprüfe, ob die Variable existiert
  if (!value) {
    if (variable.required) {
      return {
        valid: false,
        message: `❌ ${variable.name} ist erforderlich, aber nicht definiert`,
      }
    } else {
      return {
        valid: true,
        message: `⚠️ ${variable.name} ist nicht definiert, aber optional`,
      }
    }
  }

  // Überprüfe, ob die Variable den Validierungsregeln entspricht
  if (!variable.validator(value)) {
    return {
      valid: false,
      message: `❌ ${variable.name} hat ein ungültiges Format`,
    }
  }

  return {
    valid: true,
    message: `✅ ${variable.name} ist korrekt konfiguriert`,
  }
}

/**
 * Hauptfunktion zur Validierung aller Umgebungsvariablen
 */
function validateEnvironment(): boolean {
  console.log("🔍 Überprüfe Umgebungsvariablen...")

  let allValid = true

  for (const variable of REQUIRED_VARIABLES) {
    const result = validateVariable(variable)
    console.log(result.message)

    if (!result.valid) {
      allValid = false
    }
  }

  console.log("\n📊 Validierungsergebnis:")
  if (allValid) {
    console.log("✅ Alle Umgebungsvariablen sind korrekt konfiguriert!")
  } else {
    console.error("❌ Einige Umgebungsvariablen sind nicht korrekt konfiguriert. Bitte überprüfe die Fehler.")
  }

  return allValid
}

// Führe die Validierung aus
const isValid = validateEnvironment()

if (!isValid) {
  console.error("❌ Die Umgebungsvariablen müssen korrigiert werden, bevor das Deployment fortgesetzt werden kann.")
  process.exit(1)
} else {
  console.log("✅ Umgebungsvariablen-Validierung erfolgreich abgeschlossen.")
}
