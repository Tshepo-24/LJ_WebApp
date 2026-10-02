{/*function HeroSection() {
  return (
    <section className="bg-slate-900 min-h-screen flex items-center px-6 sm:px-8 md:px-16 pt-28 pb-16 md:pt-0 md:pb-0 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/hero-excavator.jpg')] bg-cover bg-center opacity-30"></div>

      <div className="relative z-10 w-full max-w-3xl md:mt-10">
        <span className="inline-block border border-slate-600 text-amber-500 text-xs font-black tracking-widest px-3 py-1 rounded-full mb-6">
          RELIABLE EQUIPMENT FOR HIRE .
        </span>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight mb-5 text-white">
          HEAVY <span className="text-amber-500">POWER.</span>{" "}
          <br className="hidden sm:block" />
          PRESTIGE <span className="text-amber-500">SERVICE.</span>
        </h1>

        <p className="text-slate-300 font-semilight mb-8 max-w-lg text-base sm:text-lg">
          Reliable construction and mining equipment hire in Tzaneen.
          Premium machinery, maintained to the highest industrial standards delivered across South Africa.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="/equipment"
            className="bg-amber-500 text-slate-900 font-bold px-6 py-3 rounded-lg text-center hover:bg-amber-700 transition-colors"
          >
            BROWSE OUR FLEET
          </a>
          <a
            href="/contact"
            className="border border-white text-white font-bold px-6 py-3 rounded-lg text-center hover:bg-white hover:text-slate-900 transition-colors"
          >
            BOOK OUR FLEET
          </a>
        </div>
      </div>
    </section>
  )
}

export default HeroSection*/}

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

// Fades and rises into place. Plays once, when the page loads.
function Rise({ show, delay = 0, as: Tag = "div", className = "", children }) {
  return (
    <Tag
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${
        show ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      } ${className}`}
    >
      {children}
    </Tag>
  )
}

const facts = [
  { label: "BASED IN", value: "Tzaneen, Limpopo" },
  { label: "HIRE RATES", value: "By the hour or day" },
  { label: "DELIVERY", value: "Across South Africa" },
]

function HeroSection() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const id = setTimeout(() => setLoaded(true), 60)
    return () => clearTimeout(id)
  }, [])

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-slate-900 px-6 pb-16 pt-28 sm:px-8 md:px-16 md:pb-32 md:pt-24">
      {/* Photo: slowly settles into place when the page loads */}
      <div
        className={`absolute inset-0 bg-[url('/hero-excavator.jpg')] bg-cover bg-center transition-transform duration-[2500ms] ease-out motion-reduce:transition-none ${
          loaded ? "scale-100" : "scale-110"
        }`}
      ></div>

      {/* Dark overlays so the text is easy to read */}
      <div className="absolute inset-0 bg-slate-950/50 md:bg-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/60 to-slate-900/10"></div>
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-900 to-transparent"></div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <div className="max-w-3xl">
          <Rise show={loaded} delay={100}>
            <p className="mb-6 flex items-center gap-3 text-xs font-bold tracking-widest text-amber-500">
              <span className="h-0.5 w-8 bg-amber-500"></span>
              RELIABLE EQUIPMENT FOR HIRE
            </p>
          </Rise>

          <h1
            className="mb-6 text-4xl font-black leading-[1.05] text-white sm:text-5xl md:text-6xl lg:text-7xl"
            style={{ fontFamily: "'Barlow', sans-serif" }}
          >
            <Rise show={loaded} delay={250} as="span" className="block">
              HEAVY <span className="text-amber-500">POWER.</span>
            </Rise>
            <Rise show={loaded} delay={400} as="span" className="block">
              PRESTIGE <span className="text-amber-500">SERVICE.</span>
            </Rise>
          </h1>

          <Rise show={loaded} delay={550}>
            <p className="mb-8 max-w-xl text-base font-light leading-relaxed text-slate-200 sm:text-lg">
              Reliable construction and mining equipment hire in Tzaneen.
              Premium machinery, maintained to the highest industrial
              standards, delivered across South Africa.
            </p>
          </Rise>

          <Rise show={loaded} delay={700}>
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
              <Link
                to="/equipment"
                className="rounded-lg bg-amber-500 px-8 py-4 text-center font-bold text-slate-900 transition-colors hover:bg-amber-400"
              >
                BROWSE THE FLEET
              </Link>
              <Link
                to="/contact"
                className="rounded-lg border border-white/70 px-8 py-4 text-center font-bold text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-slate-900"
              >
                BOOK A MACHINE
              </Link>
            </div>
          </Rise>
        </div>
      </div>

      {/* Facts strip along the bottom (hidden on phones to keep it short) */}
      <div
        style={{ transitionDelay: "900ms" }}
        className={`absolute inset-x-0 bottom-0 z-10 hidden border-t border-white/10 bg-slate-950/50 px-16 backdrop-blur-sm transition-opacity duration-700 motion-reduce:opacity-100 motion-reduce:transition-none md:block ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="mx-auto grid max-w-6xl grid-cols-3 py-5">
          {facts.map((fact) => (
            <div
              key={fact.label}
              className="border-l border-white/10 pl-6 first:border-l-0 first:pl-0"
            >
              <p className="mb-1 text-xs font-bold tracking-widest text-slate-400">
                {fact.label}
              </p>
              <p className="font-bold text-white">{fact.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HeroSection