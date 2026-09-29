import { useState, useEffect, useMemo } from 'react'
import { AgGridReact } from 'ag-grid-react'
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community'

ModuleRegistry.registerModules([AllCommunityModule])

function AdminDashboardPage() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeFilter, setActiveFilter] = useState('ALL')
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [quickFilterText, setQuickFilterText] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('adminToken')

    fetch('http://localhost:8080/api/admin/bookings', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to load bookings')
        }
        return response.json()
      })
      .then((data) => {
        setBookings(data)
        setLoading(false)
      })
      .catch((err) => {
        setError('Could not load bookings.')
        setLoading(false)
      })
  }, [])

  function updateStatus(newStatus) {
  const token = localStorage.getItem('adminToken')

  fetch(`http://localhost:8080/api/admin/bookings/${selectedBooking.id}/status`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status: newStatus }),
  })
    .then((response) => {
      if (!response.ok) throw new Error('Update failed')
      return response.json()
    })
    .then((updated) => {
      setBookings((prev) => prev.map((b) => (b.id === updated.id ? updated : b)))
      setSelectedBooking(updated)
    })
    .catch(() => alert('Could not update the status. Please try again.'))
}

function deleteBooking() {
  const confirmed = window.confirm(
    `Permanently delete booking ${selectedBooking.referenceToken}? This cannot be undone.`
  )
  if (!confirmed) return

  const token = localStorage.getItem('adminToken')

  fetch(`http://localhost:8080/api/admin/bookings/${selectedBooking.id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((response) => {
      if (!response.ok) throw new Error('Delete failed')
      setBookings((prev) => prev.filter((b) => b.id !== selectedBooking.id))
      setSelectedBooking(null)
    })
    .catch(() => alert('Could not delete the booking. Please try again.'))
}

  const filteredBookings = useMemo(() => {
    if (activeFilter === 'ALL') return bookings
    return bookings.filter((b) => b.status === activeFilter)
  }, [bookings, activeFilter])

  const counts = useMemo(() => {
    return {
      ALL: bookings.length,
      NEW: bookings.filter((b) => b.status === 'NEW').length,
      CONFIRMED: bookings.filter((b) => b.status === 'CONFIRMED').length,
      IN_USE: bookings.filter((b) => b.status === 'IN_USE').length,
      RETURNED: bookings.filter((b) => b.status === 'RETURNED').length,
      CANCELLED: bookings.filter((b) => b.status === 'CANCELLED').length,
    }
  }, [bookings])

  const columnDefs = useMemo(
    () => [
      { field: 'referenceToken', headerName: 'REF', width: 140 },
      { field: 'customerName', headerName: 'CUSTOMER', flex: 1 },
      {
        field: 'equipment.name',
        headerName: 'EQUIPMENT',
        flex: 1,
        valueGetter: (params) => params.data.equipment?.name,
      },
      { field: 'siteLocation', headerName: 'LOCATION', flex: 1 },
      { field: 'startDate', headerName: 'START', width: 120 },
      { field: 'endDate', headerName: 'END', width: 120 },
      { field: 'status', headerName: 'STATUS', width: 130 },
      {
  headerName: '',
  width: 120,
  sortable: false,
  filter: false,
  cellRenderer: (params) => (
    <button
      onClick={() => setSelectedBooking(params.data)}
      className="border border-slate-900 text-slate-900 text-xs font-bold px-3 py-1 hover:bg-slate-900 hover:text-white transition-colors"
    >
      MANAGE
    </button>
  ),
},
    ],
    []
  )

  const filterTabs = ['ALL', 'NEW', 'CONFIRMED', 'IN_USE', 'RETURNED', 'CANCELLED']

  return (
    <main className="bg-slate-50 min-h-screen px-8 mt-9 py-12">
      <div className="max-w-7xl mx-auto">
        <p className="text-amber-600 text-xs font-bold tracking-widest mb-1">
          BOOKINGS
        </p>
        <h1 className="text-3xl font-black text-slate-900 mb-8">
          HIRE REQUESTS
        </h1>

        {loading && <p className="text-slate-600">Loading bookings...</p>}
        {error && <p className="text-red-600">{error}</p>}

        {!loading && !error && (
          <>
            {/* Summary cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white border-l-4 border-amber-500 p-4 rounded shadow-m">
                <p className="text-xs text-slate-500 font-bold tracking-widest">
                  NEW REQUESTS
                </p>
                <p className="text-3xl font-black text-slate-900">
                  {counts.NEW}
                </p>
              </div>
              <div className="bg-white border-l-4 border-slate-900 p-4 rounded shadow-sm">
                <p className="text-xs text-slate-500 font-bold tracking-widest">
                  ACTIVE HIRES
                </p>
                <p className="text-3xl font-black text-slate-900">
                  {counts.IN_USE}
                </p>
              </div>
              <div className="bg-white border-l-4 border-green-600 p-4 rounded shadow-sm">
                <p className="text-xs text-slate-500 font-bold tracking-widest">
                  CONFIRMED
                </p>
                <p className="text-3xl font-black text-slate-900">
                  {counts.CONFIRMED}
                </p>
              </div>
              <div className="bg-white border-l-4 border-slate-400 p-4 rounded shadow-sm">
                <p className="text-xs text-slate-500 font-bold tracking-widest">
                  TOTAL
                </p>
                <p className="text-3xl font-black text-slate-900">
                  {counts.ALL}
                </p>
              </div>
            </div>

            {/* Filter tabs + search */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">

               <input
                type="text"
                placeholder="Search ref / customer / machine"
                value={quickFilterText}
                onChange={(e) => setQuickFilterText(e.target.value)}
                className="border border-slate-800 rounded px-4 py-2 text-sm w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-slate-800 "
              />


              <div className="flex flex-wrap gap-2">
                {filterTabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveFilter(tab)}
                    className={`px-4 py-2 text-sm font-bold rounded ${
                      activeFilter === tab
                        ? 'bg-slate-900 text-white'
                        : 'bg-white text-slate-600 border border-slate-500'
                    }`}
                  >
                    {tab} {tab !== 'ALL' ? `(${counts[tab]})` : `(${counts.ALL})`}
                  </button>
                ))}
              </div>

             
            </div>

            {/* The grid */}
            <div className="ag-theme-quartz   " style={{ height: 500, width: '100%' }}>
              <AgGridReact
                rowData={filteredBookings}
                columnDefs={columnDefs}
                quickFilterText={quickFilterText}
                pagination={true}
                paginationPageSize={10}
              />
            </div>
          </>
        )}

        {selectedBooking && (
  <div
    className="fixed inset-0 bg-black/60 flex items-center justify-center px-4 z-50"
    onClick={() => setSelectedBooking(null)}
  >
    <div
      className="bg-white rounded-lg shadow-xl w-full max-w-lg overflow-hidden"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="bg-slate-900 text-white px-6 py-4 flex justify-between items-center">
        <div>
          <p className="text-amber-500 text-xs font-bold tracking-widest">
            {selectedBooking.referenceToken}
          </p>
          <h2 className="text-xl font-black">{selectedBooking.customerName}</h2>
        </div>
        <button
          onClick={() => setSelectedBooking(null)}
          className="text-2xl leading-none"
        >
          ×
        </button>
      </div>

      <div className="p-6 space-y-3 text-sm text-slate-700">
        <p><span className="font-bold">Phone:</span> {selectedBooking.customerPhone}</p>
        <p><span className="font-bold">Email:</span> {selectedBooking.customerEmail}</p>
        <p><span className="font-bold">Equipment:</span> {selectedBooking.equipment?.name}</p>
        <p><span className="font-bold">Site:</span> {selectedBooking.siteLocation}</p>
        <p>
          <span className="font-bold">Dates:</span> {selectedBooking.startDate} → {selectedBooking.endDate}
        </p>
        <p><span className="font-bold">Current status:</span> {selectedBooking.status}</p>
      </div>

      <div className="px-6 pb-6">
        <p className="text-xs font-bold text-slate-500 tracking-widest mb-2">
          CHANGE STATUS
        </p>
        <div className="flex flex-wrap gap-2 mb-6">
          {['NEW', 'CONFIRMED', 'IN_USE', 'RETURNED', 'CANCELLED'].map((s) => (
            <button
              key={s}
              onClick={() => updateStatus(s)}
              disabled={selectedBooking.status === s}
              className={`px-3 py-2 text-xs font-bold rounded ${
                selectedBooking.status === s
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-amber-500'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <button
          onClick={deleteBooking}
          className="w-full border border-red-600 text-red-600 font-bold py-2 rounded hover:bg-red-600 hover:text-white transition-colors"
        >
          DELETE BOOKING
        </button>
      </div>
    </div>
  </div>
)}
      </div>
    </main>
  )
}

export default AdminDashboardPage