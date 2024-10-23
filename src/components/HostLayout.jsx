import { NavLink, Outlet  } from 'react-router-dom'
import { useState } from 'react'
import './StyleHostLayout.css'
export default function HostLayouts() {
    const [income, setIncome] = useState(0)
    return (
        <div className="host-layout-wrapper">
            <div className="host-navBar">
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
                            to="orders"
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
            <Outlet context={[income, setIncome]}/>
        </div>
    )
}