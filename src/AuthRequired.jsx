// import { redirect } from 'react-router-dom'
// import { useContext } from 'react'
// import AuthContext from './api/AuthContext'

// export async function requireAuth(request) {
//     const pathname = new URL(request.url).pathname 
//     const failResponse = redirect(`/login?message=You must be logged in&redirectTo=${pathname}`)

//     if (!user) {
//     return Object.defineProperty(failResponse, "body", {value: true})
//     }
//     return null
// }