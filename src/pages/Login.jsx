import {useState} from 'react'
import { useNavigate } from 'react-router-dom'


export default function Login() {
    const [error, setError] = useState(false)
    const [loginFormData, setLoginFormData] = useState({
        email: "",
        password: ""
    })

    const navigate = useNavigate()
    console.log(loginFormData)


    function handleSubmit(e) {
        e.preventDefault()
        console.log(loginFormData)
    }

    const handleChange = (e) => {
        e.preventDefault()
        const { name, value } = e.target
        setLoginFormData(prev => ({
            ...prev,
            [name]: value
        }))
      }

    return (
        <div className="login-wrapper">            
            <h1 style={{color: "#000000"}}>Sign in to your account</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    className="top"
                    name="email" 
                    type="email" 
                    placeholder="Email address" 
                    onChange={handleChange}
                    value={loginFormData.email}
                />
                <input 
                    className="bottom"
                    name="password" 
                    type="password" 
                    placeholder="Password" 
                    onChange={handleChange}
                    value={loginFormData.password}
                />  
                <button>Log in</button>
                {error && <span>Wrong email or password!</span>}
            </form> 
            <p>Don't have an account? <a href="#">Create one now</a></p>
        </div>
    )
}