import './index.css'
import About from './pages/About'
import Home from './pages/Home'
import Vans, { Loader as vansLoader } from './pages/Vans/Vans'
import VanDetail, { Loader as vanDetailLoader } from './pages/Vans/VanDetail'
import VanDetailInfo from './pages/Vans/VanDetailInfo.jsx'
import BookingPage from './pages/Vans/Booking.jsx'
import OrderSuccess from './pages/Vans/OrderSuccess.jsx'
import CustomerReview from './pages/Orders/CustomerReview.jsx'
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom"
import Layout from './components/layouts'
import Dashboard, { Loader as dashboardLoader } from './pages/Host/Dashboard'
import HostOrders, { Loader as orderLoader } from './pages/Host/Orders.jsx'
import OrderDetail, { Loader as orderDetailLoader } from './pages/Orders/OrderDetail.jsx'
import Reviews, { Loader as reviewsLoader } from './pages/Host/Reviews'
import HostLayout from './components/HostLayout'
import HostVans, { Loader as hostVansLoader } from './pages/Host/Vans/Vans'
import HostVanDetail, { Loader as hostVansDetailLoader } from './pages/Host/Vans/VansDetail.jsx'
import VanInfo from './pages/Host/Vans/VanInfo.jsx'
import VanPhotos from './pages/Host/Vans/VanPhotos'
import VanPricing from './pages/Host/Vans/VanPricing'
import AddVan from './pages/Host/Vans/AddVan.jsx'
import EditVan from './pages/Host/Vans/EditVan.jsx'
import NotFound from './pages/404.jsx'
import Error from './components/Error.jsx'
import Login, { Loader as loginLoader } from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import AuthRequired from './api/AuthRequired.jsx'
import { AuthProvider } from './api/AuthProvider.jsx'
import { PrimeReactProvider } from 'primereact/api';


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
      />
      <Route 
        path="/register" 
        element={<Register />} 
        loader={loginLoader}
      />

      <Route 
        path="vans" 
        element={<Vans />} 
        errorElement={<Error />} 
        loader={vansLoader} 
      />
      <Route
        path="success"
        element={<OrderSuccess />}
      />
      <Route
        path="/:id"
        element={<OrderDetail />}
        errorElement={<Error />}
        loader={orderDetailLoader}
      >
        <Route 
          path="customer-review"
          element={<CustomerReview />}
        />
      </Route>
      <Route 
        path="vans/:id" 
        element={<VanDetail />}
        errorElement={<Error />}  
        loader={vanDetailLoader}
      >
        <Route 
          index
          element={<VanDetailInfo />}
        />
        <Route
          path="booking"
          element={<BookingPage />}
        />
      </Route>
      <Route element={<AuthRequired />}>
        <Route 
          path="host" 
          element={<HostLayout />}
        >
          <Route 
            index 
            element={<Dashboard />} 
            errorElement={<Error />}
            loader={dashboardLoader}
          />
          <Route 
            path="orders"
            element={<HostOrders />}
            errorElement={<Error />}
            loader={orderLoader}
          />
          <Route 
            path="reviews" 
            element={<Reviews />} 
            errorElement={<Error />}
            loader={reviewsLoader}
          />
          <Route 
            path="vans" 
            element={<HostVans />}
            errorElement={<Error />}  
            loader={hostVansLoader}
          />
          <Route 
            path="vans/add-van"
            element={<AddVan />}
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
            <Route
              path="edit-van"
              element={<EditVan />}
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
    <PrimeReactProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </PrimeReactProvider>
  )
}

