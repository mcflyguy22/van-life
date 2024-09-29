import { useOutletContext } from "react-router-dom"

export default function VanPhotos() {
    const [hostVan, setHostVan] = useOutletContext()

    return (
        <div className="host-van-photos">
            <img src={hostVan.imageUrl} />            
        </div>
    )
}