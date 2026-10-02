{/*const steps = [
  {
    number: "01",
    title: "CHOOSE EQUIPMENT",
    text: "Browse our extensive fleet of excavators, , and TLBs to find the perfect match.",
  },
  {
    number: "02",
    title: "SUBMIT REQUEST",
    text: "Fill out our quick digital booking form with your project details and duration.",
  },
  {
    number: "03",
    title: "CONFIRM & DEPLOY",
    text: "Our team confirms availability within the hour and handles delivery to your site.",
  },
]

function RentalProcess() {
  return (
    <section className="bg-slate-900 py-20 px-8 md:px-16">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-black text-white mb-16">
          SEAMLESS <span className="text-amber-500">RENTAL</span> PROCESS
        </h2>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12">
        
          <div className="hidden md:block absolute top-8 left-0 right-0 h-px bg-slate-700 mx-24"></div>

          {steps.map((step) => (
            <div key={step.number} className="relative flex flex-col items-center">
              <div className="w-16 h-16 rounded-full border-2 border-amber-500 flex items-center justify-center text-amber-500 font-black text-lg bg-slate-900 relative z-10 mb-4">
                {step.number}
              </div>
              <h3 className="text-white font-bold tracking-wide mb-2">
                {step.title}
              </h3>
              <p className="text-slate-400 text-sm max-w-xs">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default RentalProcess*/}

import { Link } from "react-router-dom"
import Reveal, { useInView } from "./Reveal"

const steps = [
  {
    number: "01",
    title: "PICK YOUR MACHINE",
    text: "Browse our fleet and choose the machine that suits your job. Prices are shown per hour or per day.",
    to: "/equipment",
    linkText: "View the fleet",
  },
  {
    number: "02",
    title: "SEND YOUR REQUEST",
    text: "Tell us what you need, where your site is and for how long. The form only takes a few minutes.",
    to: "/contact",
    linkText: "Fill in the request form",
  },
  {
    number: "03",
    title: "WE CONFIRM & DELIVER",
    text: "Our team confirms availability within the hour and arranges delivery to your site.",
  },
]

const readyList = [
  "Your name or company name",
  "A phone number we can reach you on",
  "Your email address",
  "Your site location (town or farm name)",
  "Your start and end dates",
  "Then wait to hear from us"
]

function Step({ step, index, isLast }) {
  const [ref, inView] = useInView(0.2)
  const delay = index * 120

  return (
    <div
      ref={ref}
      className="group relative flex items-start gap-5 md:flex-col md:items-center md:gap-0 md:text-center"
    >
      {/* PHONE: line running down to the next circle */}
      {!isLast && (
        <span
          style={{ transitionDelay: `${delay + 300}ms` }}
          className={`absolute -bottom-10 left-8 top-16 w-0.5 origin-top -translate-x-1/2 bg-amber-500 transition-transform duration-700 ease-out motion-reduce:scale-y-100 motion-reduce:transition-none md:hidden ${
            inView ? "scale-y-100" : "scale-y-0"
          }`}
        ></span>
      )}

      {/* Circle pops in */}
      <div
        style={{ transitionDelay: `${delay}ms` }}
        className={`relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-amber-500 bg-slate-900 text-lg font-black text-amber-500 transition-all duration-500 ease-out group-hover:bg-amber-500 group-hover:text-slate-900 motion-reduce:scale-100 motion-reduce:opacity-100 motion-reduce:transition-none md:mb-5 ${
          inView ? "scale-100 opacity-100" : "scale-75 opacity-0"
        }`}
      >
        {step.number}
      </div>

      {/* Text fades in a moment later */}
      <div
        style={{ transitionDelay: `${delay + 200}ms` }}
        className={`min-w-0 transition-all duration-700 ease-out motion-reduce:translate-x-0 motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${
          inView
            ? "translate-x-0 translate-y-0 opacity-100"
            : "translate-x-4 opacity-0 md:translate-x-0 md:translate-y-4"
        }`}
      >
        <h3 className="mb-2 text-lg font-bold tracking-wide text-white">
          {step.title}
        </h3>
        <p className="max-w-xs text-sm leading-relaxed text-slate-400 md:mx-auto">
          {step.text}
        </p>
        {step.to && (
          <Link
            to={step.to}
            className="mt-3 inline-block text-sm font-bold text-amber-500 transition-colors hover:text-amber-400"
          >
            {step.linkText} →
          </Link>
        )}
      </div>
    </div>
  )
}

function RentalProcess() {
  const [gridRef, gridInView] = useInView(0.25)

  return (
    <section className="bg-slate-900 px-5 py-16 sm:px-8 md:px-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="mb-3 text-xs font-bold tracking-widest text-amber-500">
            HOW IT WORKS
          </p>
          <h2
            className="mb-4 max-w-3xl text-3xl font-black text-white sm:text-4xl md:text-5xl"
            style={{ fontFamily: "'Barlow', sans-serif" }}
          >
            HIRE A MACHINE IN{" "}
            <span className="text-amber-500">3 SIMPLE STEPS</span>
          </h2>
          <p className="mb-12 max-w-2xl text-slate-400 md:mb-16">
            Here is what happens, from your first click to a machine on your
            site.
          </p>
        </Reveal>

        <div
          ref={gridRef}
          className="relative grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8"
        >
          {/* DESKTOP: line that draws across once */}
          <div className="absolute left-[16.67%] right-[16.67%] top-8 hidden h-0.5 -translate-y-1/2 bg-slate-700 md:block">
            <div
              style={{ transitionDelay: "300ms" }}
              className={`h-full origin-left bg-amber-500 transition-transform duration-1000 ease-out motion-reduce:scale-x-100 motion-reduce:transition-none ${
                gridInView ? "scale-x-100" : "scale-x-0"
              }`}
            ></div>
          </div>

          {steps.map((step, index) => (
            <Step
              key={step.number}
              step={step}
              index={index}
              isLast={index === steps.length - 1}
            />
          ))}
        </div>

        <Reveal delay={100} className="mt-14 md:mt-16">
          <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 pt-7 backdrop-blur-sm sm:p-8 sm:pt-9">
            <span className="absolute left-0 top-0 h-1 w-12 bg-amber-500"></span>
            <p className="mb-4 text-xs font-bold tracking-widest text-slate-400">
              HAVE THESE READY BEFORE YOU START
            </p>
            <ul className="grid gap-x-8 gap-y-3 text-slate-200 sm:grid-cols-2 md:grid-cols-3">
              {readyList.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 bg-amber-500"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

      </div>
    </section>
  )
}

export default RentalProcess