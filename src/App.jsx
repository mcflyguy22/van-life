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
            <Route path="/host/income" element={<Income />} />
            <Route path="/host/reviews" element={<Reviews />} />
          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

