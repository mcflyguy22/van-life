import {useParams, Link, useLocation} from 'react-router-dom'
import { useEffect, useState } from 'react'
import { BsArrowLeft } from "react-icons/bs";

export default function VanDetail() {
    const params = useParams()
    const [van, setVan] = useState([])
    const location = useLocation()
    const search = location.state?.search || ""
    const type = location.state?.type || "all"
    console.log(search)

    useEffect(function() {
        fetch(`/api/vans/${params.id}`)
            .then(res => res.json())
            .then(data => setVan(data.vans))
    }, [params.id])

    return (
    <>
    {van ? (
    <>
    <div className="van-detail-container">
        <span className="all-vans"><Link to={`..${search}`} relative="path"><BsArrowLeft /> &nbsp;Back to {type} vans</Link></span>
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