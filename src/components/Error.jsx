import {Link} from 'react-router-dom'
import { useRouteError } from 'react-router-dom'

export default function Error() {
    const error = useRouteError()
    console.log(error)
    return (
        <div style={{marginLeft: "27px"}}>
            <h1 style={{color: "#161616"}}>Sorry, there appears to have been an error in loading this page: 
                <p style={{margin: "40px", fontSize: "24px", fontWeight: "normal"}}><i>{error.status} - {error.message}</i></p></h1>
            <Link to="/"><button 
            style={{
                cursor: "pointer", 
                width: "90%", 
                height: "35px", 
                backgroundColor: "#161616", 
                border: "none", 
                outline: "none", 
                borderRadius: "5px"
            }}>Return to Home</button></Link>
        </div>
    )
}