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

    console.log("hostVan.imageUrl: ", hostVan.imageUrl)
    console.log("imageArr: ", imageArr)

    function imageDelete(id) {
        var newImageArr = []
        for (let i=0; i<imageArr.length; i++) {
            (i !== id) ? newImageArr.push(imageArr[i]) : null
        }

        setImageArr(newImageArr)
    }

    function makeMain(id) {
        var newImageArr = []
        for (let i=0; i<imageArr.length; i++) {
            (i !== id) ? newImageArr.push(imageArr[i]) : newImageArr.unshift(imageArr[i])
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
            navigate(".")
        } catch(error){
            setError(error.message)
            console.log(error.message)
        }
    }

    const imageElements = imageArr.map((image, index) => {
        var imageUrlName = image.split("/")
        imageUrlName = imageUrlName[imageUrlName.length - 1]
        imageUrlName = imageUrlName.split("?")[0]
        console.log(imageUrlName)
        
        return (
        <div key={index} style={{display: "flex", marginTop: "27px"}}>
            <img src={image}/>
            <div style={{wordWrap: "break-word", overflowWrap: "break-word", marginInline: "27px", display: "flex", flexDirection: "column", rowGap: "8px", alignItems: "start", justifyContent: "center"}}>
                <p style={{color: "black", margin: "0"}}>Image #{index + 1}</p>
                <p style={{color: "black", margin: "0", wordWrap: "break-word", overflowWrap: "break-word"}}>Filename: {imageUrlName}</p>
                <span>
                <button style={{marginRight: "10px", borderRadius: "6px", outline: "none", backgroundColor: "red"}} onClick={() => imageDelete(index)}>Remove Image</button>
                {(index > 0) ? <button style={{marginRight: "10px", borderRadius: "6px", outline: "none", backgroundColor: "green"}} onClick={() => makeMain(index)}>Set as Main</button> : <i style={{color: "black"}}>Main Image</i>}
                </span>
            </div>
        </div>
    )})


    return (
        <div className="host-van-photos">
            {error && <h2 style={{color: "red"}}>{error.message}</h2>}
            {imageElements}
            <button className="save-photos-btn" onClick={handleSubmit}>Save Changes</button>     
        </div>
    )
}