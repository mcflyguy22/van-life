import { auth, db, storage } from "../../../api/firebase"
import { updateDoc, doc } from "firebase/firestore"
import { useState, useEffect } from "react"
import { useNavigate, useOutletContext } from "react-router-dom"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { FaFileUpload } from "react-icons/fa"

export default function AddVan() {
    const [hostVan, setHostVan] = useOutletContext()
    const uid = auth.currentUser.uid
    const [file, setFile] = useState("")
    const [per, setPerc] = useState(null);
    const [error, setError] = useState(null)
    const [imageArr, setImageArr] = useState(hostVan.imageUrl)
    const [formData, setFormData] = useState({
        hostId: uid,
        name: hostVan.name,
        description: hostVan.description,
        price: hostVan.price,
        type: hostVan.type,
        imageUrl: imageArr
    })
    const navigate = useNavigate()
    console.log(imageArr)
    console.log("formData: ", formData.imageUrl)

    var imageUrlName = hostVan.imageUrl[0].split("/")
    imageUrlName = imageUrlName[imageUrlName.length - 1]
    imageUrlName = imageUrlName.split("?")[0]
    console.log(imageUrlName)

    useEffect(() => {
        const uploadFile = () => {

            const name = new Date().getTime() + file.name;

            const storageRef = ref(storage, name);
            const uploadTask = uploadBytesResumable(storageRef, file, name);

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on('state_changed',
            (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            setPerc(progress)
            switch (snapshot.state) {
                case 'paused':
                console.log('Upload is paused');
                break;
                case 'running':
                console.log('Upload is running');
                break;
                default:
                    break;
            }
            }, 
            (error) => {
            console.log(error)
            }, 
            () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                setImageArr(prevImages => [...prevImages, downloadURL])
            });
            }
        );
        }
        file && uploadFile()
    }, [file])

    // function imageDelete(id) {
    //     var newImageArr = []
    //     for (let i=0; i<imageArr.length; i++) {
    //         (i !== id) ? newImageArr.push(imageArr[i]) : null
    //     }
    //     setImageArr(newImageArr)
    //     setFormData((prevFormData) => ({...prevFormData, imageUrl: imageArr}))
    // }

    // const renderImageElements = imageArr.map((image, index) => {
    //     return (<div key={index}>
    //         <img src={image}/>
    //         <button onClick={imageDelete(index)}>Remove</button>
    //     </div>
    // )})

    function handleChange(event) {
        const {name, value } = event.target;
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
    }

    const handleAdd = async(e) => {
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

    useEffect(() => {
        setFormData(prevFormData => ({...prevFormData, imageUrl: imageArr}))
    }, [imageArr])

    console.log(formData)
    return (
        <div className="host-van-detail-info">
            <div className="add-van-form">
            <h1 style={{color: "black"}}>Edit {hostVan.name}</h1>
            {error && <h2 style={{color: "red"}}>{error}</h2>}
            <form onSubmit={handleAdd}>
                <label htmlFor="name">Van Name:</label>
                <input 
                    type="text"
                    placeholder="van name"
                    onChange={handleChange}
                    name="name"
                    value={formData.name}
                    required={true}
                    id="name"
                />
                <label htmlFor="description">Van Description:</label>
                <textarea
                    rows={4}
                    cols={40}
                    placeholder="description"
                    onChange={handleChange}
                    name="description"
                    value={formData.description}
                    required={true}
                    id="description"
                />
               <label htmlFor="price">Van Price:</label>
                <input
                    type="number"
                    onChange={handleChange}
                    name="price"
                    value={formData.price}
                    required={true}
                    id="price"
                />
                <label htmlFor="type">Van Type:</label>
                <select
                    onChange={handleChange}
                    name="type"
                    value={formData.type}
                    required={true}
                    id="type"
                >
                    <option value="">--Choose Type--</option>
                    <option value="simple">Simple</option>
                    <option value="luxury">Luxury</option>
                    <option value="rugged">Rugged</option>
                </select>
                <label htmlFor="imageUrl" className="file-btn">
                  Add Image: <FaFileUpload />
                </label>
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  name="imageUrl"
                  required={false}
                  id="imageUrl"
                />
                {/* {formData.imageUrl && <p style={{color: "red"}}>Current images: {imageUrlName}</p>} */}
                <button disabled={per !== null && per < 100} type="submit">Save Changes</button>
            </form>
            </div>
        </div>
    )
}