import { NavLink, Outlet, useLoaderData } from 'react-router-dom'
import { BsArrowLeft } from "react-icons/bs";
import { getHostVans } from '../../../api'
import { requireAuth } from '../../../utils'

export async function Loader({ params }) {
    await requireAuth()
    return getHostVans(params.id)
}

export default function VansDetail() {
    const hostVan = useLoaderData()[0]

    return (
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
                <Outlet context={[hostVan]} />
        </>
    )
}