import { collection, getDocs, doc, getDoc, query, where } from "firebase/firestore";
import { db, auth } from "./firebase";

const vansCollectionRef = collection(db, "vans")
const ordersCollectionRef = collection(db, "Orders")
const reviewsCollectionRef = collection(db, "Reviews")

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

export async function getHostOrders() {
    const uid = auth.currentUser.uid
    const q = query(ordersCollectionRef, where("hostId", "==", uid))
    const querySnapshot = await getDocs(q)

    const dataArr = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
    }))
    
    return dataArr
}

export async function getOrder(id) {
    const docRef = doc(db, "Orders", id)
    const orderSnapshot = await getDoc(docRef)

    return {
        ...orderSnapshot.data(),
        id: orderSnapshot.id
    }
}

export async function getOrderReviews(id) {
    const q = query(reviewsCollectionRef, where("orderId", "==", id))
    const querySnapshot = await getDocs(q)

    const dataArr = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
    }))
    
    return dataArr
}

export async function getHostReviews() {
    const uid = auth.currentUser.uid
    const q = query(reviewsCollectionRef, where("hostId", "==", uid))
    const querySnapshot = await getDocs(q)

    const dataArr = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
    }))
    
    return dataArr
}

