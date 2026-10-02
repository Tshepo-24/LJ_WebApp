import { useEffect, useRef, useState } from "react"

// Turns true the first time the element scrolls into view, then stays true.
// So every animation plays once and never resets.
export function useInView(threshold = 0.15) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect() // stop watching: this is what makes it "once"
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return [ref, inView]
}

function Reveal({
  children,
  delay = 0,
  className = "",
  hidden = "opacity-0 translate-y-6",
}) {
  const [ref, inView] = useInView()

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-x-0 motion-reduce:translate-y-0 ${
        inView ? "opacity-100 translate-x-0 translate-y-0" : hidden
      } ${className}`}
    >
      {children}
    </div>
  )
}

export default Reveal