import './index.css'
import About from './pages/About'
import Home from './pages/Home'
import Vans, { Loader as vansLoader } from './pages/Vans/Vans'
import VanDetail from './pages/Vans/VanDetail'
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom"
import Layout from './components/layouts'
import Dashboard from './pages/Host/Dashboard'
import Income from './pages/Host/Income'
import Reviews from './pages/Host/Reviews'
import HostLayout from './components/HostLayout'
import HostVans from './pages/Host/Vans/Vans'
import HostVanDetail from './pages/Host/Vans/VansDetail.jsx'
import VanInfo from './pages/Host/Vans/VanInfo.jsx'
import VanPhotos from './pages/Host/Vans/VanPhotos'
import VanPricing from './pages/Host/Vans/VanPricing'
import NotFound from './pages/404.jsx'
import Error from './components/Error.jsx'
import "./server"

const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Layout />} >
      <Route path="*" element={<NotFound />} />        
      <Route index element={<Home/>} />
      <Route path="/about" element={<About />} />

      <Route path="vans" 
        element={<Vans />} 
        errorElement={<Error />} 
        loader={vansLoader} 
      />
      <Route path="vans/:id" element={<VanDetail />} />

      <Route path="host" element={<HostLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="income" element={<Income />} />
        <Route path="reviews" element={<Reviews />} />
        <Route path="vans" element={<HostVans />} />
        <Route path="vans/:id" element={<HostVanDetail />}>
          <Route index element={<VanInfo />} />
          <Route path="pricing" element={<VanPricing />} />
          <Route path="photos" element={<VanPhotos />} />
        </Route>
      </Route>
    </Route>
))

export default function App() {
  return (
    <RouterProvider router={router} />
  )
}

