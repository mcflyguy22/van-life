import { collection, getDocs, doc, getDoc, query, where } from "firebase/firestore";
import { db, auth } from "./firebase";

const vansCollectionRef = collection(db, "vans")

export async function getVans() {
    const querySnapshot = await getDocs(vansCollectionRef)
    const dataArr = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
    }))

    return dataArr
}

export async function getVan(id) {
    const docRef = doc(db, "vans", id)
    const vanSnapshot = await getDoc(docRef)

    return {
        ...vanSnapshot.data(),
        id: vanSnapshot.id
    }
}

export async function getHostVans() {
    const uid = auth.currentUser.uid
    const q = query(vansCollectionRef, where("hostId", "==", uid))
    const querySnapshot = await getDocs(q)

    const dataArr = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
    }))
    
    return dataArr
}

export async function getHostVan(id) {
    const docRef = doc(db, "vans", id)
    const vanSnapshot = await getDoc(docRef)

    return {
        ...vanSnapshot.data(),
        id: vanSnapshot.id
    }
}


