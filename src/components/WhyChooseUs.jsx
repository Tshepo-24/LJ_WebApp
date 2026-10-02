import { useState } from "react"
import Reveal, { useInView } from "./Reveal"

const AUTO_SECONDS = 4 // how long each reason stays open

const reasons = [
  {
    number: "01",
    title: "MACHINES READY TO WORK",
    text: "Quality construction and mining equipment, well maintained and built to handle demanding jobs and tough worksites.",
    position: "8% 50%",
  },
  {
    number: "02",
    title: "HIRE THAT FITS YOUR JOB",
    text: "Need a machine for a day or for a long project? Rates are by the hour or day, so the hire is built around what your operation needs.",
    position: "52% 50%",
  },
  {
    number: "03",
    title: "DELIVERED TO YOUR SITE",
    text: "Based in Tzaneen and serving clients across South Africa. We bring dependable equipment to where your project is.",
    position: "94% 50%",
  },
]

function WhyChooseUs() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [listRef, listInView] = useInView(0.4)
  const current = reasons[active]

  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches

  function goNext() {
    setActive((i) => (i + 1) % reasons.length)
  }

  return (
    <section className="bg-slate-100 px-5 py-16 sm:px-8 md:px-16 md:py-24">
      {/* the timer line that fills along the open row */}
      <style>{`@keyframes whyProgress { from { transform: scaleX(0) } to { transform: scaleX(1) } }`}</style>

      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          {/* LEFT: photo panel (desktop only) */}
          <Reveal className="hidden lg:col-span-5 lg:block">
            <div className="relative h-full min-h-[460px] overflow-hidden rounded-2xl bg-slate-900">
              <div
                style={{ backgroundPosition: current.position }}
                className="absolute inset-0 bg-[url('/hero-excavator.jpg')] bg-cover transition-[background-position] duration-[1400ms] ease-in-out motion-reduce:transition-none"
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-slate-950/30"></div>

              <span className="absolute left-4 top-4 h-6 w-6 border-l-2 border-t-2 border-amber-500"></span>
              <span className="absolute right-4 top-4 h-6 w-6 border-r-2 border-t-2 border-amber-500"></span>
              <span className="absolute bottom-4 left-4 h-6 w-6 border-b-2 border-l-2 border-amber-500"></span>
              <span className="absolute bottom-4 right-4 h-6 w-6 border-b-2 border-r-2 border-amber-500"></span>

              <div className="absolute inset-x-8 bottom-9">
                <p className="mb-1 text-xs font-bold tracking-widest text-amber-500">
                  {current.number} / 03
                </p>
                <p className="text-lg font-black tracking-wide text-white">
                  {current.title}
                </p>
              </div>
            </div>
          </Reveal>

          {/* RIGHT: heading + accordion */}
          <div className="lg:col-span-7">
            <Reveal>
              <p className="mb-3 flex items-center gap-3 text-xs font-bold tracking-widest text-amber-600">
                <span className="h-0.5 w-8 bg-amber-500"></span>
                WHY CHOOSE US
              </p>
              <h2
                className="mb-4 text-3xl font-black leading-[1.05] text-slate-900 sm:text-4xl md:text-5xl lg:text-4xl"
                style={{ fontFamily: "'Barlow', sans-serif" }}
              >
                PLANT HIRE YOU CAN{" "}
                <span className="text-amber-500">RELY ON</span>
              </h2>
              <p className="mb-8 max-w-xl leading-relaxed text-slate-600 md:mb-10">
                When a job is waiting, you need a machine that starts and a
                supplier who picks up the phone. That is what we aim for on
                every hire.
              </p>
            </Reveal>

            <Reveal delay={100}>
              <div
                ref={listRef}
                className="border-b border-slate-300"
                onPointerEnter={(e) => {
                  if (e.pointerType === "mouse") setPaused(true)
                }}
                onPointerLeave={() => setPaused(false)}
                onFocusCapture={(e) => {
                  if (e.target.matches(":focus-visible")) setPaused(true)
                }}
                onBlurCapture={() => setPaused(false)}
              >
                {reasons.map((reason, index) => {
                  const isActive = index === active
                  return (
                    <div
                      key={reason.number}
                      className="relative border-t border-slate-300"
                    >
                      {/* amber bar that grows down the open row */}
                      <span
                        className={`absolute left-0 top-0 h-full w-1 origin-top bg-amber-500 transition-transform duration-500 motion-reduce:transition-none ${
                          isActive ? "scale-y-100" : "scale-y-0"
                        }`}
                      ></span>

                      {/* timer line: when it finishes, the next reason opens */}
                      {isActive && !reduceMotion && (
                        <span
                          onAnimationEnd={goNext}
                          style={{
                            animation: `whyProgress ${AUTO_SECONDS}s linear forwards`,
                            animationPlayState:
                              paused || !listInView ? "paused" : "running",
                          }}
                          className="absolute bottom-0 left-0 h-0.5 w-full origin-left bg-amber-500"
                        ></span>
                      )}

                      <button
                        type="button"
                        onClick={() => setActive(index)}
                        aria-expanded={isActive}
                        className="group flex w-full items-center gap-4 px-4 py-5 text-left md:gap-6 md:px-6 md:py-6"
                      >
                        <span
                          className={`w-10 text-2xl font-black transition-colors duration-300 md:w-14 md:text-3xl ${
                            isActive
                              ? "text-amber-500"
                              : "text-slate-300 group-hover:text-slate-400"
                          }`}
                        >
                          {reason.number}
                        </span>
                        <span
                          className={`flex-1 text-base font-bold tracking-wide transition-colors duration-300 md:text-xl ${
                            isActive
                              ? "text-slate-900"
                              : "text-slate-500 group-hover:text-slate-900"
                          }`}
                        >
                          {reason.title}
                        </span>

                        <span
                          className={`relative h-5 w-5 shrink-0 transition-transform duration-300 ${
                            isActive ? "rotate-45" : ""
                          }`}
                        >
                          <span className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-slate-900"></span>
                          <span className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-slate-900"></span>
                        </span>
                      </button>

                      <div
                        className={`grid transition-all duration-500 ease-out motion-reduce:transition-none ${
                          isActive
                            ? "grid-rows-[1fr] opacity-100"
                            : "grid-rows-[0fr] opacity-0"
                        }`}
                      >
                        <div className="overflow-hidden">
                          <p className="pb-6 pl-[4.5rem] pr-6 leading-relaxed text-slate-600 md:pl-[6.5rem]">
                            {reason.text}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </Reveal>
          </div>
        </div>

        {/* Contact panel */}
       {/* Call-out */}
<Reveal delay={100} className="mt-12 md:mt-16">
  <div className="flex flex-col gap-2 border-l-4 border-amber-500 pl-5 sm:flex-row sm:items-end sm:justify-between sm:gap-8 md:pl-8">
    <div>
      <p className="mb-1 text-xs font-bold tracking-widest text-slate-500">
        NOT SURE WHICH MACHINE YOU NEED?
      </p>
      <a
        href="tel:0729664090"
        className="block text-3xl font-black text-slate-900 transition-colors hover:text-amber-500 sm:text-4xl md:text-5xl"
        style={{ fontFamily: "'Barlow', sans-serif" }}
      >
        072 966 4090
      </a>
    </div>
    <p className="max-w-xs text-sm text-slate-600">
      Call and we will help you pick the right machine for the job.
    </p>
  </div>
</Reveal>
      </div>
    </section>
  )
}

export default WhyChooseUs