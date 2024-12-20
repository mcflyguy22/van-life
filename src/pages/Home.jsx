import {Link} from 'react-router-dom'
import './StyleHome.css'

export default function Home() {
    return (
        <div className="home-container">
            <div className="home-content">
                <h1>You got the travel plans, we got the travel vans.</h1>
                <p style={{color: "white"}}>Add adventure to your life by joining the #vanlife movement. Rent the perfect van to make your perfect road trip.</p>
                <Link to="/vans"><button className="van-search-btn">Find your van</button></Link>
            </div>
        </div>
    )
}