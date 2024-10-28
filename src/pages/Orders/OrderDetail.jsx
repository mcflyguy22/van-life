import { NavLink, useLoaderData, defer, Await, useNavigate } from 'react-router-dom'
import { BsArrowLeft } from "react-icons/bs";
import { getOrder } from '../../api/api';
import { Suspense, useState } from 'react';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../../api/firebase';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import CustomerReview from './CustomerReview';
import './StyleOrderDetails.css'

export async function Loader({ params }) {
    return defer({order: getOrder(params.id)})
}

export default function OrderDetail() {
    const navigate = useNavigate()
    const dataPromise = useLoaderData()
    const [editMode, setEditMode] = useState(false)
    const [isHost, setIsHost] = useState(false)
    const [formData, setFormData] = useState()
    const [hasReview, setHasReview] = useState(false)
    const [orderComplete, setOrderComplete] = useState(false)

    const currentDate = dayjs()

    function setFormDataFunc(data) {
        (data.isHost === true) ? setIsHost(true) : setIsHost(false)
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
            console.log(error)
        }
    }

    console.log("edit mode: ", editMode)
    console.log("formData: ", formData)
    
    function renderOrderDetailElements(order) {
            const orderStatus = (order.status === "Complete") ? true : false
            setOrderComplete(orderStatus)
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
                            disabled={(!isHost || orderComplete) ? true : false}
                            value={formData.email}
                            required={true}
                            id="email"
                        />
                        <label htmlFor="status">Order Status:</label>
                        <select
                            onChange={handleChange}
                            name="status"
                            disabled={(!isHost || orderComplete) ? true : false}
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
                                    disabled={(!isHost || orderComplete) ? true : false}
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
                                    disabled={(!isHost || orderComplete) ? true : false}
                                    />
                                </div>
                            </div>
                        </DemoContainer>
                    </LocalizationProvider>
                    <br/>
                    {(isHost && !orderComplete) && <button type="submit" className="order-details-btn">Save Changes</button>}
                    </form>

                    {/* <h2 style={{color: "#4d4d4d"}}>Messages</h2>
                    <p>#Messages between host and buyer here.#</p> */}
                    {orderComplete &&
                    <><h2 style={{color: "#4d4d4d"}}>Customer Review</h2>
                    <CustomerReview order={order} orderStatus={orderComplete} isHost={isHost} setIsHost={setIsHost} hasReview={hasReview} setHasReview={setHasReview} />
                    </>
                    }
                    </div>
            </>
            )
    }

    return (
        <>
            <span className="backto-allvans"><NavLink to={isHost ? "/host" : "/user/user-orders"} relative="path"><BsArrowLeft /> &nbsp;Back to dashboard</NavLink></span>

            {/* <button onClick={() => setIsHost(!isHost)}>{isHost ? "Change to Guest" : "Change to Host"}</button> #Code used for testing*/}
            <Suspense fallback={<h2>Loading Order Details...</h2>}>
                <Await resolve={dataPromise.order}>
                    {renderOrderDetailElements}
                </Await>
            </Suspense>
        </>
    )
}