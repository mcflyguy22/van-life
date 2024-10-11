import { useContext } from 'react'
import AuthContext from './AuthContext'
import { Outlet, Navigate, useLocation } from 'react-router-dom'

export default function AuthRequired(){

    const {user} = useContext(AuthContext)
   
    const location = useLocation()

    if(!user){
       return <Navigate 
                to='/login' 
                state={{message: "You are not logged in.", 
                        from: location.pathname}}
                replace />
    }

    return <Outlet />
    
    
}