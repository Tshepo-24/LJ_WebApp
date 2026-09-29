import { useState, useEffect } from "react"
import EquipmentCard from "../components/EquipmentCard"

function EquipmentPage() {
  const [equipmentList, setEquipmentList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch("http://localhost:8080/api/equipment")
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

        {/* Header row - eyebrow/title on left, description on right */}
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

export default EquipmentPage