export const config = {
  whatsapp: import.meta.env.VITE_WHATSAPP_NUMBER || "",
  email: import.meta.env.VITE_EMAIL || "",
  facebook: import.meta.env.VITE_FACEBOOK_URL || "",
  instagram: import.meta.env.VITE_INSTAGRAM_URL || "",
  tiktok: import.meta.env.VITE_TIKTOK_URL || "",
  maps: import.meta.env.VITE_GOOGLE_MAPS_URL || "",
  tcp: import.meta.env.VITE_TCP_URL || "https://www.tcpitsolution.in/"
};