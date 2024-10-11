import { auth } from './firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { useState, useEffect } from 'react'
import AuthContext from './AuthContext'

// const auth = getAuth()

// eslint-disable-next-line react/prop-types
export const AuthProvider = ( {children} ) => {
    const [user, setUser] = useState(null)
    useEffect(()=> {
        onAuthStateChanged(auth, (user) => {
            setUser(user)
        })
    }, [])
    return (
        <AuthContext.Provider value = {{user, setUser}}>{children}</AuthContext.Provider>
    )
}