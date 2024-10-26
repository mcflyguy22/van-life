import { useSearchParams, Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { db } from "../../api/firebase"
import { getDoc, doc } from "firebase/firestore"
import './invoice.css'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

export default function OrderSuccess() {
    const [loader, setLoader] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams()
    const [orderData, setOrderData] = useState({})
    const orderID = searchParams.get("orderId")

    useEffect(() => {
        if (orderID) {
            const fetchData = async () => {
            const docRef = doc(db, "Orders", orderID)
            const orderSnapshot = await getDoc(docRef)
            
            setOrderData(orderSnapshot.data())
        }
            
          fetchData()
    } else {
        return console.log("no order")
    }
    }, [])

    console.log(orderData)


    const downloadPDF = () =>{
        const capture = document.querySelector('.actual-receipt');
        setLoader(true);
        html2canvas(capture).then((canvas)=>{
          const imgData = canvas.toDataURL('img/png');
          const doc = new jsPDF('p', 'mm', 'a4', true);
          const componentWidth = doc.internal.pageSize.getWidth();
          const componentHeight = doc.internal.pageSize.getHeight();
          const imgWidth = canvas.width
          const imgHeight = canvas.height
          const ratio = Math.min(componentWidth / imgWidth, componentHeight / imgHeight)
          const imgX = (componentWidth - imgWidth * ratio) / 2
          const imgY = 30
          doc.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
          setLoader(false);
          doc.save('receipt.pdf');
        })
      }

    return (
        <div style={{marginInline: "27px", color: "#4d4d4d", display: "flex", flexDirection: "column", justifyContent: "center"}}>
        <h1>Thanks so much for your order!</h1>
        <p>Your reservation is from {orderData.beginDate} to {orderData.endDate}.</p>
        <center><Link to={`/${orderID}`}>View Order Details/Leave a Review</Link></center>
        
        <div className="receipt-box">

            {/* actual receipt */}
            <div className="actual-receipt">

            {/* organization name */}
            <h1>#VANLIFE</h1>

            {/* client full name */}
            <h6>
                {orderData.firstName} {orderData.lastName}
            </h6>

            {/* email - orderID */}
            <div className="phone-and-website">
                <p><a href={`mailto:${orderData.email}`}>{orderData.email}</a></p>
                <p style={{marginTop: "10px"}}>Order ID: {orderID}</p>                    
            </div>

            <div className="colored-row">
                <span>Reservation&nbsp;Details</span>
            </div>

            <div className="data-row border-bottom">
                <span className="font-weight">Van ID: {orderData.van}</span>
                
            </div>
            <div className="data-row border-bottom">
                <span className="font-weight">Reservation Dates: {orderData.beginDate} - {orderData.endDate}</span>
            </div>
            <div className="data-row border-bottom">
                <span className="font-weight">Order Total: ${orderData.orderTotal}</span>
                
            </div>

            <div className="colored-row">
                <span>Thank You For Choosing VANLIFE!</span>
            </div>

            </div>
        </div>

        <div className="receipt-actions-div">
            <div className="actions-right">
              <button
                className="receipt-modal-download-button"
                onClick={downloadPDF}
                disabled={!(loader===false)}
              >
                {loader?(
                  <span>Downloading PDF</span>
                ):(
                  <span>Download Order PDF</span>
                )}
              </button> 
            </div>
            <br/>
        </div>
    </div>
    )
}