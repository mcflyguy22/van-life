import { useActionData, useLoaderData, Form, redirect, useNavigation } from 'react-router-dom'
import { loginUser } from '../api'

export function Loader({ request }) {
    const message = new URL(request.url).searchParams.get("message")
    return message ? message : null
}

export async function action({ request }) {
    const formData = await request.formData()
    const email = formData.get("email")
    const password = formData.get("password")
    const pathname = new URL(request.url).searchParams.get("redirectTo") || "/host"
    console.log(pathname)
    try {
        const data = await loginUser({email, password})
        const successResponse = redirect(pathname)
        localStorage.setItem("loggedin", true)        
        return Object.defineProperty(successResponse, "body", {value: true}) 
    } catch(err) {
        return err.message
    }

}

export default function Login() {
    const message = useLoaderData()
    const error = useActionData()
    const navigation = useNavigation()

    return (
        <div className="login-wrapper">            
            <h1 style={{color: "#000000"}}>Sign in to your account</h1>
            {message && <h2>{message}</h2>}
            {error && <h2>{error}</h2>}
            <Form 
                method="post"
                replace
            >
                <input 
                    className="top"
                    name="email" 
                    type="email" 
                    placeholder="Email address" 
                />
                <input 
                    className="bottom"
                    name="password" 
                    type="password" 
                    placeholder="Password" 
                />  
                <button 
                    disabled={navigation.state === "submitting" ? true : false}
                >
                    {navigation.state === "submitting" ? "Logging in..." : "Log in"}
                </button>
            </Form> 
            <p>Don't have an account? <a href="#">Create one now</a></p>
        </div>
    )
}