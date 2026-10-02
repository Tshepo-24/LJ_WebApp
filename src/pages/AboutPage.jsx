import Reveal from "../components/Reveal"

const specs = [
  { label: "BASED IN", value: "Tzaneen, Limpopo" },
  { label: "EQUIPMENT", value: "Construction and mining" },
  { label: "HIRE RATES", value: "By the hour or by the day" },
  { label: "DELIVERY", value: "Worksites across South Africa" },
]

const answers = [
  {
    q: "What can I hire?",
    a: "Construction and mining equipment. The fleet page lists the machines with their rates.",
  },
  {
    q: "How is hire priced?",
    a: "By the hour or by the day. The rate is shown on each machine.",
  },
  {
    q: "How long can I hire for?",
    a: "Anything from a short job to the length of a project. Give us your start and end dates and we plan around them.",
  },
  {
    q: "Where do you deliver?",
    a: "We are based in Tzaneen, Limpopo, and deliver to worksites across South Africa.",
  },
  {
    q: "How do I book?",
    a: "Fill in the request form on the contact page. We check availability, confirm with you and arrange delivery.",
  },
  {
    q: "Prefer to talk?",
    a: (
      <>
        Call{" "}
        <a
          href="tel:0729664090"
          className="font-bold text-slate-900 underline decoration-amber-500 decoration-2 underline-offset-4 hover:text-amber-600"
        >
          072 966 4090
        </a>{" "}
        or{" "}
        <a
          href="tel:0150111144"
          className="font-bold text-slate-900 underline decoration-amber-500 decoration-2 underline-offset-4 hover:text-amber-600"
        >
          015 011 1144
        </a>
        . We will help you choose the right machine.
      </>
    ),
  },
]

// A line drawing of an excavator that keeps digging
function Excavator() {
  return (
    <svg
      viewBox="0 0 600 400"
      className="h-auto w-full"
      role="img"
      aria-label="Line drawing of an excavator digging"
      strokeLinejoin="round"
      strokeLinecap="round"
    >
      <style>{`
        @keyframes ljBoom { 0%,100% { transform: rotate(-6deg) } 50% { transform: rotate(8deg) } }
        @keyframes ljArm { 0%,100% { transform: rotate(-8deg) } 50% { transform: rotate(22deg) } }
        @keyframes ljBucket { 0%,100% { transform: rotate(-10deg) } 50% { transform: rotate(32deg) } }
        .lj-boom { transform-origin: 370px 250px; animation: ljBoom 5s ease-in-out infinite }
        .lj-arm { transform-origin: 482px 139px; animation: ljArm 5s ease-in-out infinite }
        .lj-bucket { transform-origin: 548px 264px; animation: ljBucket 5s ease-in-out infinite }
        @media (prefers-reduced-motion: reduce) {
          .lj-boom, .lj-arm, .lj-bucket { animation: none }
        }
      `}</style>

      {/* ground + dirt pile */}
      <path d="M20 346 H580" stroke="#94a3b8" strokeWidth="2" strokeDasharray="6 8" fill="none" />
      <path d="M455 346 Q515 312 580 346 Z" fill="#e7e5e4" stroke="#0f172a" strokeWidth="3" />

      {/* tracks */}
      <rect x="140" y="300" width="280" height="44" rx="22" fill="#fff" stroke="#0f172a" strokeWidth="3" />
      <circle cx="166" cy="322" r="10" fill="#0f172a" />
      <circle cx="394" cy="322" r="10" fill="#0f172a" />
      <circle cx="230" cy="322" r="6" fill="none" stroke="#0f172a" strokeWidth="3" />
      <circle cx="280" cy="322" r="6" fill="none" stroke="#0f172a" strokeWidth="3" />
      <circle cx="330" cy="322" r="6" fill="none" stroke="#0f172a" strokeWidth="3" />
      <rect x="170" y="288" width="220" height="14" rx="3" fill="#0f172a" />

      {/* body, counterweight, cab */}
      <rect x="146" y="250" width="30" height="40" rx="8" fill="#d97706" stroke="#0f172a" strokeWidth="3" />
      <rect x="160" y="236" width="230" height="54" rx="8" fill="#f59e0b" stroke="#0f172a" strokeWidth="3" />
      <rect x="190" y="212" width="8" height="24" fill="#0f172a" />
      <path
        d="M290 236 V188 a6 6 0 0 1 6-6 H346 a6 6 0 0 1 5 3 L380 236 Z"
        fill="#f59e0b"
        stroke="#0f172a"
        strokeWidth="3"
      />
      <path d="M300 232 V196 H342 L364 232 Z" fill="#e0f2fe" stroke="#0f172a" strokeWidth="3" />

      {/* boom, arm and bucket (these move) */}
      <g className="lj-boom">
        <path
          d="M358 258 L470 128 L494 150 L384 280 Z"
          fill="#f59e0b"
          stroke="#0f172a"
          strokeWidth="3"
        />
        <g className="lj-arm">
          <path
            d="M470 130 L496 146 L560 262 L534 274 Z"
            fill="#fbbf24"
            stroke="#0f172a"
            strokeWidth="3"
          />
          <g className="lj-bucket">
            <path
              d="M530 262 L582 258 Q592 298 556 314 L534 300 Z"
              fill="#d97706"
              stroke="#0f172a"
              strokeWidth="3"
            />
            <circle cx="548" cy="264" r="6" fill="#0f172a" />
          </g>
          <circle cx="482" cy="139" r="7" fill="#0f172a" />
        </g>
      </g>
      <circle cx="370" cy="250" r="8" fill="#0f172a" />
    </svg>
  )
}

