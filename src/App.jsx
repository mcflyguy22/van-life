import './index.css'
import About from './pages/About'
import Home from './pages/Home'
import Vans, { Loader as vansLoader } from './pages/Vans/Vans'
import VanDetail, { Loader as vanDetailLoader } from './pages/Vans/VanDetail'
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom"
import Layout from './components/layouts'
import Dashboard from './pages/Host/Dashboard'
import Income from './pages/Host/Income'
import Reviews from './pages/Host/Reviews'
import HostLayout from './components/HostLayout'
import HostVans, { Loader as hostVansLoader } from './pages/Host/Vans/Vans'
import HostVanDetail, { Loader as hostVansDetailLoader } from './pages/Host/Vans/VansDetail.jsx'
import VanInfo from './pages/Host/Vans/VanInfo.jsx'
import VanPhotos from './pages/Host/Vans/VanPhotos'
import VanPricing from './pages/Host/Vans/VanPricing'
import NotFound from './pages/404.jsx'
import Error from './components/Error.jsx'
import Login, { Loader as loginLoader, action as loginAction } from './pages/Login.jsx'
import "./server"
import { requireAuth } from "./utils"

const router = createBrowserRouter(createRoutesFromElements(
    <Route 
      path="/" 
      element={<Layout />} 
    >       
      <Route 
        index 
        element={<Home/>} 
      />
      <Route 
        path="/about" 
        element={<About />} 
      />
      <Route 
        path="/login" 
        element={<Login />} 
        loader={loginLoader}
        action={loginAction}
      />

      <Route 
        path="vans" 
        element={<Vans />} 
        errorElement={<Error />} 
        loader={vansLoader} 
      />
      <Route 
        path="vans/:id" 
        element={<VanDetail />} 
        loader={vanDetailLoader}
      />

      <Route 
        path="host" 
        element={<HostLayout />}
      >
        <Route 
          index 
          element={<Dashboard />} 
          loader={async ({request}) => await requireAuth(request)}
        />
        <Route 
          path="income" 
          element={<Income />} 
          loader={async ({request}) => await requireAuth(request)}
        />
        <Route 
          path="reviews" 
          element={<Reviews />} 
          loader={async ({request}) => await requireAuth(request)}
        />
        <Route 
          path="vans" 
          element={<HostVans />} 
          loader={hostVansLoader}
        />
        <Route 
          path="vans/:id" 
          element={<HostVanDetail />}
          loader={hostVansDetailLoader}
        >
          <Route 
            index 
            element={<VanInfo />} 
            loader={async ({request}) => await requireAuth(request)}
          />
          <Route 
            path="pricing" 
            element={<VanPricing />} 
            loader={async ({request}) => await requireAuth(request)}
          />
          <Route 
            path="photos" 
            element={<VanPhotos />} 
            loader={async ({request}) => await requireAuth(request)}
          />
        </Route>
      </Route>
      <Route 
        path="*" 
        element={<NotFound />} 
      /> 
    </Route>
))

export default function App() {
  return (
    <RouterProvider router={router} />
  )
}

