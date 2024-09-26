import './index.css'
import About from './pages/About'
import Home from './pages/Home'
import Vans from './pages/Vans/Vans'
import VanDetail from './pages/Vans/VanDetail'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from './components/layouts'
import Dashboard from './pages/Host/Dashboard'
import Income from './pages/Host/Income'
import Reviews from './pages/Host/Reviews'
import HostLayout from './components/HostLayout'
import HostVans from './pages/Host/Vans/Vans'
import HostVanDetail from './pages/Host/Vans/VansDetail.jsx'
import "./server"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Layout />}>        
          <Route index element={<Home/>} />
          <Route path="/about" element={<About />} />

          <Route path="vans">
            <Route index element={<Vans />} />
            <Route path=":id" element={<VanDetail />} />
          </Route>

          <Route path="host" element={<HostLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="income" element={<Income />} />
            <Route path="reviews" element={<Reviews />} />
            <Route path="vans" element={<HostVans />} />
            <Route path="vans/:id" element={<HostVanDetail />} />
          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

