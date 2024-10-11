import './index.css'
import About from './pages/About'
import Home from './pages/Home'
import Vans, { Loader as vansLoader } from './pages/Vans/Vans'
import VanDetail, { Loader as vanDetailLoader } from './pages/Vans/VanDetail'
import { RouterProvider, Navigate, createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom"
import Layout from './components/layouts'
import Dashboard, { Loader as dashboardLoader } from './pages/Host/Dashboard'
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
import Login, { Loader as loginLoader } from './pages/Login.jsx'
import Register from './pages/Register.jsx'
// import "./server"
import AuthRequired from './api/AuthRequired.jsx'
import { AuthProvider } from './api/AuthProvider.jsx'


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
        // action={loginAction}
      />
      <Route 
        path="/register" 
        element={<Register />} 
        loader={loginLoader}
        // action={loginAction}
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
        errorElement={<Error />}  
        loader={vanDetailLoader}
      />
      <Route element={<AuthRequired />}>
        <Route 
          path="host" 
          element={<HostLayout />}
        >
          <Route 
            index 
            element={<Dashboard />} 
            loader={dashboardLoader}
          />
          <Route 
            path="income" 
            element={<Income />} 
          />
          <Route 
            path="reviews" 
            element={<Reviews />} 
          />
          <Route 
            path="vans" 
            element={<HostVans />}
            errorElement={<Error />}  
            loader={hostVansLoader}
          />
          <Route 
            path="vans/:id" 
            element={<HostVanDetail />}
            errorElement={<Error />} 
            loader={hostVansDetailLoader}
          >
            <Route 
              index 
              element={<VanInfo />} 
            />
            <Route 
              path="pricing" 
              element={<VanPricing />} 
            />
            <Route 
              path="photos" 
              element={<VanPhotos />} 
            />
          </Route>
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
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

