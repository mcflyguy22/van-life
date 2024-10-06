import { redirect } from 'react-router-dom'

export async function requireAuth(request) {
    const pathname = new URL(request.url).pathname 
    const isLoggedIn = localStorage.getItem("loggedin")
    const failResponse = redirect(`/login?message=You must be logged in&redirectTo=${pathname}`)

    if (!isLoggedIn) {
    return Object.defineProperty(failResponse, "body", {value: true})
    }
    return null
}