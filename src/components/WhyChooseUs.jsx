const reasons = [
  {
    number: "01",
    title: "EQUIPMENT",
    text: "Quality construction and mining machinery built to handle demanding jobs and challenging worksites.",
    
  },
  {
    number: "02",
    title: "FLEXIBLE SOLUTIONS",
    text: "From short-term requirements to long-term projects, we provide hire solutions designed around your operational needs.",
  },
  {
    number: "03",
    title: "NATIONWIDE DELIVERY",
    text: "Based in Tzaneen and serving clients across South Africa, we deliver dependable equipment where your project needs it.",
  },
]

function WhyChooseUs() {
  return (
    <section className="bg-slate-250 py-25 px-8 md:px-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-black text-slate-900 mb-2"
        style={{ fontFamily: "'Barlow', sans-serif" }}>
          WHY CHOOSE <span className="text-amber-500 uppercase ">LJ PLANT HIRE</span>
        </h2>
        <p className="text-slate-500 mb-12 pb-6 border-b-3 border-slate-300">
         Reliable equipment, flexible hire solutions, and service you can count on.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {reasons.map((reason) => (
            <div key={reason.number}>
              <div className="bg-slate-900 text-amber-500 font-black w-12 h-12 flex items-center justify-center rounded mb-4">
                {reason.number}
              </div>
              <h3 className="font-bold text-slate-900 mb-2 tracking-wide">
                {reason.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                {reason.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs