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
    ready: [
      "Your name or company name",
      "A phone number we can reach you on",
      "Your email address",
      "Your site location (town or farm name)",
      "Your start and end dates",
    ],
  },
  {
    number: "03",
    title: "WE CONFIRM & DELIVER",
    text: "Our team confirms availability within the hour and arranges delivery to your site.",
    note: "Then wait to hear from us.",
  },
]

// Each step starts a little lower than the one before it (desktop only)
const offsets = ["", "md:mt-10", "md:mt-20"]

function Step({ step, index }) {
  const [ref, inView] = useInView(0.2)
  const delay = index * 150

  return (
    <div ref={ref} className={`pb-10 md:pb-0 ${offsets[index] || ""}`}>
      {/* Amber rule that draws across once */}
      <div className="h-0.5 bg-white/15">
        <div
          style={{ transitionDelay: `${delay}ms` }}
          className={`h-full origin-left bg-amber-500 transition-transform duration-1000 ease-out motion-reduce:scale-x-100 motion-reduce:transition-none ${
            inView ? "scale-x-100" : "scale-x-0"
          }`}
        ></div>
      </div>

      <div
        style={{ transitionDelay: `${delay + 300}ms` }}
        className={`pt-6 transition-all duration-700 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${
          inView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        <span
          className="block text-6xl font-bold leading-none text-amber-500 sm:text-7xl"
          style={{ fontFamily: "'Barlow', sans-serif" }}
        >
          {step.number}
        </span>

        <h3
          className="mt-4 text-2xl font-bold uppercase leading-tight tracking-wide text-white sm:text-3xl"
          style={{ fontFamily: "'Barlow', sans-serif" }}
        >
          {step.title}
        </h3>

        <p className="mt-3 max-w-sm leading-relaxed text-slate-400">
          {step.text}
        </p>

        {step.ready && (
          <div className="mt-5 border-t border-white/15 pt-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-slate-400">
              Have these ready
            </p>
            <ul className="space-y-1.5 text-sm text-slate-200">
              {step.ready.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-amber-500"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {step.note && (
          <p className="mt-5 border-l-4 border-amber-500 pl-3 text-sm font-semibold text-slate-200">
            {step.note}
          </p>
        )}

        {step.to && (
          <Link
            to={step.to}
            className="mt-5 inline-block text-sm font-bold text-white underline decoration-amber-500 decoration-2 underline-offset-4 transition-colors hover:text-amber-500"
          >
            {step.linkText}
          </Link>
        )}
      </div>
    </div>
  )
}

function RentalProcess() {
  return (
    <section className="bg-slate-900 px-5 py-16 text-white sm:px-8 md:px-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-amber-500">
            How it works
          </p>
          <h2
            className="max-w-3xl text-4xl font-bold uppercase leading-[1.02] tracking-wide sm:text-5xl lg:text-6xl"
            style={{ fontFamily: "'Barlow', sans-serif" }}
          >
            Hire a machine in 3 simple steps
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-400">
            Here is what happens, from your first click to a machine on your
            site.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-2 md:mt-16 md:grid-cols-3 md:items-start md:gap-10">
          {steps.map((step, index) => (
            <Step key={step.number} step={step} index={index} />
          ))}
        </div>

        {/* Closing line */}
        <Reveal className="mt-12 md:mt-20">
          <div className="flex flex-col gap-3 border-t border-white/15 pt-6 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                Prefer to talk it through?
              </p>
              <a
                href="tel:0729664090"
                className="block text-4xl font-bold tracking-wide text-white transition-colors hover:text-amber-500 sm:text-5xl"
                style={{ fontFamily: "'Barlow', sans-serif" }}
              >
                072 966 4090
              </a>
            </div>
            <p className="max-w-xs text-sm text-slate-400">
              Call and we will help you choose the right machine for the job.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default RentalProcess