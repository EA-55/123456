#!/bin/bash
# Deployment-Checkliste als ausführbares Skript

# Farben für die Ausgabe
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}=== ErsatzteilPartner24 Deployment-Checkliste ===${NC}"
echo "Dieses Skript führt Sie durch die wichtigsten Schritte vor einem Deployment."
echo ""

# Funktion zur Abfrage von Ja/Nein-Fragen
ask_yes_no() {
  while true; do
    read -p "$1 (j/n): " yn
    case $yn in
      [Jj]* ) return 0;;
      [Nn]* ) return 1;;
      * ) echo "Bitte mit j oder n antworten.";;
    esac
  done
}

# 1. Code-Qualität
echo -e "${YELLOW}1. Code-Qualität${NC}"

if ask_yes_no "Wurden alle lokalen Tests durchgeführt?"; then
  echo -e "${GREEN}✓ Tests wurden durchgeführt${NC}"
else
  echo -e "${RED}✗ Bitte führen Sie alle Tests durch, bevor Sie fortfahren${NC}"
  exit 1
fi

if ask_yes_no "Ist die TypeScript-Kompilierung fehlerfrei?"; then
  echo -e "${GREEN}✓ TypeScript-Kompilierung ist fehlerfrei${NC}"
else
  echo -e "${RED}✗ Bitte beheben Sie alle TypeScript-Fehler, bevor Sie fortfahren${NC}"
  exit 1
fi

# 2. Umgebungsvariablen
echo -e "\n${YELLOW}2. Umgebungsvariablen${NC}"

REQUIRED_VARS=(
  "SUPABASE_URL"
  "SUPABASE_ANON_KEY"
  "SUPABASE_SERVICE_ROLE_KEY"
  "NEXT_PUBLIC_SUPABASE_URL"
  "NEXT_PUBLIC_SUPABASE_ANON_KEY"
  "EMAIL_PASS"
  "SMTP_HOST"
  "SMTP_USER"
  "SMTP_PASS"
  "SMTP_PORT"
  "NEXT_PUBLIC_APP_URL"
  "NEXTAUTH_SECRET"
  "NEXT_PUBLIC_ADMIN_USERNAME"
  "NEXT_PUBLIC_ADMIN_PASSWORD"
  "JWT_SECRET"
  "NEXTAUTH_URL"
  "ADMIN_USERNAME"
  "ADMIN_PASSWORD"
  "NEXT_PUBLIC_IMAGE_PROXY_ENABLED"
)

echo "Überprüfung der erforderlichen Umgebungsvariablen in Vercel:"
for var in "${REQUIRED_VARS[@]}"; do
  if ask_yes_no "Ist $var in Vercel konfiguriert?"; then
    echo -e "${GREEN}✓ $var ist konfiguriert${NC}"
  else
    echo -e "${RED}✗ $var fehlt. Bitte konfigurieren Sie diese Variable in Vercel${NC}"
    exit 1
  fi
done

# 3. Datenbank
echo -e "\n${YELLOW}3. Datenbank${NC}"

if ask_yes_no "Ist die Supabase-Datenbank korrekt konfiguriert?"; then
  echo -e "${GREEN}✓ Supabase-Datenbank ist konfiguriert${NC}"
else
  echo -e "${RED}✗ Bitte konfigurieren Sie die Supabase-Datenbank, bevor Sie fortfahren${NC}"
  exit 1
fi

REQUIRED_TABLES=(
  "motor_inquiries"
  "contacts"
  "b2b_registrations"
  "returns"
  "complaints"
  "complaint_items"
  "complaint_vehicle_data"
)

echo "Überprüfung der erforderlichen Datenbanktabellen:"
for table in "${REQUIRED_TABLES[@]}"; do
  if ask_yes_no "Existiert die Tabelle $table?"; then
    echo -e "${GREEN}✓ Tabelle $table existiert${NC}"
  else
    echo -e "${RED}✗ Tabelle $table fehlt. Bitte erstellen Sie diese Tabelle in Supabase${NC}"
    exit 1
  fi
done

# 4. Performance
echo -e "\n${YELLOW}4. Performance${NC}"

if ask_yes_no "Wurden alle Bilder optimiert?"; then
  echo -e "${GREEN}✓ Bilder wurden optimiert${NC}"
else
  echo -e "${RED}✗ Bitte optimieren Sie alle Bilder, bevor Sie fortfahren${NC}"
  exit 1
fi

if ask_yes_no "Wurde der Lighthouse-Score überprüft?"; then
  echo -e "${GREEN}✓ Lighthouse-Score wurde überprüft${NC}"
else
  echo -e "${YELLOW}⚠ Es wird empfohlen, den Lighthouse-Score zu überprüfen${NC}"
fi

# 5. Sicherheit
echo -e "\n${YELLOW}5. Sicherheit${NC}"

if ask_yes_no "Sind alle API-Routen geschützt?"; then
  echo -e "${GREEN}✓ API-Routen sind geschützt${NC}"
else
  echo -e "${RED}✗ Bitte schützen Sie alle API-Routen, bevor Sie fortfahren${NC}"
  exit 1
fi

if ask_yes_no "Ist der Admin-Bereich durch Authentifizierung geschützt?"; then
  echo -e "${GREEN}✓ Admin-Bereich ist geschützt${NC}"
else
  echo -e "${RED}✗ Bitte schützen Sie den Admin-Bereich, bevor Sie fortfahren${NC}"
  exit 1
fi

# 6. SEO
echo -e "\n${YELLOW}6. SEO${NC}"

if ask_yes_no "Haben alle Seiten korrekte Meta-Tags?"; then
  echo -e "${GREEN}✓ Meta-Tags sind korrekt${NC}"
else
  echo -e "${YELLOW}⚠ Es wird empfohlen, alle Meta-Tags zu überprüfen${NC}"
fi

if ask_yes_no "Ist die sitemap.xml aktuell?"; then
  echo -e "${GREEN}✓ sitemap.xml ist aktuell${NC}"
else
  echo -e "${YELLOW}⚠ Es wird empfohlen, die sitemap.xml zu aktualisieren${NC}"
fi

# Zusammenfassung
echo -e "\n${YELLOW}=== Zusammenfassung ===${NC}"
echo -e "${GREEN}✓ Alle kritischen Überprüfungen wurden bestanden!${NC}"
echo -e "Sie können jetzt mit dem Deployment fortfahren."
echo ""
echo "Vergessen Sie nicht, nach dem Deployment die folgenden Schritte durchzuführen:"
echo "1. Überprüfen Sie, ob alle Seiten korrekt geladen werden"
echo "2. Testen Sie alle wichtigen Funktionen"
echo "3. Überprüfen Sie die mobile Ansicht"
echo "4. Führen Sie das Verifikationsskript aus: node scripts/deployment-verification.js"
echo ""
echo -e "${YELLOW}Viel Erfolg beim Deployment!${NC}"
