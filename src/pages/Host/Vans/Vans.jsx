import {Link, useLoaderData } from 'react-router-dom'
import { getHostVans } from '../../../api'
import { requireAuth } from '../../../utils'

export async function Loader({ params }) {
    await requireAuth()
    return getHostVans(params.id)
}

export default function Vans() {
    const hostVans = useLoaderData()
    console.log(hostVans)

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
        <div className="vans-container">
            <div className="host-vans">
                <h1>Your listed vans</h1>
                {hostVansElements}
            </div>
        </div>
    )
}