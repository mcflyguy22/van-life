
export default function ConfirmOrder(props) {
    const van = props.van
    const formData = props.formData
    const totalDays = props.totalDays
    const totalPrice = props.totalPrice
    const orderTotal = props.orderTotal
    const salesTax = props.salesTax

    return (
        <>
        <h1 style={{color: "black"}}>Hi {formData.firstName} {formData.lastName.charAt(0)}.</h1>
        <p>Please confirm your order details below before submitting.</p>
        <div style={{display: "flex", margin: "7px", flexDirection: "column", color: "#4d4d4d", backgroundColor: "#FFF7ED", padding: "10px", borderRadius: "5px"}}>
                        <div style={{display: "flex", justifyContent: "space-between", fontSize: "14px"}}>
                            <p style={{margin: "0"}}><strong>Email:</strong></p>
                            <p style={{margin: "0"}}><span>{formData.email}</span></p>
                        </div>
                        <div style={{display: "flex", justifyContent: "space-between", fontSize: "14px"}}>
                            <p style={{margin: "0"}}><strong>Pick-Up:</strong></p>
                            <p style={{margin: "0"}}><span>{formData.beginDate.$d.toDateString()}</span></p>
                        </div>
                        <div style={{display: "flex", justifyContent: "space-between", fontSize: "14px"}}>
                            <p style={{margin: "0"}}><strong>Drop-Off:</strong></p>
                            <p style={{margin: "0"}}><span>{formData.endDate.$d.toDateString()}</span></p>
                        </div>
                        <div style={{display: "flex", justifyContent: "space-between", fontSize: "14px"}}>
                            <p style={{margin: "0"}}><strong>Van Price:</strong></p>
                            <p style={{margin: "0"}}><span>${van.price}/day</span></p>
                        </div>
                        <div style={{display: "flex", justifyContent: "space-between", fontSize: "14px"}}>
                            <p style={{margin: "0"}}><strong>Total Days:</strong></p>
                            <p style={{margin: "0"}}><span>{totalDays} days</span></p>
                        </div>
                        <div style={{display: "flex", justifyContent: "space-between", fontSize: "14px"}}>
                            <p style={{margin: "0"}}><strong>Rental Cost:</strong></p>
                            <p style={{margin: "0"}}><span>${totalPrice}</span></p>
                        </div>
                        <div style={{display: "flex", justifyContent: "space-between", fontSize: "14px", borderBottom: "double #4d4d4d"}}>
                            <p style={{margin: "0"}}><strong>Sales Tax:</strong></p>
                            <p style={{margin: "0"}}><span>${salesTax.toFixed(2)}</span></p>
                        </div>
                        <div style={{display: "flex", justifyContent: "space-between", fontSize: "18px"}}>
                            <p style={{margin: "0"}}><strong>Order Total:</strong></p>
                            <p style={{margin: "0"}}><span>${orderTotal}</span></p>
                        </div>
                        <div style={{display: "flex", justifyContent: "space-between", columnGap: "10px", fontSize: "18px"}}>
                        <button type="" className="order-btn-cancel" onClick={() => props.setConfirmToggle(!props.confirmToggle)}>Cancel</button>
                        <button type="" className="order-btn-confirm" onClick={(e) => props.handleSubmit(e, true)}>Submit</button>
                        </div>
                    </div>
        </>
    )
}