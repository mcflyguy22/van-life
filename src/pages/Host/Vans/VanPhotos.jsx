import { useOutletContext, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { auth, db } from "../../../api/firebase"
import { doc, updateDoc } from "firebase/firestore"


export default function VanPhotos() {
    const [hostVan, setHostVan] = useOutletContext()
    const uid = auth.currentUser.uid
    const navigate = useNavigate()
    const [error, setError] = useState(null)
    const [imageArr, setImageArr] = useState(hostVan.imageUrl)
    const [formData, setFormData] = useState({
        hostId: uid,
        name: hostVan.name,
        description: hostVan.description,
        price: hostVan.price,
        type: hostVan.type,
        imageUrl: imageArr
    }
    )

    console.log(hostVan.imageUrl)
    console.log(imageArr)

    function imageDelete(id) {
        var newImageArr = []
        for (let i=0; i<imageArr.length; i++) {
            (i !== id) ? newImageArr.push(imageArr[i]) : null
        }

        setImageArr(newImageArr)
    }

    useEffect(() => {
        setFormData((prevFormData) => ({...prevFormData, imageUrl: imageArr}))
    }, [imageArr])

    const handleSubmit = async(e) => {
        e.preventDefault()
        setError(null)
        try{
            const res = await updateDoc(doc(db, "vans", hostVan.id), {
                hostId: formData.hostId,
                name: formData.name,
                description: formData.description,
                price: formData.price,
                type: formData.type,
                imageUrl: formData.imageUrl
            })
            console.log(res)
            navigate("/host")
        } catch(error){
            setError(error.message)
            console.log(error.message)
        }
    }

    const imageElements = imageArr.map((image, index) => {
        return (
        <div key={index}>
            <img src={image}/>
            <button onClick={() => imageDelete(index)}>Remove</button>
        </div>
    )})


    return (
        <div className="host-van-photos">
            {error && <h2 style={{color: "red"}}>{error.message}</h2>}
            {imageElements}
            <button onClick={handleSubmit}>Save Changes</button>     
        </div>
    )
}