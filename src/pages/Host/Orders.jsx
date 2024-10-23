import {Link, useLoaderData, defer, Await, useOutletContext } from 'react-router-dom'
import { getHostOrders } from '../../api/api'
import { Suspense, useState } from 'react'
import Charts from '../../../public/barchart.png'
import './StyleOrders.css'

export async function Loader() {
    return defer({hostOrders: getHostOrders()})
}

export default function HostOrders() {
    const dataPromise = useLoaderData()
    const [formData, setFormData] = useState()
    const [mount, setMount] = useState(false)
    const income = useOutletContext()[0]
    const setIncome = useOutletContext()[1]
    console.log(dataPromise)

    function setFormDataFunc(data) {
        setFormData(data);
        setMount(true);
    }
    
    function renderHostOrderElements(hostOrders) {
        if (!mount) {
            setFormDataFunc(hostOrders)
        } else {
            if (hostOrders.length > 0) { 
                const orderTotals = formData.reduce((n, {orderTotal}) => n + orderTotal, 0)
                setIncome(orderTotals)
                const hostOrdersElements = hostOrders.map((order, index) => (
                    <div key={index} style={{display: "flex", flexDirection: "column"}}>
                        <div key={order.id} className="host-order">
                                <div>
                                    <h3>{order.vanName} {order.lastName.slice(0, 1)} (${order.orderTotal})</h3>
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
                ))

                return (
                    <>
                        <div>
                            <h1 style={{fontSize: "32px"}}>Income</h1>
                            <p>Last <span>30 days</span></p>
                            <h2 style={{fontSize: "32px"}}>${income}</h2>
                            <br/>
                            <img src={Charts} style={{marginBottom: "20px", width: "100%"}} />
                            <div style={{fontSize: "20px", display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                                <strong>Your transactions ({hostOrders.length})</strong>
                                <p style={{fontSize: "14px", color: "#4d4d4d"}}>Last <span style={{textDecoration: "underline", fontWeight: "bold"}}>30 days</span></p>
                            </div>
                            {hostOrdersElements}
                        </div>
                    </>            
                )
            } else { return <p>You currently have no orders.</p>}
        }
    }

    return (
        <div className="orders-container">
            <div className="orders">
                <Suspense fallback={<h2>Loading Host Orders...</h2>}>
                    <Await resolve={dataPromise.hostOrders}>
                        {renderHostOrderElements}
                    </Await>
                </Suspense>
            </div>
        </div>
    )
}