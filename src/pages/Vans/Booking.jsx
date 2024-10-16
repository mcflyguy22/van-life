import { useOutletContext } from "react-router-dom"
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState, useEffect } from "react";
import ConfirmOrder from "./ConfirmOrder";


export default function BookingPage() {

    const [confirmToggle, setConfirmToggle] = useState(false)
    const [pickUp, setPickUp] = useState(null);
    const [dropOff, setDropOff] = useState(null)
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        beginDate: null,
        endDate: null,
    })
    
    const van = useOutletContext()

    const totalDays = (formData.endDate && formData.beginDate) ? formData.endDate.diff(formData.beginDate, "day") : 0
    const totalPrice = (formData.endDate && formData.beginDate) ? totalDays * van.price : 0
    const salesTax = (totalPrice !== 0) ? totalPrice * .06875 : 0
    const orderTotal = (totalPrice !== 0) ? (totalPrice + salesTax).toFixed(2) : 0

    // (formData.beginDate && formData.endDate) ? console.log("days total: ", formData.endDate.diff(formData.beginDate, "day")) : console.log("hi")
    console.log(formData)
    function handleChange(event) {
        const {name, value } = event.target;
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
    }

    useEffect(() => {
        setFormData(prevFormData => ({
            ...prevFormData,
            beginDate: pickUp,
            endDate: dropOff
        }))
    }, [pickUp, dropOff])

    useEffect(() => {
        setFormData(prevFormData => ({
            ...prevFormData,
            orderTotal: orderTotal | 0
        }))
    }, [formData])

    const handleSubmit = (e) => {
        e.preventDefault()
        setConfirmToggle(true)
    }
    return (
    <div className="booking-form-container">
        <h2 style={{color: "#4d4d4d"}}>Customer Details</h2>
        <form onSubmit={handleSubmit}>
        <div style={{display: "flex", columnGap: "10px"}}>
            <div style={{display: "flex", width: "50%", flexDirection: "column"}}>
            <label htmlFor="firstName">First Name:</label>
                <input 
                    className="booking-input"
                    type="text"
                    placeholder="First Name"
                    onChange={handleChange}
                    onFocus={(e) => e.target.placeholder = ""}
                    onBlur={(e) => e.target.placeholder = "First Name"}
                    name="firstName"
                    value={formData.firstName}
                    required={true}
                    id="firstName"
                />
            </div>
            <div style={{display: "flex", width: "50%", flexDirection: "column"}}>
            <label htmlFor="lastName">Last Name:</label>
                <input 
                    className="booking-input"
                    type="text"
                    placeholder="Last Name"
                    onChange={handleChange}
                    onFocus={(e) => e.target.placeholder = ""}
                    onBlur={(e) => e.target.placeholder = "Last Name"}
                    name="lastName"
                    value={formData.lastName}
                    required={true}
                    id="lastName"
                />
            </div>
            </div>
            <label htmlFor="email">Email:</label>
                <input 
                    className="booking-input"
                    type="email"
                    placeholder="Email Address"
                    onChange={handleChange}
                    onFocus={(e) => e.target.placeholder = ""}
                    onBlur={(e) => e.target.placeholder = "Email Address"}
                    name="email"
                    value={formData.email}
                    required={true}
                    id="email"
                />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker', 'DatePicker']}>
                <h2 style={{color: "#4d4d4d"}}>Van Scheduling Details</h2>
                <div style={{display: "flex", columnGap: "10px"}}>
                    <div style={{display: "flex", width: "50%", flexDirection: "column", rowGap: "10px"}}>
                        <DatePicker
                        label="Pick-Up Date"
                        value={pickUp}
                        id="pickup"
                        onChange={(newValue) => setPickUp(newValue)}
                        />
                    </div>
                    <div style={{display: "flex", width: "50%", flexDirection: "column", rowGap: "10px"}}>
                        <DatePicker
                        label="Drop-Off Date"
                        value={dropOff}
                        id="dropoff"
                        onChange={(newValue) => setDropOff(newValue)}
                        />
                    </div>
                </div>
            </DemoContainer>
            </LocalizationProvider>
                <h2 style={{color: "#4d4d4d"}}>Order Summary</h2>
                    <div style={{display: "flex", flexDirection: "column", color: "#4d4d4d", backgroundColor: "white", padding: "10px", borderRadius: "5px"}}>
                        <div style={{display: "flex", justifyContent: "space-between", fontSize: "14px"}}>
                            <p style={{margin: "0"}}><strong>Van Price:</strong></p>
                            <p style={{margin: "0"}}><span>${van.price}/day</span></p>
                        </div>
                        <div style={{display: "flex", justifyContent: "space-between", fontSize: "14px"}}>
                            <p style={{margin: "0"}}><strong>Total Days:</strong></p>
                            <p style={{margin: "0"}}><span>{totalDays} days</span></p>
                        </div>
                        <div style={{display: "flex", justifyContent: "space-between", fontSize: "14px"}}>
                            <p style={{margin: "0"}}><strong>Rental Cost (Price x Days):</strong></p>
                            <p style={{margin: "0"}}><span>${totalPrice}</span></p>
                        </div>
                        <div style={{display: "flex", justifyContent: "space-between", fontSize: "14px", borderBottom: "double #4d4d4d"}}>
                            <p style={{margin: "0"}}><strong>Sales Tax (6.875%):</strong></p>
                            <p style={{margin: "0"}}><span>${salesTax.toFixed(2)}</span></p>
                        </div>
                        <div style={{display: "flex", justifyContent: "space-between", fontSize: "18px"}}>
                            <p style={{margin: "0"}}><strong>Order Total:</strong></p>
                            <p style={{margin: "0"}}><span>${orderTotal}</span></p>
                        </div>
                        <button type="" className="order-btn">Confirm Order</button>
                    </div>
                        {confirmToggle && <div className="order-modal"><ConfirmOrder confirmToggle={confirmToggle} setConfirmToggle={setConfirmToggle} formData={formData} van={van} totalDays={totalDays} totalPrice={totalPrice} salesTax={salesTax} orderTotal={formData.orderTotal | 0}/></div>}
        </form>
        <br/>
    </div>
    )
}