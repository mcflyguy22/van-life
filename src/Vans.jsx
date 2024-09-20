import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'

export default function Vans() {
    const [vansData, setVansData] = useState([])

    useEffect(function() {
        fetch("/api/vans")
            .then(res => res.json())
            .then(data => setVansData(data.vans))
    }, [])

    console.log(vansData)

    const vansElements = vansData.map((van, index) => (
            <div key={van.id} className="van">
                <Link 
                    to={`/vans/${van.id}`} 
                    aria-label={`View details for ${van.name}, priced at ${van.price} per day`}
                >
                <img className="van-image" src={van.imageUrl}/><br/>
                <div className="van-details-wrap">
                    <div className="van-name-btn">
                        {van.name}
                        <button className={van.type + "-vans"}>{van.type}</button>
                    </div>
                    <div className="van-price">
                        ${van.price}<br/>
                        <h5 className="timeframe">/day</h5>
                    </div>
                </div>
                </Link>            
            </div>
    ))
    
    return (
        <div className="vans-container">
            <div className="vans-filters">
                <h1>Explore our van options</h1>
                <div className="vans-filter-options">
                    <button className="simple-vans">Simple</button>
                    <button className="luxury-vans">Luxury</button>
                    <button className="rugged-vans">Rugged</button>
                    <a href="#">Clear filters</a>
                </div>
            </div>
            <div className="vans-list">
                {vansElements}
            </div>
        </div>
    )
}