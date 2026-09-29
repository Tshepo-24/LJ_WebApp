function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 py-10 px-8 md:px-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-amber-500 text-slate-900 font-black w-8 h-8 flex items-center justify-center rounded"
            style={{ fontFamily: "'Barlow', sans-serif" }}>
              LJ
            </div>
            <span className="text-white font-bold"
            style={{ fontFamily: "'Barlow', sans-serif" }}>LJ PLANT HIRE</span>
          </div>
          <p className="text-sm leading-relaxed">
            Providing the power behind Limpopo's biggest infrastructure
            projects. From small sites to industrial mining, we deliver the
            prestige service you deserve.
          </p>
        </div>

        <div>
          <p className="text-amber-500 text-xs font-bold tracking-widest mb-4">
            NAVIGATION
          </p>
          <ul className="space-y-2 text-sm">
            <li><a href="/equipment" className="hover:text-white">Our Fleet</a></li>
            <li><a href="/contact" className="hover:text-white">Contact</a></li>
           
            <li><a href="/#why-us" className="hover:text-white">About Us</a></li>
            
          </ul>
        </div>

        <div>
          <p className="text-amber-500 text-xs font-bold tracking-widest mb-4">
            CONTACT
          </p>
          <ul className="space-y-2 text-sm">
            <li>Letaba River Estate </li>
            <li>0850,Tzaneen,Limpopo</li>
            <li> (0) 15 001 1144</li>
            <li>+27 72 966 4090</li>
            <li>info@ljadvisory.co.za</li>
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center mt-12 pt-6 border-t border-slate-800 text-xs">
        <p>© 2026 LJ Plant Hire (Pty) Ltd. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-white">Privacy</a>
          <a href="#" className="hover:text-white">Terms</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer