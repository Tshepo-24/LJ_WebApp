import { useState, useEffect } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
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

  // Force solid dark navbar on light pages, otherwise use the existing scroll behavior
  const navBg =
    isLightPage || scrolled
      ? "bg-slate-900/95  backdrop-blur-md shadow-xl"
      : "bg-white/1 backdrop-blur-sm"

  const navSpacing =
    isLightPage || scrolled
      ? "max-w-4xl mt-5 px-6 py-0.1 rounded-full"
      : "max-w-full mt-4 px-8 py-0.1 rounded-full"

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-300 px-4  pt-0">
      <Link to="/" className="relative shrink-0 w-35 h-20 mt-1 z-10">
 
  <img
    src="/logo.png"
    alt="LJ Plant Hire"
    className="absolute left-0 top-1/2 -translate-y-1/2 h-35 w-auto max-w-none object-contain"
  />
 
</Link>
     
      <nav
        className={`
          flex items-center justify-end w-full text-white
          transition-all duration-300 ease-in-out
          ${navBg} ${navSpacing}
        `}
      >


        <div className="hidden md:flex text-slate-300 items-center gap-8">
          <Link to="/equipment" className={linkClasses("/equipment")}>
            OUR FLEET
          </Link>
          <Link to="/contact" className={linkClasses("/contact")}>
            CONTACT
          </Link>
         
       

        <Link
          to="/admin/login"
          className="bg-amber-500 text-slate-900 font-bold px-5 py-2 rounded-xl text-sm hover:bg-amber-400 transition-colors"
        >
          ADMIN
        </Link>
         </div>
      </nav>
    </div>
  )
}

export default Navbar