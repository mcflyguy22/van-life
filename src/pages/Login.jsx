import { useNavigate, useLocation, Link } from 'react-router-dom'
import { auth } from "../api/firebase"
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useState, useContext, useEffect } from 'react'
import AuthContext from '../api/AuthContext'
import './StyleLogin.css'

export function Loader({ request }) {
    const message = new URL(request.url).searchParams.get("message")
    return message ? message : null
}

export default function Login() {
    const [error, setError] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const {user, setUser} = useContext(AuthContext)
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        if(user) {
            navigate("/host")
        }
    }, [user])

    console.log(email)
    console.log(password)
    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password)  
            setUser(userCredential.user)
            console.log(user)
            return true
        } catch (error) {
            setError(true)
            console.log(error.message)
        }
    }

    return (
        <div className="login-wrapper">            
            <h1 style={{color: "#000000"}}>Sign in to your account</h1>
            {location.state?.message && <h2>{location.state.message}</h2>}
            {error && <h2>{error}</h2>}
            <form onSubmit={handleLogin}>
                <input 
                    className="top"
                    name="email" 
                    type="email" 
                    placeholder="Email address"
                    onChange={e=>setEmail(e.target.value)}
                />
                <input 
                    className="bottom"
                    name="password" 
                    type="password" 
                    placeholder="Password"
                    onChange={e=>setPassword(e.target.value)} 
                />  
                <button 
                    type="submit">
                    Log in
                </button>
            </form> 
            <p>Don't have an account? <Link to="/Register">Create one now</Link></p>
        </div>
    )
}