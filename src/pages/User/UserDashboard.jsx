import './StyleUserDashboard.css'
import { defer, Await, useLoaderData, Link } from 'react-router-dom'
import { Avatar } from '@mui/material'
import { useState, Suspense} from 'react'
import { getProfile } from '../../api/api'
import { FaEdit } from 'react-icons/fa'

export async function Loader() {
    return defer({profile: getProfile()})
}

export default function UserDashboard() {
    const dataPromise = useLoaderData()
    const [userProfile, setUserProfile] = useState(null)
    const [profileImage, setProfileImage] = useState(null)
    console.log("userprofile (dash): ", userProfile)
    console.log("profileImage (dash): ", profileImage)

    function renderProfile(profile) {
        setUserProfile(profile[0])
        setProfileImage(profile[0].imageUrl)
    }

    function stringAvatar(name) {
        return {
          sx: {
            bgcolor: stringToColor(name),
          },
          children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
      }

      function stringToColor(string) {
        let hash = 0;
        let i;
      
        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
          hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }
      
        let color = '#';

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
          }
          return color;
        }

    return (
        <>
            {userProfile && 
                <>
                    <div className="host-dash-head">
                        <h1>Hi {userProfile ? userProfile.firstName : "you"}</h1>
                        {profileImage ? <Avatar alt="Current Image" src={profileImage} sx={{width: 56, height: 56}}/> : <Avatar {...stringAvatar(`${userProfile.firstName} ${userProfile.lastName}`)} sx={{width: 56, height: 56}} />}
                    </div>
                    <div className="user-dash-profile">
                        <h2 style={{display: "flex", justifyContent: "space-between"}}>User Details <Link to="edit-profile"><FaEdit /></Link></h2>
                        <ul>
                            <li><b>Email:</b> {userProfile.email}</li>
                            <li><b>First Name:</b> {userProfile.firstName}</li>
                            <li><b>Last Name:</b> {userProfile.lastName}</li>
                        </ul>
                    </div>
                    <div className="host-dash-vans">
                    </div>
                </>
            }
            <Suspense fallback={<h2>Loading Profile...</h2>}>
                <Await resolve={dataPromise.profile}>
                    {renderProfile}
                </Await>
            </Suspense>
        </>
    )
}