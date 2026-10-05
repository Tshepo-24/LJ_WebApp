import { useLocation } from "react-router-dom"
import { whatsappLink } from "../whatsapp"

function WhatsAppButton() {
  const { pathname } = useLocation()
  if (pathname.startsWith("/admin")) return null

  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with LJ Plant Hire on WhatsApp"
      className="fixed bottom-4 right-4 z-40 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-bold text-white shadow-lg shadow-black/20 transition-colors hover:bg-[#1ebe5b] sm:bottom-6 sm:right-6"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
      </svg>
      <span>WhatsApp us</span>
    </a>
  )
}

export default WhatsAppButton