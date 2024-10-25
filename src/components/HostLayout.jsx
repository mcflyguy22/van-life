import { NavLink, Outlet, defer, Await, useLoaderData  } from 'react-router-dom'
import { Suspense, useState } from 'react'
import './StyleHostLayout.css'
import { getHostVans, getHostOrders } from '../api/api'

export async function Loader() {
    return defer({ hostVans: getHostVans(), hostOrders: getHostOrders() })
}

export default function HostLayouts() {
    const dataPromise = useLoaderData()
    const [income, setIncome] = useState(0)
    const [orderData, setOrderData] = useState(null)

    function renderOrderData(hostOrders) {
        setOrderData(hostOrders)

        const orderTotals = hostOrders.reduce((n, {orderTotal}) => n + orderTotal, 0)
        setIncome(orderTotals)

        return console.log(orderTotals)
    }

    console.log("income", income)

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
                <div>
                    <Suspense fallback={<h2></h2>}>
                        <Await resolve={dataPromise.hostOrders} errorElement={<p>Error loading package location!</p>}>
                            {renderOrderData}
                        </Await>
                    </Suspense>
                </div>
            </div>
            <Outlet context={[income, setIncome, orderData, setOrderData]}/>
        </div>
    )
}