{/*import { API_BASE } from '../api'
import { useState, useEffect } from "react"
import EquipmentCard from "../components/EquipmentCard"

function EquipmentPage() {
  const [equipmentList, setEquipmentList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`${API_BASE}/api/equipment`)
      .then((response) => response.json())
      .then((data) => {
        setEquipmentList(data)
        setLoading(false)
      })
      .catch((err) => {
        setError("Server is down ....!!")
        setLoading(false)
      })
  }, [])

  return (
    <main className="bg-slate-50 px-8 py-30 min-h-screen">
      <div className="max-w-6xl mx-auto">

        {/* Header row - eyebrow/title on left, description on right 
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-12">
          <div>
            <p className="text-amber-600 text-xs font-bold tracking-widest mb-2">
              THE EQUIPMENT
            </p>
            <h1 className="text-5xl font-black text-slate-900 mb-4">
              THE FLEET
            </h1>
            <div className="w-16 h-1 bg-amber-500"></div>
          </div>

          <p className="text-slate-500 text-xs md:text-sm font-bold tracking-widest uppercase max-w-xs text-right md:text-left">
            Priced by the hour or day. Maintained for reliability. Ready for
            deployment across Limpopo.
          </p>
        </div>

        {loading && <p className="text-slate-600">Loading equipment..</p>}

        {error && <p className="text-red-600"> {error}</p>}

        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {equipmentList.map((item) => (
              <EquipmentCard key={item.id} equipment={item} />
            ))}
          </div>
        )}

      </div>
    </main>
  )
}

export default EquipmentPage*/}
import { API_BASE } from "../api"
import { useState, useEffect, useMemo } from "react"
import EquipmentCard from "../components/EquipmentCard"
import Reveal from "../components/Reveal"

function SkeletonCard() {
  return (
    <div className="flex overflow-hidden rounded border border-slate-800 bg-slate-900 sm:flex-col">
      <div className="min-h-[150px] w-[40%] shrink-0 animate-pulse bg-slate-800 sm:aspect-[4/3] sm:min-h-0 sm:w-full"></div>
      <div className="flex-1 space-y-3 p-4 sm:p-6">
        <div className="h-5 w-2/3 animate-pulse rounded-sm bg-slate-800"></div>
        <div className="hidden h-4 w-full animate-pulse rounded-sm bg-slate-800 sm:block"></div>
        <div className="h-8 w-1/2 animate-pulse rounded-sm bg-slate-800 sm:mt-6"></div>
      </div>
    </div>
  )
}

function EquipmentPage() {
  const [equipmentList, setEquipmentList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeCategory, setActiveCategory] = useState("ALL")

  useEffect(() => {
    fetch(`${API_BASE}/api/equipment`)
      .then((response) => {
        if (!response.ok) throw new Error("Failed to load equipment")
        return response.json()
      })
      .then((data) => {
        setEquipmentList(data)
        setLoading(false)
      })
      .catch(() => {
        setError("We could not load the fleet right now.")
        setLoading(false)
      })
  }, [])

  // Category tabs only appear if the machines have more than one category
  const categories = useMemo(() => {
    const unique = [
      ...new Set(equipmentList.map((item) => item.category).filter(Boolean)),
    ]
    return unique.length > 1 ? ["ALL", ...unique] : []
  }, [equipmentList])

  const visibleList = useMemo(() => {
    if (activeCategory === "ALL") return equipmentList
    return equipmentList.filter((item) => item.category === activeCategory)
  }, [equipmentList, activeCategory])

  const ready = !loading && !error

  return (
    <main className="min-h-screen bg-slate-100">
      {/* Header */}
      <section className="bg-slate-900 px-5 pb-12 pt-32 sm:px-8 md:px-16 md:pb-16 md:pt-44">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h1
              className="text-4xl font-bold uppercase tracking-wide text-white sm:text-5xl md:text-6xl"
              style={{ fontFamily: "'Barlow', sans-serif" }}
            >
              Our fleet
            </h1>
            <div className="mt-5 h-0.5 w-12 bg-amber-500"></div>
            <p className="mt-5 max-w-xl leading-relaxed text-slate-300">
              Construction and mining equipment, priced by the hour or day and
              maintained for reliability. Ready for deployment across Limpopo.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Fleet */}
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 md:px-16 md:py-14">
        {ready && equipmentList.length > 0 && (
          <div className="mb-8 flex flex-col gap-4 border-b border-slate-300 pb-3 sm:flex-row sm:items-end sm:justify-between">
            <p className="text-sm font-semibold text-slate-600">
              {visibleList.length}{" "}
              {visibleList.length === 1 ? "machine" : "machines"}
            </p>

            {categories.length > 0 && (
              <div className="-mx-5 flex gap-6 overflow-x-auto px-5 sm:mx-0 sm:px-0">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`shrink-0 whitespace-nowrap border-b-2 pb-2 text-sm font-semibold transition-colors ${
                      activeCategory === category
                        ? "border-amber-500 text-slate-900"
                        : "border-transparent text-slate-500 hover:text-slate-900"
                    }`}
                  >
                    {category === "ALL" ? "All machines" : category}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {loading && (
          <>
            <p className="mb-6 text-sm text-slate-500">
              Loading the fleet. This can take a few seconds.
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
              {[0, 1, 2].map((i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          </>
        )}

        {error && (
          <div className="rounded border border-slate-300 bg-white p-6 sm:p-8">
            <p className="font-bold text-slate-900">{error}</p>
            <p className="mt-2 text-slate-600">
              Please refresh the page, or call us on{" "}
              <a
                href="tel:0729664090"
                className="font-bold text-slate-900 underline decoration-amber-500 decoration-2 underline-offset-4"
              >
                072 966 4090
              </a>{" "}
              and we will help you directly.
            </p>
          </div>
        )}

        {ready && (
          <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
              {visibleList.map((item, index) => (
                <Reveal
                  key={item.id}
                  delay={(index % 3) * 80}
                  className="h-full"
                >
                  <EquipmentCard equipment={item} />
                </Reveal>
              ))}
            </div>

            {visibleList.length === 0 && (
              <p className="py-10 text-center text-slate-500">
                No machines found in this category.
              </p>
            )}

            {equipmentList.length > 0 && (
              <p className="mt-12 border-t border-slate-300 pt-6 text-slate-600">
                Need help choosing a machine? Call{" "}
                <a
                  href="tel:0729664090"
                  className="font-bold text-slate-900 underline decoration-amber-500 decoration-2 underline-offset-4 hover:text-amber-600"
                >
                  072 966 4090
                </a>{" "}
                and we will help you pick the right one for the job.
              </p>
            )}
          </>
        )}
      </div>
    </main>
  )
}

export default EquipmentPage