import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function AdminLoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    setError('')

    fetch('http://localhost:8080/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Invalid username or password')
        }
        return response.json()
      })
      .then((data) => {
        localStorage.setItem('adminToken', data.token)
        navigate('/admin/dashboard')
      })
      .catch((err) => {
        setError('Invalid username or password')
      })
  }

  return (
    <main className="bg-slate-900 min-h-screen  overflow-hidden flex items-center justify-center px-8 bg-slate-950 relative"
      
    
    >
       <div className="absolute inset-0  pointer-events-none bg-[url('/hero-excavator.jpg')] bg-cover bg-center opacity-30"></div>
      
      <div className=" rounded-2xl shadow-2xl relative   sm:max-w-lg w-full max-w-md overflow-hidden">
        <div className="bg-amber-500 px-8 py-8">
          <h1 className="text-2xl font-black text-slate-900">ADMIN LOGIN</h1>
          <p className="text-slate-800 font-bold text-sm">LJ Plant Hire management</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          {error && (
            <p className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded">
              {error}
            </p>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-200 tracking-widest mb-2">
              USERNAME
            </label>
            <input
              type="text"
              value={username}
              placeholder="Enter your username"
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-slate-300 rounded-lg px-4 py-3 text-slate-900 placeholder-slate-400"
              required
            />
          </div>

          <div >
            <label className="block text-xs font-bold text-slate-200 tracking-widest mb-2">
    PASSWORD
  </label>
  <div className="relative">
    <input
      type={showPassword ? 'text' : 'password'}
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      placeholder="******"
      className="w-full bg-slate-300 rounded-lg mb-6 px-4 py-3 text-slate-900 placeholder-slate-400"
      required
    />
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute right-3 top-3 text-xs text-slate-500"
    >
      {showPassword ? 'HIDE' : 'SHOW'}
    </button>
  </div>
          </div>

          <button
            type="submit"
            className="w-full bg-slate-900 text-white font-bold py-4 rounded-lg hover:bg-amber-500 hover:text-slate-900 transition-colors"
          >
            LOGIN
          </button>
        </form>
      </div>
      
    </main>
  )
}

export default AdminLoginPage