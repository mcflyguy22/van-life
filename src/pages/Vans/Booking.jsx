import { useOutletContext } from "react-router-dom"

export default function BookingPage() {
    const van = useOutletContext()

    return (
        <div className="van-detail-container">

            <h1 style={{color: "black"}}>Booking/Reservation Form for {van.name} Goes Here</h1>
        </div>
    )
}