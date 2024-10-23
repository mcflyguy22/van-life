import { NavLink, Outlet, useLoaderData, defer, Await, Link } from 'react-router-dom'
import { BsArrowLeft } from "react-icons/bs";
import { getHostVan } from '../../../api/api'
import { Suspense } from 'react';
import { FaEdit } from "react-icons/fa";
import './StyleHostVanDetails.css'

export async function Loader({ params }) {
    return defer({hostVan: getHostVan(params.id)})
}

export default function VansDetail() {
    const dataPromise = useLoaderData()

    function renderHostVanDetailElements(hostVan) {
            return (
            <>
                <div key={hostVan.id} className="hostvan-detail">
                        <img src={hostVan.imageUrl[0]} />
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
                            <li>
                                <NavLink 
                                    to="edit-van"
                                    hostVan={hostVan}
                                    className="editVan"
                                ><FaEdit /></NavLink>
                            </li>
                        </ul>
                </div>
                <Outlet context={[hostVan]} />
            </>
            )
    }

    return (
        <>
            <span className="backto-allvans"><NavLink to=".." relative="path"><BsArrowLeft /> &nbsp;Back to all vans</NavLink></span>
            <Suspense fallback={<h2>Loading Host Van Details...</h2>}>
                <Await resolve={dataPromise.hostVan}>
                    {renderHostVanDetailElements}
                </Await>
            </Suspense>
        </>
    )
}