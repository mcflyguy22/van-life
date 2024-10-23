import { Suspense } from 'react';
import { getHostReviews } from '../../api/api';
import { useLoaderData, defer, Await } from 'react-router-dom';
import { Rating } from '@mui/material';
import ProgressBar from 'react-bootstrap/ProgressBar';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BsStarFill } from 'react-icons/bs';
import './StyleReviews.css'

export async function Loader() {
    return defer({reviews: getHostReviews()})
}

export default function Reviews() {
   
    const dataPromise = useLoaderData()

    function renderReviewDetailElements(reviewsData) {
        if (reviewsData.length > 0) { 
            var ratings = []
            const reviewMap = reviewsData.map(({vanRating}) => ratings.push(Number(vanRating)))
            const reviewTotal = reviewsData.reduce((n, {vanRating}) => n + Number(vanRating), 0)
            console.log(ratings)
            const overallRating = (reviewTotal / ratings.length).toFixed(1)
            const fiveStar = Math.round((ratings.filter(x => x === 5).length / reviewsData.length) * 100)
            const fiveStarCount = ratings.filter(x => x === 5).length
            const fourStar = Math.round((ratings.filter(x => x === 4).length / reviewsData.length) * 100)
            const fourStarCount = ratings.filter(x => x === 4).length
            const threeStar = ratings.filter(x => x === 3).length
            const threeStarCount = ratings.filter(x => x === 3).length
            const twoStar = ratings.filter(x => x === 2).length
            const twoStarCount = ratings.filter(x => x === 2).length
            const oneStar = ratings.filter(x => x === 1).length
            const oneStarCount = ratings.filter(x => x === 1).length

            console.log(fiveStar, fourStar, threeStar, twoStar, oneStar)

            const reviewElements = reviewsData.map((review) => (
            <div key={review.id}>
                <div className="review">
                    <div className="review-stars">
                    <Rating
                        name="vanRating"
                        value={review.vanRating}
                        readOnly={true}
                    />
                    </div>
                    <div className="info">
                        <p className="name">{review.name}</p>
                        <p className="date">{review.reviewDate}</p>
                    </div>
                    <p>{review.vanReview}</p>
                </div>
                <hr />
            </div>
        ))

        return (
            <section className="host-reviews">
                <div className="top-text">
                <h1 style={{fontSize: "32px"}}>Your reviews</h1>
                    <p>
                        Last <span style={{fontWeight: "bold", textDecoration: "underline"}}>30 days</span>
                    </p>
                    <br/>
                    <span style={{display: "flex", fontSize: "28px", alignItems: "center"}}><b>{overallRating}</b>&nbsp;<BsStarFill style={{color: "orange", height: "18px"}}/>&nbsp;<span style={{fontSize: "16px", fontWeight: "bold"}}>Overall Rating</span></span>
                </div>
                <div style={{backgroundColor: "#FFF8EE", border: "1px solid whitesmoke", borderRadius: "6px", padding: "8px"}}>
                    <div style={{display: "flex", width: "100%", justifyContent: "start", alignItems: "center"}}> 
                        <span style={{fontSize: "14px", color: "#4d4d4d", width: "25%"}}>5 Stars ({fiveStarCount})</span>
                        <ProgressBar striped now={fiveStar} label={`${fiveStar}%`} style={{width: "100%"}} />
                    </div>
                    <div style={{display: "flex", width: "100%", justifyContent: "start", alignItems: "center"}}> 
                        <span style={{fontSize: "14px", color: "#4d4d4d", width: "25%"}}>4 Stars ({fourStarCount})</span>
                        <ProgressBar striped now={fourStar} label={`${fourStar}%`} style={{width: "100%"}} />
                    </div>
                    <div style={{display: "flex", width: "100%", justifyContent: "start", alignItems: "center"}}> 
                        <span style={{fontSize: "14px", color: "#4d4d4d", width: "25%"}}>3 Stars ({threeStarCount})</span>
                        <ProgressBar striped now={threeStar} label={`${threeStar}%`} style={{width: "100%"}} />
                    </div>
                    <div style={{display: "flex", width: "100%", justifyContent: "start", alignItems: "center"}}> 
                        <span style={{fontSize: "14px", color: "#4d4d4d", width: "25%"}}>2 Stars ({twoStarCount})</span>
                        <ProgressBar striped now={twoStar} label={`${twoStar}%`} style={{width: "100%"}} />
                    </div>
                    <div style={{display: "flex", width: "100%", justifyContent: "start", alignItems: "center"}}> 
                        <span style={{fontSize: "14px", color: "#4d4d4d", width: "25%"}}>1 Star ({oneStarCount})</span>
                        <ProgressBar striped now={oneStar} label={`${oneStar}%`} style={{width: "100%"}} />
                    </div>
                </div>
                <br/>
                <h3 style={{margin: "0"}}>Reviews ({reviewsData.length})</h3>
                {reviewElements}
            </section>
        )} else {
            return (<p style={{color: "#4d4d4d", marginInline: "27px;"}}>You have no reviews.</p>)
        }
    }
    return (
        <>
            <Suspense fallback={<h2>Loading Order Details...</h2>}>
            <Await resolve={dataPromise.reviews}>
                {renderReviewDetailElements}
            </Await>
            </Suspense>
        </>
    )
}