import Ratings from '../../../public/ratings.svg'
import { FaStar } from "react-icons/fa";

export default function Reviews() {
    return (
        <>
            <div className="reviews-head">
                <div>
                    Your Reviews
                    <p>Last <span>30 days</span></p>
                </div>
                <h2>$2,260</h2>
                <img src={Ratings} className="ratings-img"/>
                <div>
                    <strong>Your transactions (3)</strong>
                    <p>Last <span>30 days</span></p>
                </div>
                <div className="review">
                    <div className="stars">
                        <FaStar style={{color: "orange", height: "24px"}}/>
                        <FaStar style={{color: "orange", height: "24px"}}/>
                        <FaStar style={{color: "orange", height: "24px"}}/>
                        <FaStar style={{color: "orange", height: "24px"}}/>
                        <FaStar style={{color: "orange", height: "24px"}}/>
                    </div>
                    <div>
                        <p>
                            <strong>Elliot</strong> December 1, 2022
                        </p>
                        <p>
                            The beach bum is such as awesome van! Such as comfortable trip. We had it for 2 weeks and there was not a single issue. Super clean when we picked it up and the host is very comfortable and understanding. Highly recommend!
                        </p>
                    </div>
                </div>
                <div className="transaction">
                    <h4>$560</h4>
                    <p>10/11/22</p>
                </div>
                <div className="transaction">
                    <h4>$980</h4>
                    <p>11/23/2022</p>
                </div>
            </div>
        </>
    )
}