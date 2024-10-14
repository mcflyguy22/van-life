import { Link, useLocation, useLoaderData, defer, Await, Outlet, NavLink } from 'react-router-dom'
import { BsArrowLeft } from "react-icons/bs";
import { getVan } from '../../api/api'
import { Suspense, useState } from 'react';
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";

export function Loader({ params }) {
    return defer({van: getVan(params.id)})
}

export default function VanDetail() {
    const [imageIndex, setImageIndex] = useState(0)
    const { van } = useLoaderData()
    const location = useLocation()
    const search = location.state?.search || ""
    const type = location.state?.type || "all"
    
    // const lastImgIndex = imageArr.length - 1
    
    
    function renderVanDetailElements(van) {
        const imageArr = van.imageUrl
        console.log("imageArr: ", imageArr)
        console.log("imageIndex: ", imageIndex)
        const lastImgIndex = imageArr.length - 1
        return (
            <>
                <div className="van-detail-container">
                    <span className="all-vans"><Link to={`..${search}`} relative="path"><BsArrowLeft /> &nbsp;Back to {type} vans</Link></span>
                    <div className="image-slider">
                        <img src={imageArr[imageIndex]} />
                        {(imageArr.length > 1) && <><button onClick={() => { return ((imageIndex === 0) ? setImageIndex(lastImgIndex) : setImageIndex(imageIndex - 1))}}><FaChevronCircleLeft /></button>
                        <button onClick={() => { return ((imageIndex !== lastImgIndex) ? setImageIndex(imageIndex + 1) : setImageIndex(0))}}><FaChevronCircleRight /></button></>}
                    </div>
                    <button className={`${van.type}-vans`}>{van.type}</button>
                <br/>
                <h1>{van.name}</h1>
                    <div className="van-detail-nav">
                            <ul>
                                <li>
                                    <NavLink 
                                        to={{ pathname: ".", state: van}}
                                        end
                                        className={({isActive}) => isActive ? "my-link" : ""}
                                        van={van}
                                    >Details</NavLink>
                                </li>
                                <li>
                                    <NavLink 
                                        to="booking"
                                        className={({isActive}) => isActive ? "my-link" : ""}
                                        van={van}
                                    >Booking</NavLink>
                                </li>
                            </ul>
                    </div>
                </div>
                <Outlet context={van} />
            </>
        )
    }
    return (
        <>
            <Suspense fallback={<h2>Loading Van Details...</h2>}>
                <Await resolve={van}>
                    {renderVanDetailElements}
                </Await>
            </Suspense>
        </>
    )
}