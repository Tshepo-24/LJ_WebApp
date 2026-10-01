import { useState, useEffect } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false) // phone menu open or closed
  const navigate = useNavigate()
  const location = useLocation()

  // Pages with a light background need the navbar to always be solid/dark
  const isLightPage = location.pathname !== "/"

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close the phone menu whenever the page changes
  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

   // Link colors: dark on bright pages, light on the dark home page
  const linkColor = isLightPage ? "text-slate-700" : "text-slate-300"
  const activeColor = isLightPage ? "text-amber-600" : "text-amber-500"
  const hoverColor = isLightPage ? "hover:text-amber-600" : "hover:text-amber-500"

  function scrollToSection(sectionId) {
    if (location.pathname === "/") {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
    } else {
      navigate("/")
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
      }, 100)
    }
  }

  function linkClasses(path) {
    const isActive = location.pathname === path
    return `
      text-sm font-bold tracking-wide transition-colors
      ${isActive ? "text-amber-500" : "hover:text-amber-500"}
    `
  }
 // Blurred background on ALL pages
 {/* const navBg = isLightPage
  ? "bg-white/10 backdrop-blur-m border border-slate-300 shadow-lg shadow-slate-900/10"
  : scrolled
  ? "bg-slate-900/50 backdrop-blur-md shadow-xl"
  : "bg-white/1 backdrop-blur-sm"*/}
// Same blurred glass look on ALL pages
const navBg =
  "bg-white/10 backdrop-blur-sm border border-slate-500 shadow-lg shadow-slate-900/50"


  const navSpacing =
    isLightPage || scrolled
      ? "max-w-4xl mt-5 px-6 py-0.1 rounded-full"
      : "max-w-full mt-4 px-8 py-0.1 rounded-full"

  // Text color for the hamburger icon
  const iconColor = isLightPage ? "text-slate-900" : "text-slate-900";

  // Phone dropdown menu colors
  const menuBg = isLightPage
  ? "bg-white/90 text-slate-900 border border-slate-300"
  : "bg-slate-900/70 text-white"
const menuHover = isLightPage ? "hover:bg-slate-900/10" : "hover:bg-white/10"




  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-300 px-4 pt-0">
      {/* Logo: smaller on phones, bigger from md up */}
      <Link to="/" className="relative shrink-0 w-23 h-16 md:w-35 md:h-20 mt-1 z-10">
        <img
          src="/logo.png"
          alt="LJ Plant Hire"
          className="absolute left-0 top-1/2 -translate-y-1/2 h-24 md:h-35 w-auto max-w-none object-contain"
        />
      </Link>

      <nav
        className={`
          flex items-center justify-end w-full text-white
          transition-all duration-300 ease-in-out
          ${navBg} ${navSpacing}
        `}
      >
        {/* DESKTOP links: hidden on phones */}
        <div className="hidden md:flex font-black text-slate-900 items-center gap-8">
          <Link to="/equipment" className={linkClasses("/equipment")}>
            OUR FLEET
          </Link>
          <Link to="/contact" className={linkClasses("/contact")}>
            CONTACT
          </Link>
          <Link to="/about" className={linkClasses("/about")}>
            ABOUT US
          </Link>
          <Link
            to="/admin/login"
            className="bg-amber-500 text-slate-900 font-bold px-5 py-2 rounded-xl text-sm hover:bg-amber-400 transition-colors"
          >
            ADMIN
          </Link>
        </div>

        {/* HAMBURGER button: phones only */}
        <button
          type="button"
          className={`md:hidden p-3 ${iconColor}`}
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? (
            // X icon
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          ) : (
            // Hamburger icon
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
        </button>
      </nav>

      {/* PHONE MENU: drops down under the navbar */}
      {open && (
        <div className="md:hidden absolute top-full left-4 right-4 mt-2 rounded-2xl bg-slate-900/95 backdrop-blur-md shadow-xl p-4 flex flex-col gap-1 text-white">
          <Link to="/equipment" className="px-4 py-3 rounded-xl font-bold hover:bg-slate-800">
            OUR FLEET
          </Link>
          <Link to="/contact" className="px-4 py-3 rounded-xl font-bold hover:bg-slate-800">
            CONTACT
          </Link>
          <Link to="/about" className= "px-4 py-3 rounded-xl font-bold hover:bg-slate-800">
            ABOUT US
          </Link>
          <Link
            to="/admin/login"
            className="mt-2 bg-amber-500 text-slate-900 font-bold text-center px-5 py-3 rounded-xl hover:bg-amber-400"
          >
            ADMIN
          </Link>
        </div>
      )}
    </div>
  )
}

export default Navbar