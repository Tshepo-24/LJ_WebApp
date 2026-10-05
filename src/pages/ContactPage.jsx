import { API_BASE } from "../api"
import { useState, useEffect, useRef } from "react"
import { useSearchParams } from "react-router-dom"
import Reveal from "../components/Reveal"
import { whatsappLink } from "../whatsapp"

const emptyForm = (equipmentId = "") => ({
  name: "",
  phone: "",
  email: "",
  equipmentType: equipmentId,
  siteLocation: "",
  startDate: "",
  endDate: "",
})

// Today's date in the visitor's own time zone, as yyyy-mm-dd
function getToday() {
  const d = new Date()
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset())
  return d.toISOString().split("T")[0]
}

const inputClass =
  "w-full min-w-0 rounded-sm border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"

const labelClass =
  "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-600"

function Field({ id, label, children }) {
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      {children}
    </div>
  )
}

function Group({ title, children }) {
  return (
    <div>
      <p className="mb-5 border-b border-slate-200 pb-2 text-xs font-bold uppercase tracking-widest text-slate-900">
        {title}
      </p>
      <div className="space-y-5">{children}</div>
    </div>
  )
}

function ContactPage() {
  const [searchParams] = useSearchParams()
  const [formData, setFormData] = useState(
    emptyForm(searchParams.get("equipment") || "")
  )
  const [equipmentList, setEquipmentList] = useState([])
  const [equipmentFailed, setEquipmentFailed] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [result, setResult] = useState(null) // set when the request was sent
  const submittingRef = useRef(false)
  const sheetRef = useRef(null)
  const today = getToday()

  useEffect(() => {
    fetch(`${API_BASE}/api/equipment`)
      .then((response) => {
        if (!response.ok) throw new Error("Failed to load equipment")
        return response.json()
      })
      .then((data) => setEquipmentList(data))
      .catch(() => setEquipmentFailed(true))
  }, [])

  // After a successful request, bring the confirmation into view
  useEffect(() => {
    if (result) {
      sheetRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }, [result])

  function handleChange(e) {
    const { name, value } = e.target
    setFormData((prev) => {
      const next = { ...prev, [name]: value }
      // If the start date moves past the end date, clear the end date
      if (name === "startDate" && next.endDate && next.endDate < value) {
        next.endDate = ""
      }
      return next
    })
  }

  function handleSubmit(e) {
    e.preventDefault()

    // If a request is already being sent, ignore extra clicks
    if (submittingRef.current) return
    submittingRef.current = true
    setIsSubmitting(true)
    setError("")

    const payload = {
      equipmentId: Number(formData.equipmentType),
      customerName: formData.name,
      customerPhone: formData.phone,
      customerEmail: formData.email,
      siteLocation: formData.siteLocation,
      startDate: formData.startDate,
      endDate: formData.endDate,
    }

    fetch(`${API_BASE}/api/bookings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Booking failed")
        return response.json()
      })
      .then((data) => {
        setResult({ reference: data.referenceToken })
        setFormData(emptyForm())
      })
      .catch(() => {
        setError("failed")
      })
      .finally(() => {
        // Always unlock, whether it worked or failed
        submittingRef.current = false
        setIsSubmitting(false)
      })
  }

  return (
    <main className="min-h-screen xl:grid xl:grid-cols-2">
      {/* LEFT: heading and contact details */}
      <section className="bg-slate-900 px-5 pb-10 pt-32 sm:px-8 xl:px-12 xl:pb-24 xl:pt-44">
        <Reveal className="mx-auto w-full max-w-2xl xl:ml-auto xl:mr-0 xl:max-w-xl">
          <p className="mb-3 flex items-center gap-3 text-xs font-bold tracking-widest text-amber-500">
            <span className="h-0.5 w-8 bg-amber-500"></span>
            BOOKINGS AND ENQUIRIES
          </p>
          <h1
            className="text-4xl font-bold uppercase leading-[1.05] tracking-wide text-white sm:text-5xl xl:text-6xl"
            style={{ fontFamily: "'Barlow', sans-serif" }}
          >
            Request a machine
          </h1>
          <p className="mt-5 max-w-md leading-relaxed text-slate-300">
            Tell us what you need and where your site is. We check availability
            and contact you to confirm. Once confirmed, our machines are ready
            to deploy within 24 hours.
          </p>

          <dl className="mt-8 border-t border-white/10 xl:mt-10">
            <div className="flex flex-col gap-1 border-b border-white/10 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
              <dt className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                Direct lines
              </dt>
              <dd className="sm:text-right">
                <a
                  href="tel:0729664090"
                  className="block text-lg font-semibold text-white transition-colors hover:text-amber-500"
                >
                  072 966 4090
                </a>
                <a
                  href="tel:0150111144"
                  className="block text-slate-300 transition-colors hover:text-amber-500"
                >
                  015 011 1144
                </a>
              </dd>
            </div>
            <div className="flex flex-col gap-1 border-b border-white/10 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
  <dt className="text-xs font-semibold uppercase tracking-widest text-slate-400">
    WhatsApp
  </dt>
  <dd className="sm:text-right">
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      className="text-lg font-semibold text-white transition-colors hover:text-amber-500"
    >
      Send us a message
    </a>
  </dd>
</div>

            <div className="flex flex-col gap-1 border-b border-white/10 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
              <dt className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                Headquarters
              </dt>
              <dd className="sm:text-right">
                <span className="block font-semibold text-white">
                  Letaba River Estate
                </span>
                <span className="block text-slate-300">
                  Tzaneen, 0850, Limpopo
                </span>
              </dd>
            </div>
          </dl>

          {/* Hidden on phones to keep the page short */}
          <div className="mt-8 hidden md:block">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-400">
              What happens next
            </p>
            <ol className="space-y-3 text-slate-300">
              <li className="flex gap-4">
                <span className="w-4 font-bold text-amber-500">1</span>
                You send the request.
              </li>
              <li className="flex gap-4">
                <span className="w-4 font-bold text-amber-500">2</span>
                We check availability and contact you to confirm.
              </li>
              <li className="flex gap-4">
                <span className="w-4 font-bold text-amber-500">3</span>
                We deliver the machine to your site.
              </li>
            </ol>
          </div>
        </Reveal>
      </section>

      {/* RIGHT: the request sheet */}
      <section className="bg-slate-900 px-5 py-10 sm:px-8 md:py-14 xl:px-12 xl:pb-24 xl:pt-44">
        <Reveal
          delay={120}
          className="mx-auto w-full max-w-2xl xl:ml-0 xl:mr-auto xl:max-w-xl"
        >
          <div
            ref={sheetRef}
            className="scroll-mt-28 border rounded-md border-slate-300 border-t-4 border-t-amber-500 bg-white"
          >
            <div className="border-b border-slate-200 px-5 py-5 sm:px-8 sm:py-6">
              <h2
                className="text-xl font-bold uppercase tracking-wide text-slate-900"
                style={{ fontFamily: "'Barlow', sans-serif" }}
              >
                {result ? "Request received" : "Hire request form"}
              </h2>
              {!result && (
                <p className="mt-1 text-sm text-slate-500">
                  All fields are required.
                </p>
              )}
            </div>

            {result ? (
              /* Confirmation */
              <div className="px-5 py-8 sm:px-8 sm:py-10">
                <h3
                  className="text-3xl font-bold uppercase text-slate-900"
                  style={{ fontFamily: "'Barlow', sans-serif" }}
                >
                  Thank you
                </h3>
                <p className="mt-3 leading-relaxed text-slate-600">
                  We have your request and will contact you to confirm
                  availability.
                </p>

                <div className="mt-6 border border-dashed border-slate-400 bg-slate-50 px-4 py-4">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500">
                    Your reference
                  </p>
                  <p className="mt-1 break-all font-mono text-xl font-bold text-slate-900">
                    {result.reference}
                  </p>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-slate-600">
                  Keep this reference and quote it if you phone us. Need it
                  sooner? Call{" "}
                  <a
                    href="tel:0729664090"
                    className="font-bold text-slate-900 underline decoration-amber-500 decoration-2 underline-offset-4"
                  >
                    072 966 4090
                  </a>
                  .
                </p>

                <button
                  type="button"
                  onClick={() => setResult(null)}
                  className="mt-8 text-sm font-bold text-slate-900 underline decoration-amber-500 decoration-2 underline-offset-4 hover:text-amber-600"
                >
                  Send another request
                </button>
              </div>
            ) : (
              /* Form */
              <form
                onSubmit={handleSubmit}
                className="space-y-8 px-5 py-6 sm:px-8 sm:py-8"
              >
                <Group title="Your details">
                  <Field id="name" label="Full name or company">
                    <input
                      id="name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Tshepo Thato"
                      autoComplete="name"
                      className={inputClass}
                      required
                    />
                  </Field>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-4">
                    <Field id="phone" label="Phone number">
                      <input
                        id="phone"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="072 000 0000"
                        autoComplete="tel"
                        inputMode="tel"
                        className={inputClass}
                        required
                      />
                    </Field>
                    <Field id="email" label="Email address">
                      <input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@email.com"
                        autoComplete="email"
                        className={inputClass}
                        required
                      />
                    </Field>
                  </div>
                </Group>

                <Group title="The hire">
                  <Field id="equipmentType" label="Machine">
                    <select
                      id="equipmentType"
                      name="equipmentType"
                      value={formData.equipmentType}
                      onChange={handleChange}
                      className={inputClass}
                      required
                    >
                      <option value="">Select a machine</option>
                      {equipmentList.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                    {equipmentFailed && (
                      <p className="mt-2 text-sm text-red-700">
                        We could not load the machine list. Please refresh, or
                        call us on 072 966 4090.
                      </p>
                    )}
                  </Field>

                  <Field id="siteLocation" label="Site location">
                    <input
                      id="siteLocation"
                      type="text"
                      name="siteLocation"
                      value={formData.siteLocation}
                      onChange={handleChange}
                      placeholder="e.g. Farm Deerpark, Tzaneen"
                      className={inputClass}
                      required
                    />
                  </Field>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-4">
                    <Field id="startDate" label="Start date">
                      <input
                        id="startDate"
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        min={today}
                        onChange={handleChange}
                        className={inputClass}
                        required
                      />
                    </Field>
                    <Field id="endDate" label="End date">
                      <input
                        id="endDate"
                        type="date"
                        name="endDate"
                        value={formData.endDate}
                        min={formData.startDate || today}
                        onChange={handleChange}
                        className={inputClass}
                        required
                      />
                    </Field>
                  </div>
                </Group>

                {error && (
                  <div
                    role="alert"
                    className="border-l-4 border-red-600 bg-red-50 px-4 py-3 text-sm text-red-800"
                  >
                    Something went wrong sending your request. Please try
                    again, or call us on{" "}
                    <a
                      href="tel:0729664090"
                      className="font-bold underline underline-offset-2"
                    >
                      072 966 4090
                    </a>
                    .
                  </div>
                )}

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-sm bg-amber-500 py-4 font-bold tracking-wide text-slate-900 transition-colors hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-amber-500"
                  >
                    {isSubmitting ? "SENDING..." : "SEND HIRE REQUEST"}
                  </button>
                  <p className="mt-3 text-center text-sm text-slate-500">
                    {isSubmitting
                      ? "Sending your request. This can take a few seconds."
                      : "We will contact you by phone or email to confirm availability."}
                  </p>
                </div>
              </form>
            )}
          </div>
        </Reveal>
      </section>
    </main>
  )
}

export default ContactPage