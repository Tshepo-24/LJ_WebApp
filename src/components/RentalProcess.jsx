const steps = [
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
          {/* connecting line, desktop only */}
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

export default RentalProcess