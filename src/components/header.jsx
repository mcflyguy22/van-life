import { NavLink, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { FaRegUserCircle } from "react-icons/fa"
import { auth } from '../api/firebase'
import AuthContext from '../api/AuthContext'

export default function Header() {
    const navigate = useNavigate()
    const {user, setUser} = useContext(AuthContext)

    function logOut() {
        auth.signOut()
        setUser(null)
        navigate("/login")
        console.log('logged out')
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
                    <button onClick={logOut}>X</button>
                </li>
            </ul>
      </div>
    )
}