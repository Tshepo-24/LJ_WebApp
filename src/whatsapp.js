export const WHATSAPP_NUMBER = "27798729049" // change if the WhatsApp number is different

export function whatsappLink(
  message = "Hi LJ Plant Hire, I would like to enquire about hiring a machine."
) {
  return `https://wa.me/${277982790499}?text=${encodeURIComponent(message)}`
}