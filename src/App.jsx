import { Route, Routes } from "react-router-dom";
import LandingPage from './pages/LandingPage'
import Navbar from './components/Navbar'
import EquipmentPage from './pages/EquipmentPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import Footer from './components/Footer'
import AdminLoginPage from './pages/AdminLoginPage'
import ProtectedRoute from './components/ProtectedRoute'
import AdminDashboardPage from './pages/AdminDashboardPage'
import ScrollToTop from "./components/ScrollToTop"
import WhatsAppButton from "./components/WhatsAppButton"
function App (){


  return(

    <>
    <ScrollToTop />
    <Navbar />
    <Routes>
  <Route path="/about" element={<AboutPage />} />
  <Route path="/" element={<LandingPage />} />
  <Route path="/equipment" element={<EquipmentPage />} />
  <Route path="/contact" element={<ContactPage />} />
  <Route path="/admin/login" element={<AdminLoginPage />} />
<Route
  path="/admin/dashboard"
  element={
    <ProtectedRoute>
      <AdminDashboardPage />
    </ProtectedRoute>
  }
/>
    </Routes>
     <Footer />
     <WhatsAppButton />
    </>
  )
}

export default App