import { useOutletContext } from "react-router-dom"

export default function VanPricing() {
    const [hostVan, setHostVan] = useOutletContext()

    return (
        <div className="host-van-pricing-info">
            <h4 style={{color: "#000000"}}>${hostVan.price}<span>/day</span></h4>
        </div>
    )
}