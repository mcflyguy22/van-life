import { NavLink } from 'react-router-dom'
import { useContext } from 'react'
import { FaRegUserCircle, FaSignOutAlt } from "react-icons/fa"
import { auth } from '../api/firebase'
import AuthContext from '../api/AuthContext'
import NavMobile from './NavMobile'
import './StyleHeader.css'

export default function Header() {
    const {user, setUser} = useContext(AuthContext)

    function logOut() {
        auth.signOut()
        setUser(null)
        console.log('logged out')
    }
    
    return (
        <div className="navBar">
            <h1><NavLink to="/" id="homeTitleLink">#VANLIFE</NavLink></h1>
            <ul className="nav-desktop">
                {user && <li>
                    <NavLink 
                        to="/host"
                        className={({isActive}) => isActive ? "my-link" : ""}
                    >Host</NavLink>
                </li>}
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
                {!user && <li>
                    <NavLink 
                        to="/login"
                    ><FaRegUserCircle /></NavLink>
                </li>}
                {user && <li style={{backgroundColor: "none"}}>
                    <button onClick={logOut}><FaSignOutAlt /></button>
                </li>}
            </ul>
            <NavMobile />
      </div>
    )
}