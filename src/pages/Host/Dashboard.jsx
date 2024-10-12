import { Link, defer, Await, useLoaderData } from "react-router-dom"
import { getHostVans } from "../../api/api"
import { BsStarFill } from "react-icons/bs"
import { Suspense } from "react"

export async function Loader() {
    return defer({ hostVans: getHostVans() })
}

export default function Host() {
    const dataPromise = useLoaderData()

    function renderVanElements(hostVans) {
        if (hostVans.length > 0) {
            const vansElements = hostVans.map((van, index) => (
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
                            <p style={{fontWeight: "bold", fontSize: "20px"}}>
                            {van.name}
                            </p>
                            <p>${van.price}/day</p>
                        </div>
                </div>
                </Link>
            </div>
        ))

        return (
            <>
            {vansElements}
            <Link to="vans/add-van"><button className="add-van-btn">Add a Van!</button></Link>
            </>
        )
    } else {
        return (
            <p>You currently have no listed vans. <Link style={{color: "#FF8C38"}} to="add-van">Click here to add a van!</Link></p>
        )
    }
}
    return (
        <>
            <div className="host-dash-head">
                <div>
                <h1>Welcome!</h1>
                <p>Income last <span>30 days</span></p>
                <h2>$2,260</h2>
                </div>
                <div className="host-dash-details">
                    <span>Details</span>
                </div>
            </div>
            <div className="host-dash-review">
                <h4>Review Score</h4>
                <BsStarFill style={{color: "orange", height: "24px"}}/>&nbsp;<strong>5.0</strong>/5
                <div className="host-dash-details">
                    <span>Details</span>
                </div>
            </div>
            <div className="host-dash-vans">
                <div>
                    <h4>Your listed vans</h4>
                    <span><Link to="vans">View all</Link></span>
                </div>
                <div className="host-dash-vanlist">
                    <Suspense fallback={<h2>Loading Vans...</h2>}>
                        <Await resolve={dataPromise.hostVans}>
                            {renderVanElements}
                        </Await>
                    </Suspense>
                </div>
            </div>
        </>
    )
}