import { NavLink, Outlet  } from 'react-router-dom'

export default function HostLayouts() {
    return (
        <div className="host-layout-wrapper">
            <div className="navBar">
                <ul>
                    <li>
                        <NavLink 
                            to="."
                            end
                            className={({isActive}) => isActive ? "my-link" : ""}
                        >Dashboard</NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="income"
                            className={({isActive}) => isActive ? "my-link" : ""}
                        >Income</NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="vans"
                            className={({isActive}) => isActive ? "my-link" : ""}
                        >Vans</NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="reviews"
                            className={({isActive}) => isActive ? "my-link" : ""}    
                        >Reviews</NavLink>
                    </li>
                </ul>
            </div>
            <Outlet />
        </div>
    )
}