import { FaStar } from "react-icons/fa";

export default function Host() {
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
                <FaStar style={{color: "orange", height: "24px"}}/>&nbsp;<strong>5.0</strong>/5
                <div className="host-dash-details">
                    <span>Details</span>
                </div>
            </div>
            <div className="host-dash-vans">
                <div>
                    <h4>Your listed vans</h4>
                    <span>View all</span>
                </div>
                <div className="host-dash-vanlist">
                    
                </div>
            </div>
        </>
    )
}