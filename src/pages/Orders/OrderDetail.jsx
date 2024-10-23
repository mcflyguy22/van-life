import { NavLink, Outlet, useLoaderData, defer, Await, Link, useNavigate } from 'react-router-dom'
import { BsArrowLeft } from "react-icons/bs";
import { getOrder } from '../../api/api';
import { Suspense, useContext, useState } from 'react';
import AuthContext from '../../api/AuthContext';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../../api/firebase';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import './StyleOrderDetails.css'

export async function Loader({ params }) {
    return defer({order: getOrder(params.id)})
}

export default function OrderDetail() {
    const navigate = useNavigate()
    const dataPromise = useLoaderData()
    const [error, setError] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const {user, setUser} = useContext(AuthContext)
    const uid = user ? user.uid : null
    const [isHost, setIsHost] = useState(false)
    const [formData, setFormData] = useState()
    const [hasReview, setHasReview] = useState(false)
    console.log(dataPromise)

    const currentDate = dayjs()

    function setFormDataFunc(data) {
        setFormData(data);
        setEditMode(true);
    }

    function handleChange(event) {
        const {name, value } = event.target;
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        setError(null)
        try{
            const res = await updateDoc(doc(db, "Orders", formData.id), {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                beginDate: formData.beginDate,
                endDate: formData.endDate,
                van: formData.van,
                vanName: formData.vanName,
                user: formData.user,
                hostId: formData.hostId,
                orderTotal: formData.orderTotal,
                createdOn: formData.createdOn,
                status: formData.status
            })
            console.log(res)
            navigate("/host/orders")
        } catch(error){
            setError(error.message)
            console.log(error.message)
        }
    }

    console.log("uid:", uid)

    
    function renderOrderDetailElements(order) {
            if (!editMode) {
                setFormDataFunc(order)
             }
            return (
            <>
                <div key={order.id} style={{marginInline: "27px", color: "black", display: "flex", flexDirection: "column"}}>
                    <br/>
                    <h2 style={{color: "#4d4d4d"}}>Order Details</h2>

                    <form onSubmit={handleSubmit} style={{display: "flex", flexDirection: "column", width: "50%"}}>
                        <label htmlFor="email">Email: </label>
                        <input 
                            type="email"
                            placeholder="email"
                            onChange={handleChange}
                            name="email"
                            disabled={!isHost ? true : false}
                            value={formData.email}
                            required={true}
                            id="email"
                        />
                        <label htmlFor="status">Order Status:</label>
                        <select
                            onChange={handleChange}
                            name="status"
                            disabled={!isHost ? true : false}
                            value={formData.status}
                            required={true}
                            id="status"
                        >
                            <option value="">--Choose Type--</option>
                            <option value="Pending">Pending</option>
                            <option value="Cancelled">Cancelled</option>
                            <option value="Active">Active</option>
                            <option value="Complete">Complete</option>
                        </select>
                    <br/>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker', 'DatePicker']}>
                            <div style={{display: "flex", columnGap: "10px"}}>
                                <div style={{display: "flex", width: "50%", flexDirection: "column", rowGap: "10px"}}>
                                    <DatePicker
                                    label="Pick-Up Date"
                                    value={dayjs(formData.beginDate)}
                                    id="pickup"
                                    onChange={(newValue) => setFormData(prevFormData => ({
                                        ...prevFormData,
                                        beginDate: newValue.$d.toLocaleDateString("en-US")
                                    }))}
                                    minDate={currentDate}
                                    disabled={!isHost ? true : false}
                                    />
                                </div>
                                <div style={{display: "flex", width: "50%", flexDirection: "column", rowGap: "10px"}}>
                                    <DatePicker
                                    label="Drop-Off Date"
                                    value={dayjs(formData.endDate)}
                                    id="dropoff"
                                    onChange={(newValue) => setFormData(prevFormData => ({
                                        ...prevFormData,
                                        endDate: newValue.$d.toLocaleDateString("en-US")
                                    }))}
                                    minDate={formData.beginDate && dayjs(formData.beginDate)}
                                    disabled={!isHost ? true : false}
                                    />
                                </div>
                            </div>
                        </DemoContainer>
                    </LocalizationProvider>
                    <br/>
                    {isHost && <button type="submit" className="order-details-btn">Save Changes</button>}
                    </form>

                    {/* <h2 style={{color: "#4d4d4d"}}>Messages</h2>
                    <p>#Messages between host and buyer here.#</p> */}

                    <h2 style={{color: "#4d4d4d"}}>Customer Review</h2>
                    {(!hasReview && !isHost) ? <p>{(order.status === "Complete") ? <Link to="customer-review">Leave a Review</Link> : "Please leave a review when your trip is finished!"}</p> : null}
                </div>
                <Outlet context={[order, hasReview, setHasReview]} />
            </>
            )
    }

    return (
        <>
            <span className="backto-allvans"><NavLink to="/host/orders" relative="path"><BsArrowLeft /> &nbsp;Back to all orders</NavLink></span>
            <Suspense fallback={<h2>Loading Order Details...</h2>}>
                <Await resolve={dataPromise.order}>
                    {renderOrderDetailElements}
                </Await>
            </Suspense>
        </>
    )
}