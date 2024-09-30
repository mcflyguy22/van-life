import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'


export default function Vans() {
    const [hostVans, setHostVans] = useState([])

    useEffect(function() {
        fetch("/api/host/vans")
            .then(res => res.json())
            .then(data => setHostVans(data.vans))
    }, [])

    console.log(hostVans)
    
    const hostVansElements = hostVans.map((van, index) => (
        <>
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
        </>
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