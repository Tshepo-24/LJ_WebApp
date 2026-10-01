import { useState, useEffect, useMemo } from 'react'
import { AgGridReact } from 'ag-grid-react'
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community'

ModuleRegistry.registerModules([AllCommunityModule])

// '' uses the Vite proxy (needed for testing on your phone).
// If you have not set up the proxy yet, use 'http://localhost:8080' instead.
const API_BASE = 'http://localhost:8080'

const STATUSES = ['NEW', 'CONFIRMED', 'IN_USE', 'RETURNED', 'CANCELLED']
const FILTER_TABS = ['ALL', ...STATUSES]

const STATUS_STYLES = {
  NEW: 'bg-amber-100 text-amber-800',
  CONFIRMED: 'bg-green-100 text-green-800',
  IN_USE: 'bg-blue-100 text-blue-800',
  RETURNED: 'bg-slate-200 text-slate-700',
  CANCELLED: 'bg-red-100 text-red-700',
}

function StatusBadge({ status }) {
  return (
    <span
      className={`inline-block shrink-0 px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide ${
        STATUS_STYLES[status] || 'bg-slate-100 text-slate-700'
      }`}
    >
      {status?.replace('_', ' ')}
    </span>
  )
}

function AdminDashboardPage() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeFilter, setActiveFilter] = useState('ALL')
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [searchText, setSearchText] = useState('')
  const [cardCount, setCardCount] = useState(10) // how many cards show on phones
  const [busy, setBusy] = useState(false) // blocks double clicks in the modal

  useEffect(() => {
    const token = localStorage.getItem('adminToken')

    fetch(`${API_BASE}/api/admin/bookings`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (!response.ok) throw new Error('Failed to load bookings')
        return response.json()
      })
      .then((data) => {
        setBookings(data)
        setLoading(false)
      })
      .catch(() => {
        setError('Could not load bookings.')
        setLoading(false)
      })
  }, [])

  function updateStatus(newStatus) {
    if (busy) return
    setBusy(true)
    const token = localStorage.getItem('adminToken')

    fetch(`${API_BASE}/api/admin/bookings/${selectedBooking.id}/status`, {
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
      .finally(() => setBusy(false))
  }

  function deleteBooking() {
    if (busy) return
    const confirmed = window.confirm(
      `Permanently delete booking ${selectedBooking.referenceToken}? This cannot be undone.`
    )
    if (!confirmed) return

    setBusy(true)
    const token = localStorage.getItem('adminToken')

    fetch(`${API_BASE}/api/admin/bookings/${selectedBooking.id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (!response.ok) throw new Error('Delete failed')
        setBookings((prev) => prev.filter((b) => b.id !== selectedBooking.id))
        setSelectedBooking(null)
      })
      .catch(() => alert('Could not delete the booking. Please try again.'))
      .finally(() => setBusy(false))
  }

  // Filter tab + search, used by BOTH the cards (phones) and the grid (desktop)
  const visibleBookings = useMemo(() => {
    const q = searchText.trim().toLowerCase()
    return bookings.filter((b) => {
      if (activeFilter !== 'ALL' && b.status !== activeFilter) return false
      if (!q) return true
      return [b.referenceToken, b.customerName, b.equipment?.name, b.siteLocation].some(
        (value) => value?.toLowerCase().includes(q)
      )
    })
  }, [bookings, activeFilter, searchText])

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
      { field: 'customerName', headerName: 'CUSTOMER', flex: 1, minWidth: 140 },
      {
        field: 'equipment.name',
        headerName: 'EQUIPMENT',
        flex: 1,
        minWidth: 140,
        valueGetter: (params) => params.data.equipment?.name,
      },
      { field: 'siteLocation', headerName: 'LOCATION', flex: 1, minWidth: 130 },
      { field: 'startDate', headerName: 'START', width: 120 },
      { field: 'endDate', headerName: 'END', width: 120 },
      {
        field: 'status',
        headerName: 'STATUS',
        width: 140,
        cellRenderer: (params) => <StatusBadge status={params.value} />,
      },
      {
        headerName: '',
        width: 120,
        sortable: false,
        filter: false,
        cellRenderer: (params) => (
          <button
            onClick={() => setSelectedBooking(params.data)}
            className="border border-slate-900 text-slate-900 text-xs font-bold px-3 py-1 rounded hover:bg-slate-900 hover:text-white transition-colors"
          >
            MANAGE
          </button>
        ),
      },
    ],
    []
  )

  const summaryCards = [
    { label: 'NEW REQUESTS', value: counts.NEW, border: 'border-amber-500' },
    { label: 'ACTIVE HIRES', value: counts.IN_USE, border: 'border-slate-900' },
    { label: 'CONFIRMED', value: counts.CONFIRMED, border: 'border-green-600' },
    { label: 'TOTAL', value: counts.ALL, border: 'border-slate-400' },
  ]

  return (
    <main className="bg-slate-50 min-h-screen px-4 sm:px-8 pt-28 pb-12">
      <div className="max-w-7xl mx-auto">
        <p className="text-amber-600 text-xs font-bold tracking-widest mb-1">
          BOOKINGS
        </p>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mb-6 sm:mb-8">
          HIRE REQUESTS
        </h1>

        {loading && <p className="text-slate-600">Loading bookings...</p>}
        {error && <p className="text-red-600">{error}</p>}

        {!loading && !error && (
          <>
            {/* Summary cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
              {summaryCards.map((card) => (
                <div
                  key={card.label}
                  className={`bg-white border-l-4 ${card.border} p-3 sm:p-4 rounded-lg shadow-sm`}
                >
                  <p className="text-[10px] sm:text-xs text-slate-500 font-bold tracking-widest">
                    {card.label}
                  </p>
                  <p className="text-2xl sm:text-3xl font-black text-slate-900">
                    {card.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Search + filter tabs */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
              <input
                type="text"
                placeholder="Search ref / customer / machine"
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value)
                  setCardCount(10)
                }}
                className="w-full md:w-1/3 bg-white border border-slate-300 rounded-lg px-4 py-3 text-base md:text-sm focus:outline-none focus:ring-2 focus:ring-slate-800"
              />

              {/* One scrollable row on phones, wraps on bigger screens */}
              <div className="flex gap-2 overflow-x-auto md:overflow-visible md:flex-wrap -mx-4 px-4 md:mx-0 md:px-0 pb-1">
                {FILTER_TABS.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => {
                      setActiveFilter(tab)
                      setCardCount(10)
                    }}
                    className={`shrink-0 whitespace-nowrap px-4 py-2 text-xs sm:text-sm font-bold rounded-full transition-colors ${
                      activeFilter === tab
                        ? 'bg-slate-900 text-white'
                        : 'bg-white text-slate-600 border border-slate-300 hover:border-slate-500'
                    }`}
                  >
                    {tab.replace('_', ' ')} ({counts[tab]})
                  </button>
                ))}
              </div>
            </div>

            {/* PHONE: booking cards */}
            <div className="md:hidden space-y-3">
              {visibleBookings.length === 0 && (
                <p className="text-center text-slate-500 py-10">
                  No bookings found.
                </p>
              )}

              {visibleBookings.slice(0, cardCount).map((b) => (
                <div
                  key={b.id}
                  className="bg-white rounded-xl border border-slate-200 shadow-sm p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-[11px] font-bold tracking-widest text-amber-600">
                        {b.referenceToken}
                      </p>
                      <p className="font-black text-slate-900 truncate">
                        {b.customerName}
                      </p>
                    </div>
                    <StatusBadge status={b.status} />
                  </div>

                  <div className="mt-3 space-y-1 text-sm text-slate-600">
                    <p className="font-semibold text-slate-800">
                      {b.equipment?.name}
                    </p>
                    <p>{b.siteLocation}</p>
                    <p>
                      {b.startDate} → {b.endDate}
                    </p>
                  </div>

                  <button
                    onClick={() => setSelectedBooking(b)}
                    className="mt-4 w-full bg-slate-900 text-white font-bold text-sm py-3 rounded-lg hover:bg-amber-500 hover:text-slate-900 transition-colors"
                  >
                    MANAGE
                  </button>
                </div>
              ))}

              {visibleBookings.length > cardCount && (
                <button
                  onClick={() => setCardCount(cardCount + 10)}
                  className="w-full border border-slate-300 bg-white text-slate-700 font-bold text-sm py-3 rounded-lg"
                >
                  SHOW MORE ({visibleBookings.length - cardCount} left)
                </button>
              )}
            </div>

            {/* DESKTOP: the grid */}
            <div
              className="hidden md:block ag-theme-quartz rounded-xl overflow-hidden shadow-sm"
              style={{ height: 560, width: '100%' }}
            >
              <AgGridReact
                rowData={visibleBookings}
                columnDefs={columnDefs}
                pagination={true}
                paginationPageSize={10}
              />
            </div>
          </>
        )}

        {/* MANAGE modal: slides up from the bottom on phones, centered on bigger screens */}
        {selectedBooking && (
          <div
            className="fixed inset-0 bg-black/60 flex items-end sm:items-center justify-center sm:px-4 z-[60]"
            onClick={() => setSelectedBooking(null)}
          >
            <div
              className="bg-white w-full sm:max-w-lg rounded-t-2xl sm:rounded-lg shadow-xl overflow-hidden max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-slate-900 text-white px-5 sm:px-6 py-4 flex justify-between items-center gap-3 sticky top-0">
                <div className="min-w-0">
                  <p className="text-amber-500 text-xs font-bold tracking-widest">
                    {selectedBooking.referenceToken}
                  </p>
                  <h2 className="text-lg sm:text-xl font-black truncate">
                    {selectedBooking.customerName}
                  </h2>
                </div>
                <button
                  onClick={() => setSelectedBooking(null)}
                  className="text-3xl leading-none px-2"
                  aria-label="Close"
                >
                  ×
                </button>
              </div>

              <div className="p-5 sm:p-6 space-y-3 text-sm text-slate-700">
                <p>
                  <span className="font-bold">Phone:</span>{' '}
                  <a
                    href={`tel:${selectedBooking.customerPhone}`}
                    className="text-blue-700 underline"
                  >
                    {selectedBooking.customerPhone}
                  </a>
                </p>
                <p className="break-all">
                  <span className="font-bold">Email:</span>{' '}
                  <a
                    href={`mailto:${selectedBooking.customerEmail}`}
                    className="text-blue-700 underline"
                  >
                    {selectedBooking.customerEmail}
                  </a>
                </p>
                <p>
                  <span className="font-bold">Equipment:</span>{' '}
                  {selectedBooking.equipment?.name}
                </p>
                <p>
                  <span className="font-bold">Site:</span>{' '}
                  {selectedBooking.siteLocation}
                </p>
                <p>
                  <span className="font-bold">Dates:</span>{' '}
                  {selectedBooking.startDate} → {selectedBooking.endDate}
                </p>
                <p className="flex items-center gap-2">
                  <span className="font-bold">Current status:</span>
                  <StatusBadge status={selectedBooking.status} />
                </p>
              </div>

              <div className="px-5 sm:px-6 pb-6">
                <p className="text-xs font-bold text-slate-500 tracking-widest mb-2">
                  CHANGE STATUS
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-6">
                  {STATUSES.map((s) => (
                    <button
                      key={s}
                      onClick={() => updateStatus(s)}
                      disabled={busy || selectedBooking.status === s}
                      className={`px-3 py-3 text-xs font-bold rounded-lg transition-colors disabled:cursor-not-allowed ${
                        selectedBooking.status === s
                          ? 'bg-slate-900 text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-amber-500 disabled:opacity-60'
                      }`}
                    >
                      {s.replace('_', ' ')}
                    </button>
                  ))}
                </div>

                <button
                  onClick={deleteBooking}
                  disabled={busy}
                  className="w-full border border-red-600 text-red-600 font-bold py-3 rounded-lg hover:bg-red-600 hover:text-white transition-colors disabled:opacity-60"
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