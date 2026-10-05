{/*import { Link } from 'react-router-dom'

function EquipmentCard({ equipment }) {
  return (
    <div className="bg-slate-180 border border-slate-200 rounded-lg overflow-hidden shadow-m hover:shadow-2xl transition-shadow duration-400">
      {/* Image area with overlaid ref badge + price ribbon 
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

        {/* Ref badge, top-left 
        {equipment.ref && (
          <span className="absolute top-3 left-3 bg-slate-900 text-white text-xs font-bold px-2 py-1 rounded">
            REF: {equipment.ref}
          </span>
        )}

        {/* Price ribbon, bottom-right 
        <div className="absolute bottom-0 right-0 bg-amber-500 text-slate-900 px-4 py-2 text-right">
          <p className="text-[10px] font-bold tracking-widest leading-none">FROM</p>
          <p className="font-black leading-none">
            R{equipment.hourlyRate}
            <span className="text-xs font-bold"> /hr</span>
          </p>
        </div>
      </div>

      {/* Card body 
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

export default EquipmentCard*/}

import { Link } from "react-router-dom"

function EquipmentCard({ equipment }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Photo */}
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-200">
        {equipment.imageUrl ? (
          <img
            src={equipment.imageUrl}
            alt={equipment.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs font-bold uppercase tracking-widest text-slate-400">
            {equipment.category || "Machinery photo"}
          </div>
        )}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-slate-900/40 to-transparent"></div>

        {equipment.category && (
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-slate-800 backdrop-blur-sm">
            {equipment.category}
          </span>
        )}

        {equipment.ref && (
          <span className="absolute right-3 top-3 rounded bg-slate-900/80 px-2 py-1 text-[11px] font-bold tracking-wide text-white backdrop-blur-sm">
            REF: {equipment.ref}
          </span>
        )}
      </div>

      {/* Details */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3
          className="text-xl font-black leading-tight text-slate-900"
          style={{ fontFamily: "'Barlow', sans-serif" }}
        >
          {equipment.name}
        </h3>

        {equipment.description && (
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-600">
            {equipment.description}
          </p>
        )}

        {/* Price and action, pinned to the bottom so every card lines up */}
        <div className="mt-auto flex items-end justify-between gap-4 border-t border-slate-200 pt-5">
          <div>
            <p className="text-[11px] font-bold tracking-widest text-slate-400">
              FROM
            </p>
            <p className="text-2xl font-black leading-none text-slate-900">
              R{equipment.hourlyRate}
              <span className="ml-1 text-sm font-bold text-slate-500">/hr</span>
            </p>
          </div>

          <Link
            to={`/contact?equipment=${equipment.id}`}
            className="rounded-lg bg-slate-900 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-amber-500 hover:text-slate-900"
          >
            REQUEST HIRE
          </Link>
        </div>
      </div>
    </article>
  )
}

export default EquipmentCard