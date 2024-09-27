import {useParams, NavLink, Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { BsArrowLeft } from "react-icons/bs";

export default function VansDetail() {
    const params = useParams()
    const [hostVan, setHostVan] = useState(null)
    
    console.log(params)

    useEffect(function() {
        fetch(`/api/host/vans/${params.id}`)
            .then(res => res.json())
            .then(data => setHostVan(data.vans[0]))
    }, [params.id])

    console.log("host van:", hostVan)

    return (
    <>
    {hostVan ? (
        <>
            <span className="backto-allvans"><NavLink to=".." relative="path"><BsArrowLeft /> &nbsp;Back to all vans</NavLink></span>
            <div key={hostVan.id} className="hostvan-detail">
                    <img src={hostVan.imageUrl} />
                    <div>
                        <button className={`${hostVan.type}-vans`}>{hostVan.type}</button>
                        <h1>{hostVan.name}</h1>
                        <p><strong>${hostVan.price}</strong><small>/day</small></p>
                    </div>
            </div>
            <div className="hostvan-detail-nav">
                    <ul>
                        <li>
                            <NavLink 
                                to={{ pathname: ".", state: hostVan}}
                                end
                                className={({isActive}) => isActive ? "my-link" : ""}
                                hostVan={hostVan}
                            >Details</NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="pricing"
                                className={({isActive}) => isActive ? "my-link" : ""}
                                hostVan={hostVan}
                            >Pricing</NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="photos"
                                className={({isActive}) => isActive ? "my-link" : ""}
                                hostVan={hostVan}
                            >Photos</NavLink>
                        </li>
                    </ul>
                </div>
                <Outlet context={[hostVan, setHostVan]} />
        </>
    ) : <h2>Loading...</h2>}
    </>
    )
}