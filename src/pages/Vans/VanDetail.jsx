import {useParams, Link} from 'react-router-dom'
import { useEffect, useState } from 'react'
import { BsArrowLeft } from "react-icons/bs";

export default function VanDetail() {
    const params = useParams()
    const [van, setVan] = useState([])
    console.log(params)

    useEffect(function() {
        fetch(`/api/vans/${params.id}`)
            .then(res => res.json())
            .then(data => setVan(data.vans))
    }, [params.id])

    console.log(van)

    return (
    <>
    {van ? (
    <>
    <div className="van-detail-container">
        <span className="all-vans"><Link to="/vans"><BsArrowLeft /> &nbsp;Back to all vans</Link></span>
        <img src={van.imageUrl} />
        <br/>
        <button className={`${van.type}-vans`}>{van.type}</button>
        <br/>
        <h1>{van.name}</h1>
        <p><strong>${van.price}</strong><small>/day</small></p>
        <p>{van.description}</p>

    </div>
    <center><button className="rent-van-btn">Rent this van</button></center>
    <br/>
    </>
    ) : <h2>Loading...</h2>}
    </>
    )
}