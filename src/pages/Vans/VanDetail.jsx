import { Link, useLocation, useLoaderData, defer, Await } from 'react-router-dom'
import { BsArrowLeft } from "react-icons/bs";
import { getVan } from '../../api/api'
import { Suspense } from 'react';

export function Loader({ params }) {
    return defer({van: getVan(params.id)})
}

export default function VanDetail() {
    const dataPromise = useLoaderData()
    const location = useLocation()
    const search = location.state?.search || ""
    const type = location.state?.type || "all"

    function renderVanDetailElements(van) {
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
    return (
        <>
            <Suspense fallback={<h2>Loading Van Details...</h2>}>
                <Await resolve={dataPromise.van}>
                    {renderVanDetailElements}
                </Await>
            </Suspense>
        </>
    )
}