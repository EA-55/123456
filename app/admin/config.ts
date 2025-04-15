// Konfigurationsdatei für den Admin-Bereich
// Verhindert zirkuläre Abhängigkeiten und Initialisierungsprobleme

export const adminConfig = {
  // Tabs-Konfiguration
  tabs: [
    { id: "inquiries", label: "Anfragen" },
    { id: "returns", label: "Rückgaben" },
    { id: "reklamationen", label: "Reklamationen" },
    { id: "popup", label: "Popup-Manager" },
  ],

  // API-Endpunkte
  api: {
    checkAuth: "/api/admin/check-auth",
    logout: "/api/admin/logout",
  },

  // Routing
  routes: {
    login: "/admin/login",
    dashboard: "/admin",
  },
}
