import { NavLink, Outlet, defer, Await, useLoaderData } from 'react-router-dom'
import './StyleHostLayout.css'
import { useState, Suspense } from 'react'
import { getProfile } from '../api/api'

export async function Loader() {
    return defer({profile: getProfile()})
}

export default function UserLayout() {
    const dataPromise = useLoaderData()
    const [userProfile, setUserProfile] = useState(null)

    function renderProfile(profile) {
        setUserProfile(profile[0])
    }
    
    // console.log("userProfile (layout)", userProfile)

    return (
        <div className="host-layout-wrapper">
            <div className="host-navBar">
                <ul>
                    <li>
                        <NavLink 
                            to="."
                            end
                            className={({isActive}) => isActive ? "my-link" : ""}
                        >Profile</NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="edit-profile"
                            end
                            className={({isActive}) => isActive ? "my-link" : ""}
                        >Edit Profile</NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="user-orders"
                            className={({isActive}) => isActive ? "my-link" : ""}
                        >Orders</NavLink>
                    </li>
                </ul>
            </div>
            <Suspense fallback={<h2>Loading Profile...</h2>}>
                <Await resolve={dataPromise.profile}>
                    {renderProfile}
                </Await>
            </Suspense>
            <Outlet context={[userProfile, setUserProfile]}/>
        </div>
    )
}