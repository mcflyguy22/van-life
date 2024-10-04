import { Link, useLocation, useLoaderData } from 'react-router-dom'
import { BsArrowLeft } from "react-icons/bs";
import { getVans } from '../../api'

export function Loader({ params }) {
    return getVans(params.id)
}

export default function VanDetail() {
    const van = useLoaderData()
    const location = useLocation()
    const search = location.state?.search || ""
    const type = location.state?.type || "all"

    return (
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
    )
}