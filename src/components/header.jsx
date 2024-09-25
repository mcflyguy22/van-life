import { NavLink } from 'react-router-dom'

export default function Header() {
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
            </ul>
      </div>
    )
}