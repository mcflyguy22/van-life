import {useEffect, useState} from 'react'
import { Link, useSearchParams } from 'react-router-dom'

export default function Vans() {
    const [vansData, setVansData] = useState([])
    const [searchParams, setSearchParams ] = useSearchParams()
    const [activeFilter, setActiveFilter ] = useState([])
    const typeFilter = searchParams.get("type")

    console.log(typeFilter)
    useEffect(function() {
        fetch("/api/vans")
            .then(res => res.json())
            .then(data => setVansData(data.vans))
    }, [])

    console.log(vansData)

    const displayedVans = typeFilter ? 
        vansData.filter(van => van.type.toLowerCase() === typeFilter) 
        : vansData

    const vansElements = displayedVans.map((van, index) => (
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

    function handleFilterChange(key, value) {
        setSearchParams(prevParams => {
          if (value === null) {
            prevParams.delete(key)
          } else {
            prevParams.set(key, value)
          }
          return prevParams
        })
      }
    
    
    function checkUrl(value) {
        const url = window.location.href;
        const searchString = value

        const containsString = url.includes(searchString)
        console.log("result:", containsString)
    }

    
    return (
        <div className="vans-container">
            <div className="vans-filters">
                <h1>Explore our van options</h1>
                <div className="vans-filter-options">
                    <button onClick={() => handleFilterChange("type", "simple")} className={typeFilter === "simple" ? "simple-vans-active" : "simple-vans"}>Simple</button>
                    <button onClick={() => handleFilterChange("type", "luxury")} className={typeFilter === "luxury" ? "luxury-vans-active" : "luxury-vans"}>Luxury</button>
                    <button onClick={() => handleFilterChange("type","rugged")} className={typeFilter === "rugged" ? "rugged-vans-active" : "rugged-vans"}>Rugged</button>
                    {typeFilter && <button onClick={() => handleFilterChange("type", null)} className="clear-filter">Clear filters</button>}
                </div>
            </div>
            <div className="vans-list">
                {vansElements}
            </div>
        </div>
    )
}