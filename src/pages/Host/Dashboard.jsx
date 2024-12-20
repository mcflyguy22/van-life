import { Link, defer, Await, useLoaderData, useOutletContext } from "react-router-dom"
import { getHostVans, getHostOrders, getHostReviews } from "../../api/api"
import { BsStarFill } from "react-icons/bs"
import { Suspense, useState } from "react"
import './StyleDashboard.css'

export async function Loader() {
    return defer({ hostVans: getHostVans(), hostOrders: getHostOrders(), reviews: getHostReviews() })
}

export default function Host() {
    const dataPromise = useLoaderData()
    const [income] = useOutletContext()
    const [reviewsData, setReviewsData] = useState(null)
    const [overallRating, setOverallRating] = useState(0)

    console.log("overalll rating dashboard: ", overallRating)

    function renderReviewsData(reviews) {
        setReviewsData(reviews)
        var ratingArr = []
        const reviewMap = reviews.map(({vanRating}) => ratingArr.push(Number(vanRating)))
        const reviewTotal = reviews.reduce((n, {vanRating}) => n + Number(vanRating), 0)
        const ratingAvg = (reviewTotal / ratingArr.length).toFixed(1)
        setOverallRating(ratingAvg)
        
    }

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
                        <img src={van.imageUrl[0]}/>
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
            <Link to="vans/add-van" style={{width: "100%"}}><button className="add-van-btn">Add a Van!</button></Link>
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
                <h2>${income}</h2>
                </div>
                <div className="host-dash-details">
                    <span><Link to="orders">Details</Link></span>
                </div>
            </div>
            <div className="host-dash-review">
                <h4>Review Score</h4>
                {isNaN(overallRating) ? <span className="noReviews">You have no reviews.</span> : <><BsStarFill style={{color: "orange", height: "24px"}}/>&nbsp;<strong>{(!isNaN(overallRating)) ? overallRating : 0}</strong>/5</>}

                <div className="host-dash-details">
                    <span><Link to="reviews">Details</Link></span>
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
                <div>
                    <Suspense fallback={<h2></h2>}>
                        <Await resolve={dataPromise.reviews} errorElement={<p>Error loading package location!</p>}>
                            {renderReviewsData}
                        </Await>
                    </Suspense>
                </div>
            </div>
        </>
    )
}