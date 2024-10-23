import { useOutletContext, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import dayjs from "dayjs";
import { query, getDocs, addDoc, collection, where } from "firebase/firestore";
import { db } from "../../api/firebase";

export default function CustomerReview() {
    const navigate = useNavigate()
    const order = useOutletContext()[0]
    const hasReview = useOutletContext()[1]
    const setHasReview = useOutletContext()[2]    
    const today = dayjs().$d.toLocaleDateString("en-US")
    const [formData, setFormData] = useState({
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
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
    }

    console.log("formdata: ", formData)

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
        reviewData && setHasReview(true)
    }, [])

    console.log("hasReview: ", hasReview)
    console.log("reviewdata: ", reviewData)

    const handleSubmit = (e) => {
        e.preventDefault()
        const createReview = async () => {
            const docRef = await addDoc(collection(db, "Reviews"), {
                vanRating: formData.vanRating,
                hostRating: formData.hostRating,
                name: formData.name,
                userId: formData.userId,
                vanId: formData.vanId,
                vanName: formData.vanName,
                orderId: formData.orderId,
                hostId: formData.hostId,
                reviewDate: formData.reviewDate,
                vanReview: formData.vanReview,
                hostReview: formData.hostReview
            })
            console.log(docRef.id)
            navigate("/")
        }
        createReview()
        
    }

    return (
    <div style={{marginInline: "27px"}}>
      <form onSubmit={handleSubmit}>
      <Box sx={{ '& > legend': { mt: 2 } }}>
        <Typography component="legend" style={{color: "#4d4d4d"}}>Van Experience</Typography>
        <Rating
          name="vanRating"
          value={!hasReview ? formData.vanRating : reviewData.vanRating}
          onChange={handleChange}
          readOnly={hasReview}
        /><br/>
        <label htmlFor="vanReview" style={{marginInline: "20px", color: "#4d4d4d", fontSize: "14px"}}><i>Feedback for <b>{order.vanName}</b></i></label><br/>
        <textarea
            name="vanReview"
            id="vanReview"
            value={!hasReview ? formData.vanReview : reviewData.vanReview}
            onChange={handleChange}
            rows="4"
            cols="50"
            style={{marginInline: "20px", backgroundColor: !hasReview ? "#FFF": "whitesmoke", borderRadius: "5px", fontFamily: "Inter, sans-serif", color: "#4d4d4d"}}
        />
        <Typography component="legend" style={{color: "#4d4d4d"}}>Host Experience</Typography>
        <Rating
          name="hostRating"
          value={!hasReview ? formData.hostRating : reviewData.hostRating}
          onChange={handleChange}
          readOnly={hasReview}
        />
        <br/>
        <label htmlFor="hostReview" style={{marginInline: "20px", color: "#4d4d4d", fontSize: "14px"}}><i>Feedback for <b>Host</b></i></label><br/>
        <textarea
            name="hostReview"
            id="hostReview"
            value={!hasReview ? formData.hostReview : reviewData.hostReview}
            onChange={handleChange}
            rows="4"
            cols="50"
            style={{marginInline: "20px", backgroundColor: !hasReview ? "#FFF": "whitesmoke", borderRadius: "5px", fontFamily: "Inter, sans-serif", color: "#4d4d4d"}}
            disabled={hasReview}
        />
      </Box>
      {!hasReview && <button type="submit">Submit Review</button>}
      </form>
      </div>
    );
  }