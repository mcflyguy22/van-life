import { NavLink, Outlet  } from 'react-router-dom'

export default function HostLayouts() {
    return (
        <div className="host-layout-wrapper">
            <div className="navBar">
                <ul>
                    <li>
                        <NavLink 
                            to="/host"
                            className={({isActive}) => isActive ? "" : ""}
                        >Dashboard</NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/host/income"
                            className={({isActive}) => isActive ? "my-link" : ""}
                        >Income</NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/host/reviews"
                            className={({isActive}) => isActive ? "my-link" : ""}    
                        >Reviews</NavLink>
                    </li>
                </ul>
            </div>
            <Outlet />
        </div>
    )
}