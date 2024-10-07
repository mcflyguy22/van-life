import {Link, useLoaderData, defer, Await } from 'react-router-dom'
import { getHostVans } from '../../../api'
import { requireAuth } from '../../../utils'
import { Suspense } from 'react'

export async function Loader({ params, request }) {
    await requireAuth(request)
    return defer({hostVans: getHostVans(params.id)})
}

export default function Vans() {
    const dataPromise = useLoaderData()
    console.log(dataPromise.hostVans)
    
    function renderHostVanElements(hostVans) {
        const hostVansElements = hostVans.map((van, index) => (
            <div key={index}>
                <Link 
                    to={`/host/vans/${van.id}`} 
                    aria-label={`View details for ${van.name}`}
                    className="host-van-link"
                    state={van.type}
                >
                <div key={van.id} className="host-van">
                        <img src={van.imageUrl}/>
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
                {hostVansElements}
            </>            
        )
    }

    return (
        <div className="vans-container">
            <div className="host-vans">
                <h1>Your listed vans</h1>
                <Suspense fallback={<h2>Loading Host Vans...</h2>}>
                    <Await resolve={dataPromise.hostVans}>
                        {renderHostVanElements}
                    </Await>
                </Suspense>
            </div>
        </div>
    )
}