function AboutPage() {
  return (
    <main className="min-h-screen bg-stone-100">
      {/* 1. Intro + drawing sheet */}
      <section className="px-5 pb-16 pt-32 sm:px-8 md:px-16 md:pb-24 md:pt-40">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6">
            <Reveal>
              <p className="mb-4 text-xs font-bold tracking-widest text-amber-600">
                ABOUT LJ PLANT HIRE
              </p>
              <h1
                className="text-5xl font-black leading-[1.02] text-slate-900 sm:text-6xl lg:text-7xl"
                style={{ fontFamily: "'Barlow', sans-serif" }}
              >
                WE KEEP YOUR WORKSITE{" "}
                <span className="text-amber-500">MOVING.</span>
              </h1>
            </Reveal>

            <Reveal delay={120}>
              <p className="mt-6 text-lg font-semibold leading-relaxed text-slate-900 sm:text-xl">
                LJ Plant Hire hires out construction and mining equipment from
                Tzaneen, Limpopo, to worksites across South Africa.
              </p>
              <p className="mt-4 leading-relaxed text-slate-600">
                We supply reliable, industrial-grade machinery for construction,
                mining and infrastructure projects. Whether you need a machine
                for a few days or for the length of a project, we build the hire
                around your job.
              </p>
            </Reveal>
          </div>

          {/* The drawing sheet */}
          <Reveal delay={200} className="lg:col-span-6">
            <div className="border-2 border-slate-900 bg-white">
              <div className="bg-[linear-gradient(to_right,#e7e5e4_1px,transparent_1px),linear-gradient(to_bottom,#e7e5e4_1px,transparent_1px)] bg-[size:24px_24px] p-4 sm:p-6">
                <Excavator />
              </div>

              {/* title block */}
              <div className="grid grid-cols-3 divide-x-2 divide-slate-900 border-t-2 border-slate-900 text-[10px] sm:text-xs">
                <div className="p-2 sm:p-3">
                  <p className="font-bold tracking-widest text-slate-400">DRAWN BY</p>
                  <p className="mt-0.5 font-bold text-slate-900">LJ PLANT HIRE</p>
                </div>
                <div className="p-2 sm:p-3">
                  <p className="font-bold tracking-widest text-slate-400">PROJECT</p>
                  <p className="mt-0.5 font-bold text-slate-900">YOUR NEXT JOB</p>
                </div>
                <div className="p-2 sm:p-3">
                  <p className="font-bold tracking-widest text-slate-400">STATUS</p>
                  <p className="mt-0.5 flex items-center gap-2 font-bold text-slate-900">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75 motion-reduce:animate-none"></span>
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-green-600"></span>
                    </span>
                    READY
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 2. Statement + spec sheet */}
      <section className="bg-slate-900 px-5 py-16 sm:px-8 md:px-16 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-7">
            <p
              className="text-3xl font-black leading-[1.1] text-white sm:text-4xl md:text-5xl"
              style={{ fontFamily: "'Barlow', sans-serif" }}
            >
              WHEN A JOB IS WAITING, A MACHINE THAT DOES NOT START COSTS YOU
              TIME AND MONEY. SO WE KEEP OURS MAINTAINED AND{" "}
              <span className="text-amber-500">READY TO WORK.</span>
            </p>
          </Reveal>

          <Reveal delay={150} className="lg:col-span-5">
            <p className="mb-2 text-xs font-bold tracking-widest text-amber-500">
              AT A GLANCE
            </p>
            <dl>
              {specs.map((spec) => (
                <div key={spec.label} className="flex items-end gap-3 py-3">
                  <dt className="text-xs font-bold tracking-widest text-slate-400">
                    {spec.label}
                  </dt>
                  <span
                    aria-hidden="true"
                    className="mb-1.5 flex-1 border-b border-dotted border-white/25"
                  ></span>
                  <dd className="text-right font-bold text-white">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* 3. Questions, answered */}
      <section className="px-5 py-16 sm:px-8 md:px-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="mb-3 text-xs font-bold tracking-widest text-amber-600">
              GOOD TO KNOW
            </p>
            <h2
              className="mb-10 max-w-2xl text-3xl font-black leading-[1.05] text-slate-900 sm:text-4xl md:mb-14 md:text-5xl"
              style={{ fontFamily: "'Barlow', sans-serif" }}
            >
              QUESTIONS, <span className="text-amber-500">ANSWERED.</span>
            </h2>
          </Reveal>

          <div className="grid gap-x-16 md:grid-cols-2">
            {answers.map((item, index) => (
              <Reveal key={item.q} delay={(index % 2) * 100}>
                <div className="border-t-2 border-slate-900 py-6 md:py-8">
                  <h3
                    className="mb-2 text-xl font-black text-slate-900 sm:text-2xl"
                    style={{ fontFamily: "'Barlow', sans-serif" }}
                  >
                    {item.q}
                  </h3>
                  <p className="leading-relaxed text-slate-600">{item.a}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

export default AboutPage