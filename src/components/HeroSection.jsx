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

// Animation component
function Rise({
  show,
  delay = 0,
  as: Tag = "div",
  className = "",
  children,
}) {
  return (
    <Tag
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out
        motion-reduce:translate-y-0
        motion-reduce:opacity-100
        motion-reduce:transition-none
        ${
          show
            ? "translate-y-0 opacity-100"
            : "translate-y-6 opacity-0"
        }
        ${className}`}
    >
      {children}
    </Tag>
  )
}

const facts = [
  {
    label: "BASED IN",
    value: "Tzaneen, Limpopo",
  },
  {
    label: "HIRE RATES",
    value: "By the hour or day",
  },
  {
    label: "DELIVERY",
    value: "Across South Africa",
  },
]

function HeroSection() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const id = setTimeout(() => setLoaded(true), 60)

    return () => clearTimeout(id)
  }, [])

  return (
    <section
      className="
        relative
        flex
        min-h-screen
        flex-col
        overflow-hidden
        bg-slate-900
        px-5
        pt-28
        pb-6

        sm:px-8
        sm:pt-32

        md:px-16
        md:pt-24
        md:pb-0
      "
    >

      {/* BACKGROUND IMAGE */}
      <div
        className={`
          absolute inset-0
          bg-[url('/hero-excavator.jpg')]
          bg-cover
          bg-center
          transition-transform
          duration-[2500ms]
          ease-out
          motion-reduce:transition-none
          ${
            loaded
              ? "scale-100"
              : "scale-110"
          }
        `}
      ></div>

{/* PREMIUM DARK OVERLAY */}
<div className="absolute inset-0 bg-slate-950/35"></div>

{/* Stronger darkness behind the text */}
<div
  className="
    absolute
    inset-0
    bg-gradient-to-r
    from-slate-950/95
    via-slate-950/70
    via-45%
    to-slate-950/10
  "
></div>

{/* Extra mobile readability */}
<div
  className="
    absolute
    inset-0
    bg-gradient-to-b
    from-slate-950/30
    via-transparent
    to-slate-950/75

    md:from-transparent
    md:to-slate-950/70
  "
></div>

{/* Soft shadow directly behind the hero content */}
<div
  className="
    absolute
    left-0
    top-0
    bottom-0
    w-full
    md:w-[65%]
    bg-gradient-to-r
    from-slate-950/40
    to-transparent
    blur-2xl
  "
></div>

      {/* BOTTOM DARK GRADIENT */}
      <div
        className="
          absolute
          inset-x-0
          bottom-0
          h-48
          bg-gradient-to-t
          from-slate-950
          to-transparent
        "
      ></div>


      {/* MAIN CONTENT */}
      <div
        className="
          relative
          z-10
          mx-auto
          flex
          w-full
          max-w-6xl
          flex-1
          flex-col
          justify-center

          md:justify-center
        "
      >

        <div className="max-w-3xl">

          {/* SMALL TITLE */}
          <Rise show={loaded} delay={100}>
            <p
              className="
                mb-5
                flex
                items-center
                gap-3
                text-[10px]
                font-bold
                tracking-[0.18em]
                text-amber-500

                sm:text-xs
              "
            >
              <span className="h-0.5 w-7 bg-amber-500 sm:w-8"></span>

              RELIABLE EQUIPMENT FOR HIRE
            </p>
          </Rise>


          {/* MAIN HEADING */}
          <h1
            className="
              mb-5
              text-4xl
              font-black
              leading-[1.02]
              text-white

              sm:text-5xl

              md:text-6xl

              lg:text-7xl
            "
            style={{
              fontFamily: "'Barlow', sans-serif",
            }}
          >

            <Rise
              show={loaded}
              delay={250}
              as="span"
              className="block"
            >
              HEAVY{" "}
              <span className="text-amber-500">
                POWER.
              </span>
            </Rise>

            <Rise
              show={loaded}
              delay={400}
              as="span"
              className="block"
            >
              PRESTIGE{" "}
              <span className="text-amber-500">
                SERVICE.
              </span>
            </Rise>

          </h1>


          {/* DESCRIPTION */}
          <Rise show={loaded} delay={550}>

            <p
              className="
                mb-6
                max-w-xl
                text-sm
                font-light
                leading-relaxed
                text-slate-200

                sm:mb-8
                sm:text-lg
              "
            >
              Reliable construction and mining equipment
              hire in Tzaneen. Premium machinery,
              maintained to the highest industrial
              standards, delivered across South Africa.
            </p>

          </Rise>


          {/* BUTTONS */}
          <Rise show={loaded} delay={700}>

            <div
              className="
                flex
                flex-col
                gap-3

                sm:flex-row
                sm:gap-4
              "
            >

              <Link
                to="/equipment"
                className="
                  w-full
                  rounded-lg
                  bg-amber-500
                  px-6
                  py-3.5
                  text-center
                  text-sm
                  font-bold
                  text-slate-900
                  transition-colors
                  hover:bg-amber-400

                  sm:w-auto
                  sm:px-8
                  sm:py-4
                  sm:text-base
                "
              >
                BROWSE THE FLEET
              </Link>


              <Link
                to="/contact"
                className="
                  w-full
                  rounded-lg
                  border
                  border-white/70
                  px-6
                  py-3.5
                  text-center
                  text-sm
                  font-bold
                  text-white
                  backdrop-blur-sm
                  transition-colors
                  hover:bg-white
                  hover:text-slate-900

                  sm:w-auto
                  sm:px-8
                  sm:py-4
                  sm:text-base
                "
              >
                BOOK A MACHINE
              </Link>

            </div>

          </Rise>

        </div>

      </div>


      {/* FACTS */}
      <div
        style={{
          transitionDelay: "900ms",
        }}
        className={`
          relative
          z-10
          mt-8
          w-full
          border-t
          border-white/10
          bg-slate-950/50
          backdrop-blur-sm
          transition-opacity
          duration-700

          md:mx-auto
          md:mt-8
          md:max-w-6xl

          ${
            loaded
              ? "opacity-100"
              : "opacity-0"
          }
        `}
      >

        <div
          className="
            grid
            grid-cols-3
            divide-x
            divide-white/10
            py-4

            sm:py-5
          "
        >

          {facts.map((fact) => (

            <div
              key={fact.label}
              className="
                px-2

                sm:px-4

                md:pl-6
                md:first:pl-0
              "
            >

              <p
                className="
                  mb-1
                  text-[8px]
                  font-bold
                  tracking-wider
                  text-slate-400

                  sm:text-[10px]
                  md:text-xs
                "
              >
                {fact.label}
              </p>

              <p
                className="
                  text-[10px]
                  font-bold
                  leading-tight
                  text-white

                  sm:text-xs

                  md:text-base
                "
              >
                {fact.value}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  )
}

export default HeroSection