import { useOutletContext } from "react-router-dom"


export default function VanDetail() {
    const [hostVan, setHostVan] = useOutletContext()
    return (
        <section className="host-van-detail-info">
        
            <h4 style={{color: "#000000"}}>Name: <span>{hostVan.name}</span></h4>
            <h4 style={{color: "#000000"}}>Category: <span>{hostVan.type}</span></h4>
            <h4 style={{color: "#000000"}}>Description: <span>{hostVan.description}</span></h4>
            <h4 style={{color: "#000000"}}>Visibility: <span>Public</span></h4>

        </section>
    )
}