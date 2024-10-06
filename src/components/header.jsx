import { NavLink } from 'react-router-dom'
import { FaRegUserCircle } from "react-icons/fa"

export default function Header() {
    function fakeLogOut() {
        localStorage.removeItem("loggedin")
    }
    return (
        <div className="navBar">
            <h1 className="home-title"><NavLink to="/">#VANLIFE</NavLink></h1>
            <ul>
                <li>
                    <NavLink 
                        to="/host"
                        className={({isActive}) => isActive ? "my-link" : ""}
                    >Host</NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/about"
                        className={({isActive}) => isActive ? "my-link" : ""}
                    >About</NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/vans"
                        className={({isActive}) => isActive ? "my-link" : ""}
                    >Vans</NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/login"
                    ><FaRegUserCircle /></NavLink>
                </li>
                <li>
                    <button onClick={fakeLogOut}>X</button>
                </li>
            </ul>
      </div>
    )
}