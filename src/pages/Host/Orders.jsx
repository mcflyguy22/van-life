import {Link, useOutletContext, defer, Await, useLoaderData } from 'react-router-dom'
import './StyleOrders.css'
import IncomeChart from './IncomeChart'
import { getHostOrders } from '../../api/api'
import { Suspense } from 'react'

export async function Loader() {
    return defer({orders: getHostOrders()})
}

export default function HostOrders() {
    const dataPromise = useLoaderData()
    const [income, setIncome, orderData, setOrderData] = useOutletContext()
    
    function renderOrders(orders) {
        setOrderData(orders)
    }

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

    return (
        <div className="orders-container">
            <div className="orders">
                {orderData ? <div>
                    <h1 style={{fontSize: "32px"}}>Income</h1>
                    <p style={{margin: "0"}}>Last <span>30 days</span></p>
                    <h2 style={{fontSize: "24px", marginTop: "8px"}}>${income}</h2>
                    <br/>
                    {orderData ? <IncomeChart data={orderData}/> : <p style={{color: "black"}}>You have no sales data to display</p>}
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