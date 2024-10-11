import {Link, useLoaderData, defer, Await } from 'react-router-dom'
import { getHostVans } from '../../../api/api'
// import { requireAuth } from '../../../AuthRequired'
// import AuthRequired from '../../../api/AuthRequired'
import { Suspense } from 'react'
import { auth } from '../../../api/firebase'


export async function Loader() {
    // await AuthRequired(request)
    return defer({hostVans: getHostVans()})
}

export default function Vans() {
    const dataPromise = useLoaderData()
    console.log(dataPromise.hostVans)
    const uid = auth.currentUser.uid
    console.log(uid)
    
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