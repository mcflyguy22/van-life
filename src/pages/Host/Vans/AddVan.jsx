import { auth, db, storage } from "../../../api/firebase"
import { collection, addDoc } from "firebase/firestore"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { FaFileUpload } from "react-icons/fa"
import './StyleAddVan.css'

export default function AddVan() {
    const uid = auth.currentUser.uid
    const [file, setFile] = useState("")
    const [per, setPerc] = useState(null);
    const [error, setError] = useState(null)
    const [formData, setFormData] = useState({
        hostId: uid,
        name: "",
        description: "",
        price: 0,
        type: "",
        imageUrl: []
    })

    const navigate = useNavigate()

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
                var newImageArr = []
                newImageArr.push(downloadURL)
                setFormData((prevFormData) => ({...prevFormData, imageUrl:newImageArr}))
            });
            }
        );
        }

        file && uploadFile()
    }, [file])

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
            const res = await addDoc(collection(db, "vans"), {
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

    console.log(formData)
    return (
        <div className="add-van-form">
            <h1 style={{color: "black"}}>Add New Van</h1>
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
                <label htmlFor="imageUrl">
                  Image: <FaFileUpload />
                </label>
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  name="imageUrl"
                  required={true}
                  id="imageUrl"
                />
                <button disabled={per !== null && per < 100} type="submit">Add Van</button>
            </form>
        </div>
    )
}