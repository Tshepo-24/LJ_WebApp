function HeroSection() {
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

export default HeroSection