import './StyleUserOrders.css'
import { getUserOrders } from '../../api/api'
import { defer, Await, useLoaderData, Link } from 'react-router-dom'
import { Suspense, useState } from 'react'

export async function Loader() {
    return defer({orders: getUserOrders()})
}

export default function UserOrders() {
    const dataPromise = useLoaderData()
    const [orderData, setOrderData] = useState()
    // const [income, setIncome, orderData, setOrderData] = useOutletContext()
    
    const orderDataElements = orderData ? 
        orderData.map((order, index) => (
        <div key={index} style={{display: "flex", flexDirection: "column"}}>
            <div key={order.id} className="host-order">
                    <div>
                        <h3>{order.vanName} (${order.orderTotal})</h3>
                        <p><span style={{fontWeight: "bold"}}>Order Date: </span>{order.createdOn}</p>
                        <p><span style={{fontWeight: "bold"}}>Status: </span>{order.status}</p>                                
                    </div>
            <Link 
                to={`/${order.id}`} 
                aria-label={`View details for ${order.name}`}
                className="host-van-link"
                state={order.type}
                style={{textDecoration: "underline", fontSize: "14px"}}
            >View/Edit
            </Link>
            </div>
        </div>
        )) : <p>You currently have no orders.</p>

    function renderOrders(orders) {
        setOrderData(orders)
    }

    console.log("orderData: ", orderData)
    return (
        <div className="orders-container">
            <div className="orders">
                {/* <p style={{color: "black"}}>User orders here</p> */}
                {orderData ? 
                <div>                    
                    <div style={{fontSize: "20px", display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                        <strong>Your transactions ({orderData ? orderData.length : 0})</strong>
                        <span style={{fontSize: "14px", color: "#4d4d4d"}}>Last <text style={{textDecoration: "underline", fontWeight: "bold"}}>30 days</text></span>
                    </div>
                    {orderDataElements}
                </div>
                : <p style={{color: "black"}}>You have no order history.</p>}
            </div>
            <Suspense fallback={<h2>Loading Orders...</h2>}>
                <Await resolve={dataPromise.orders}>
                    {renderOrders}
                </Await>
            </Suspense>
        </div>
    )
}