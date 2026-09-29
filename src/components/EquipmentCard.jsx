import { Link } from 'react-router-dom'

function EquipmentCard({ equipment }) {
  return (
    <div className="bg-slate-180 border border-slate-200 rounded-lg overflow-hidden shadow-m hover:shadow-2xl transition-shadow duration-400">
      {/* Image area with overlaid ref badge + price ribbon */}
      <div className="relative bg-slate-180 h-60 flex items-center justify-center p-1">
        {equipment.imageUrl ? (
          <img
            src={equipment.imageUrl}
            alt={equipment.name}
            className="w-full h-full object-cover rounded-lg"
          />
        ) : (
          <span className="text-slate-400 text-xs font-bold tracking-widest uppercase">
            {equipment.category || "Machinery Photo"}
          </span>
        )}

        {/* Ref badge, top-left */}
        {equipment.ref && (
          <span className="absolute top-3 left-3 bg-slate-900 text-white text-xs font-bold px-2 py-1 rounded">
            REF: {equipment.ref}
          </span>
        )}

        {/* Price ribbon, bottom-right */}
        <div className="absolute bottom-0 right-0 bg-amber-500 text-slate-900 px-4 py-2 text-right">
          <p className="text-[10px] font-bold tracking-widest leading-none">FROM</p>
          <p className="font-black leading-none">
            R{equipment.hourlyRate}
            <span className="text-xs font-bold"> /hr</span>
          </p>
        </div>
      </div>

      {/* Card body */}
      <div className="p-6">
        <h3 className="font-bold text-slate-900 mb-2 text-lg">
          {equipment.name}
        </h3>

        {equipment.description && (
          <p className="text-slate-500 text-sm mb-6 leading-relaxed">
            {equipment.description}
          </p>
        )}

        <Link
          to="/contact"
          className="flex items-center justify-center gap-2 bg-slate-900 text-white text-sm font-bold py-3 rounded hover:bg-amber-500 hover:text-slate-900 transition-colors"
        >
          REQUEST HIRE
          
        </Link>
      </div>
    </div>
  )
}

export default EquipmentCard