{/*import { useState, useEffect } from "react"
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
      {/* Logo: smaller on phones, bigger from md up 
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
        {/* DESKTOP links: hidden on phones 
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

        {/* HAMBURGER button: phones only 
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

      {/* PHONE MENU: drops down under the navbar 
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

export default Navbar*/}

import { useState, useEffect, useRef } from "react"
import { Link, useLocation } from "react-router-dom"

const links = [
  { to: "/equipment", label: "OUR FLEET" },
  { to: "/about", label: "ABOUT US" },
  { to: "/contact", label: "CONTACT" },
]

// A link with an amber line that slides in under it
function NavLink({ to, active, children }) {
  return (
    <Link
      to={to}
      className={`group relative py-2 text-sm font-bold tracking-wide transition-colors ${
        active ? "text-amber-500" : "text-slate-200 hover:text-white"
      }`}
    >
      {children}
      <span
        className={`absolute inset-x-0 -bottom-0.5 h-0.5 origin-left bg-amber-500 transition-transform duration-300 ${
          active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
        }`}
      ></span>
    </Link>
  )
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false) // slides away while scrolling down
  const [open, setOpen] = useState(false) // phone menu
  const lastY = useRef(0)
  const rootRef = useRef(null)
  const location = useLocation()

  const isHome = location.pathname === "/"
  const solid = scrolled || !isHome

  function isActive(path) {
    return (
      location.pathname === path || location.pathname.startsWith(path + "/")
    )
  }

  // Scroll: get more solid, hide on the way down, show on the way up
  useEffect(() => {
    function onScroll() {
      const y = window.scrollY
      setScrolled(y > 40)

      if (Math.abs(y - lastY.current) > 6) {
        if (y > lastY.current && y > 160) setHidden(true)
        else if (y < lastY.current) setHidden(false)
        lastY.current = y
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Close the phone menu when the page changes
  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  // Close the phone menu on Escape or when tapping outside it
  useEffect(() => {
    if (!open) return
    function onPointerDown(e) {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false)
    }
    function onKey(e) {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("pointerdown", onPointerDown)
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("pointerdown", onPointerDown)
      document.removeEventListener("keydown", onKey)
    }
  }, [open])

  return (
    <div
      ref={rootRef}
      className={`fixed inset-x-0 top-0 z-50 flex justify-center px-4 transition-transform duration-300 ease-out motion-reduce:transition-none ${
        hidden && !open ? "-translate-y-[160%]" : "translate-y-0"
      }`}
    >
      {/* Logo */}
      <Link
        to="/"
        className="relative z-10 mt-1 h-16 w-23 shrink-0 md:h-20 md:w-35"
      >
        <img
          src="/logo.png"
          alt="LJ Plant Hire"
          className="absolute left-0 top-1/2 h-24 w-auto max-w-none -translate-y-1/2 object-contain md:h-35"
        />
      </Link>

      {/* The bar: always dark glass, so the text is always readable */}
      <nav
        className={`mt-5 flex w-full max-w-4xl items-center justify-between rounded-full border border-white/10 px-3 backdrop-blur-xl transition-all duration-300 sm:px-4 lg:px-8 ${
          solid
            ? "bg-slate-900/90 shadow-lg shadow-black/30"
            : "bg-slate-900/50 shadow-md shadow-black/20"
        }`}
      >
        {/* Desktop: links on the left */}
        <div className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} active={isActive(link.to)}>
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Desktop: admin and booking on the right */}
        <div className="hidden items-center gap-5 lg:flex">
          <Link
            to="/admin/login"
            className="text-xs font-bold tracking-widest text-slate-400 transition-colors hover:text-white"
          >
            ADMIN
          </Link>
          <Link
            to="/contact"
            className="rounded-xl bg-amber-500 px-5 py-2 text-sm font-bold text-slate-900 transition-colors hover:bg-amber-400"
          >
            BOOK A MACHINE
          </Link>
        </div>

        {/* Phone and tablet: tap-to-call number */}
        <a
          href="tel:0729664090"
          className="pl-2 text-sm font-bold tracking-wide text-white transition-colors hover:text-amber-500 lg:hidden"
        >
          072 966 4090
        </a>

        {/* Phone and tablet: menu button */}
        <button
          type="button"
          className="p-3 text-white lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Phone menu */}
      <div
        aria-hidden={!open}
        className={`absolute left-4 right-4 top-full mt-2 overflow-hidden rounded-2xl border border-white/10 bg-slate-900/95 shadow-xl shadow-black/30 backdrop-blur-xl transition-all duration-300 lg:hidden ${
          open
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-2 opacity-0"
        }`}
      >
        <div className="p-2">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`flex items-center justify-between rounded-xl px-4 py-3.5 font-bold tracking-wide transition-colors ${
                isActive(link.to)
                  ? "bg-white/5 text-amber-500"
                  : "text-slate-200 hover:bg-white/5"
              }`}
            >
              {link.label}
              {isActive(link.to) && (
                <span className="h-2 w-2 rounded-full bg-amber-500"></span>
              )}
            </Link>
          ))}
        </div>

        <div className="border-t border-white/10 p-4">
          <Link
            to="/contact"
            className="block rounded-xl bg-amber-500 py-3.5 text-center font-bold text-slate-900 transition-colors hover:bg-amber-400"
          >
            BOOK A MACHINE
          </Link>
          <Link
            to="/admin/login"
            className="mt-4 block text-xs font-bold tracking-widest text-slate-400 hover:text-white"
          >
            ADMIN LOGIN
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar