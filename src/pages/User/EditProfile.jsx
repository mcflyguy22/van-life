import { db, storage } from "../../api/firebase"
import { updateDoc, doc } from "firebase/firestore"
import { useState, useEffect } from "react"
import { useNavigate, useOutletContext } from "react-router-dom"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import './StyleEditProfile.css'
import { getUID } from "../../api/api"
import { Avatar } from "@mui/material"

export default function AddVan() {
    const uid = getUID()
    const [userProfile, setUserProfile] = useOutletContext()
    const [file, setFile] = useState("")
    const [per, setPerc] = useState(null);
    const [error, setError] = useState(null)
    const [formData, setFormData] = useState({
        hostId: uid,
        firstName: userProfile.firstName,
        lastName: userProfile.lastName,
        email: userProfile.email,
        imageUrl: userProfile.imageUrl ? userProfile.imageUrl : null
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
                setFormData((prevFormData) => ({...prevFormData, imageUrl:downloadURL}))
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
            const res = await updateDoc(doc(db, "Users", formData.email), {
                hostId: formData.hostId,
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                imageUrl: formData.imageUrl
            })
            console.log(res)
            navigate("/user")
        } catch(error){
            setError(error.message)
            console.log(error.message)
        }
    }

    console.log(formData)
    return (
        <div className="add-van-form">
            <h1 style={{color: "black"}}>Update User Profile</h1>
            {error && <h2 style={{color: "red"}}>{error}</h2>}
            <form onSubmit={handleAdd}>
                <label htmlFor="name">First Name:</label>
                <input 
                    type="text"
                    placeholder="first name"
                    onChange={handleChange}
                    name="firstName"
                    value={formData.firstName}
                    required={true}
                    id="firstName"
                />
                <label htmlFor="name">Last Name:</label>
                <input 
                    type="text"
                    placeholder="last name"
                    onChange={handleChange}
                    name="lastName"
                    value={formData.lastName}
                    required={true}
                    id="lastName"
                />
                <label htmlFor="name">Email:</label>
                <input 
                    type="text"
                    placeholder="email address"
                    onChange={handleChange}
                    name="email"
                    value={formData.email}
                    required={true}
                    id="email"
                />
                <label htmlFor="imageUrl">
                  Profile Image: {formData.imageUrl && <Avatar alt="Current Image" src={formData.imageUrl}/>}
                </label>
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  name="imageUrl"
                  required={true}
                  id="imageUrl"
                />
                <button disabled={per !== null && per < 100} type="submit">Edit Profile</button>
            </form>
        </div>
    )
}