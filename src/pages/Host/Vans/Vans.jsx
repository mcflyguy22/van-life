import {Link, useLoaderData, defer, Await } from 'react-router-dom'
import { getHostVans } from '../../../api/api'
import { Suspense } from 'react'
import './StyleVans.css'


export async function Loader() {
    return defer({hostVans: getHostVans()})
}

export default function Vans() {
    const dataPromise = useLoaderData()
    
    function renderHostVanElements(hostVans) {
        if (hostVans.length > 0) {
            const hostVansElements = hostVans.map((van, index) => (
            <div key={index}>
                <Link 
                    to={`/host/vans/${van.id}`} 
                    aria-label={`View details for ${van.name}`}
                    className="host-van-link"
                    state={van.type}
                >
                <div key={van.id} className="host-van">
                        <img src={van.imageUrl[0]}/>
                        <div>
                            <strong>{van.name}</strong>
                            <p>${van.price}/day</p>
                        </div>
                </div>
                </Link>
            </div>
        ))

        return (
            <>
                <span style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}><h1>Your listed vans</h1><Link to="add-van" className="add-van-link">+<span className="addvan">&nbsp; Add Van</span></Link></span>
                {hostVansElements}
                <Link to="add-van"><button className="add-van-btn">Add a Van!</button></Link>
            </>            
        )
    } else { return (
        <>
        <p>You currently have no listed vans. <Link style={{color: "#FF8C38"}} to="add-van">Click here to add a van!</Link></p>
        </>
        )
    }
}

    return (
        <div className="vans-container">
            <div className="host-vans">
                <Suspense fallback={<h2>Loading Host Vans...</h2>}>
                    <Await resolve={dataPromise.hostVans}>
                        {renderHostVanElements}
                    </Await>
                </Suspense>
            </div>
        </div>
    )
}