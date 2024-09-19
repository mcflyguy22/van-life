import './index.css'
import About from './About'
import Home from './Home'
import Vans from './Vans'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"

export default function App() {
  return (
    <BrowserRouter>
      <div className="navBar">
        <h1 className="home-title"><Link to="/">#VANLIFE</Link></h1>
        <ul>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
          <Link to="/vans">Vans</Link>
          </li>
        </ul>
      </div>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/vans" element={<Vans/>} />
      </Routes>
      <div className="footer">
        <span className="copyright">&#169;2022 #VANLIFE</span>
      </div>
    </BrowserRouter>
  )
}

