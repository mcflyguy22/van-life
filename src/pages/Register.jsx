import {  } from 'react-router-dom'
import { auth, db } from "../api/firebase"
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useState } from 'react'
import { setDoc, doc } from 'firebase/firestore'
import { toast } from 'react-toastify'



export default function Register() {
    console.log(auth)
    console.log(createUserWithEmailAndPassword)
    const [error, setError] = useState(false)
    const [email, setEmail] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")


    console.log(email)
    console.log(firstName)
    console.log(lastName)
    console.log(password)
    console.log(password2)

    const handleRegister = async (e) => {
        e.preventDefault()
        try {
            createUserWithEmailAndPassword(auth, email, password)
            const user = auth.currentUser
            console.log(user)
            if (user) {
                await setDoc(doc(db, "Users", user.uid), {
                    email: user.email,
                    firstName: firstName,
                    lastName: lastName
                })
            } else {
                await setDoc(doc(db, "Users", user.uid), {
                    email: email,
                    firstName: firstName,
                    lastName: lastName
            })
        }
            toast.success("User Created Successfully!")
            console.log("User Created Successfully!")
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <div className="login-wrapper">            
            <h1 style={{color: "#000000"}}>Register new account</h1>
            {error && <h2>{error}</h2>}
            <form onSubmit={handleRegister}>
                <input 
                    className="top"
                    name="email" 
                    type="email" 
                    placeholder="Email address"
                    onChange={e=>setEmail(e.target.value)}
                />
                <input 
                    className="top"
                    name="firstName" 
                    type="text" 
                    placeholder="First name"
                    onChange={e=>setFirstName(e.target.value)}
                />
                <input 
                    className="top"
                    name="lastName" 
                    type="text" 
                    placeholder="Last name"
                    onChange={e=>setLastName(e.target.value)}
                />
                <input 
                    className="bottom"
                    name="password" 
                    type="password" 
                    placeholder="Password"
                    onChange={e=>setPassword(e.target.value)} 
                />  
                <input 
                    className="bottom"
                    name="password2" 
                    type="password2" 
                    placeholder="Confirm Password"
                    onChange={e=>setPassword2(e.target.value)} 
                />  
                <button 
                    type="submit">
                    Create Account
                </button>
            </form> 
        </div>
    )
}