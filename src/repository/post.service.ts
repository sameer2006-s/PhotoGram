import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, updateDoc, where } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { Post } from "../types";

const COLLECTION_NAME = 'posts';

export const createPost = (post:Post)=>{
    return addDoc(collection(db,COLLECTION_NAME),post);
}

export const getPosts = () =>{
    const q = query(collection(db,COLLECTION_NAME),orderBy("date","desc"));
    return getDocs(q)
}

export const getPostByUserId = (id:string)=>{
    const q =query(collection(db,COLLECTION_NAME),where('userId','==',id))
    return getDocs(q)
}

export const getPost = (id:string)=>{
    return getDoc(doc(collection(db,COLLECTION_NAME,id)))
}
export const deletePost = (id:string)=>{
    return deleteDoc(doc(collection(db,COLLECTION_NAME,id)))
}

export const updateLikesOnPost = (id: string, userLikes: string[], likes: number): Promise<void> => {
    const docRef = doc(db, COLLECTION_NAME, id)
    return updateDoc(docRef, {
        userLikes: userLikes,
        likes: likes
    })
}
