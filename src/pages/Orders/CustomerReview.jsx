import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import dayjs from "dayjs";
import { query, getDocs, addDoc, collection, where } from "firebase/firestore";
import { db } from "../../api/firebase";

export default function CustomerReview(props) {
    const navigate = useNavigate()
    const order = props.order
    const hasReview = props.hasReview
    const setHasReview = props.setHasReview 
    const isHost = props.isHost
    const today = dayjs().$d.toLocaleDateString("en-US")
    const [reviewFormData, setReviewFormData] = useState({
        vanRating: 0,
        hostRating: 0,
        vanId: order.van,
        name: `${order.firstName} ${order.lastName.charAt(0)}.`,
        userId: order.user, 
        vanName: order.vanName,
        orderId: order.id,
        hostId: order.hostId,
        reviewDate: today,
        vanReview: "",
        hostReview: ""
    })
    const [reviewData, setReviewData] = useState()

    
    function handleChange(event) {
        const {name, value } = event.target;
        setReviewFormData(prevReviewFormData => {
            return {
                ...prevReviewFormData,
                [name]: value
            }
        })
    }

    console.log("reviewFormData: ", reviewFormData)
    console.log("isHost: ", isHost)
    console.log("hasReview: ", hasReview)

    useEffect(() => {
        const getOrderReviews = async() => {
            const reviewsCollectionRef = collection(db, "Reviews");
            const q = query(reviewsCollectionRef, where("orderId", "==", order.id));
            const querySnapshot = await getDocs(q);
        
            const dataArr = querySnapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id,
            }));
        
            setReviewData(dataArr[0])
        }
        getOrderReviews();
    }, [])

    useEffect(() => {
        reviewData ? setHasReview(true) : null
    }, [reviewData])


    const handleSubmit = (e) => {
        e.preventDefault()
        const createReview = async () => {
            const docRef = await addDoc(collection(db, "Reviews"), {
                vanRating: reviewFormData.vanRating,
                hostRating: reviewFormData.hostRating,
                name: reviewFormData.name,
                userId: reviewFormData.userId,
                vanId: reviewFormData.vanId,
                vanName: reviewFormData.vanName,
                orderId: reviewFormData.orderId,
                hostId: reviewFormData.hostId,
                reviewDate: reviewFormData.reviewDate,
                vanReview: reviewFormData.vanReview,
                hostReview: reviewFormData.hostReview
            })
            console.log(docRef.id)
            navigate("/host")
        }
        createReview()
        
    }

    return (
    <div>
        {(!hasReview && isHost) && <p style={{fontSize: "12px", color: "red", margin: "0", fontStyle: "italic"}}>Customer has not yet submitted a review.</p>}
      <form onSubmit={handleSubmit}>
      <Box sx={{ '& > legend': { mt: 2 } }}>
        <Typography component="legend" style={{color: "#4d4d4d", fontWeight: "bold", textDecoration: "underline"}}>{order.vanName} - Van Experience</Typography>
        <label htmlFor="vanRating" style={{color: "#4d4d4d", fontSize: "14px"}}><i>Rating</i></label><br/>
        <Rating
          name="vanRating"
          value={!hasReview ? reviewFormData.vanRating : reviewData.vanRating}
          onChange={handleChange}
          readOnly={hasReview || (!hasReview && isHost)}
          id="vanRating"
        /><br/>
        <label htmlFor="vanReview" style={{color: "#4d4d4d", fontSize: "14px"}}><i>Feedback</i></label><br/>
        <textarea
            name="vanReview"
            id="vanReview"
            value={!hasReview ? reviewFormData.vanReview : reviewData.vanReview}
            onChange={handleChange}
            rows="4"
            cols="40"
            disabled={hasReview || (!hasReview && isHost)}
            style={{fontSize: "12px", backgroundColor: !hasReview ? "#FFF": "whitesmoke", borderRadius: "5px", fontFamily: "Inter, sans-serif", color: "#4d4d4d"}}
        />
        <br/>
        <Typography component="legend" style={{color: "#4d4d4d", fontWeight: "bold", textDecoration: "underline"}}>Host Experience</Typography>
        <label htmlFor="hostRating" style={{color: "#4d4d4d", fontSize: "14px"}}><i>Rating</i></label><br/>
        <Rating
          name="hostRating"
          value={!hasReview ? reviewFormData.hostRating : reviewData.hostRating}
          onChange={handleChange}
          readOnly={hasReview || (!hasReview && isHost)}
          id="hostRating"
        />
        <br/>
        <label htmlFor="hostReview" style={{color: "#4d4d4d", fontSize: "14px"}}><i>Feedback</i></label><br/>
        <textarea
            name="hostReview"
            id="hostReview"
            value={!hasReview ? reviewFormData.hostReview : reviewData.hostReview}
            onChange={handleChange}
            rows="4"
            cols="40"
            style={{fontSize: "12px", backgroundColor: !hasReview ? "#FFF": "whitesmoke", borderRadius: "5px", fontFamily: "Inter, sans-serif", color: "#4d4d4d"}}
            disabled={hasReview || (!hasReview && isHost)}
        />
      </Box>
      {(!hasReview && !isHost) && <button type="submit">Submit Review</button>}
      </form>
      </div>
    );
  }