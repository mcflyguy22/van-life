import {Link} from 'react-router-dom'

export default function NotFound() {
    return (
        <div style={{marginLeft: "27px"}}>
            <h1 style={{color: "#161616"}}>Sorry, the page you were looking for was not found</h1>
            <Link to="/"><button style={{width: "90%", height: "35px", backgroundColor: "#161616", border: "none", outline: "none", borderRadius: "5px" }}>Return to Home</button></Link>
        </div>
    )
}