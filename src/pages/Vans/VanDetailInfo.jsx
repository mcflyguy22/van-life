import { useOutletContext, Link } from 'react-router-dom'

export default function VanDetailInfo() {
    const van = useOutletContext()

    return (
        <>
            <div className="van-detail-container">
                <p><strong>${van.price}</strong><small>/day</small></p>
                <p>{van.description}</p>
            </div>
            <center><Link to="booking"><button className="rent-van-btn">Rent this van</button></Link></center>
            <br/>
        </>
    )
}