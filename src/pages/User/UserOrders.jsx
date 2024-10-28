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
                <div>                    
                    {orderData && <><div style={{fontSize: "20px", display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                        <strong>{orderData ? (orderData.length > 0) ? `Your transactions (${orderData.length})` : "You have no transactions" : ""}</strong>
                    </div>
                    <center><p style={{marginTop: "20px"}}>{orderData ? (!orderData.length > 0) ? <Link to="/vans"><button className="van-search-btn">Find your van</button></Link> : "" : ""}</p></center></>
                    }
                    {orderDataElements}
                </div>
            </div>
            <Suspense fallback={<h2>Loading Orders...</h2>}>
                <Await resolve={dataPromise.orders}>
                    {renderOrders}
                </Await>
            </Suspense>
        </div>
    )
}