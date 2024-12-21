import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { Post, UserProfile } from "../types";

const COLLECTION_NAME = 'posts';
const COLLECTION2_NAME = 'usersInfo';


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

export const createUserInfo = (userId: string, userInfo: UserProfile) => {
    return setDoc(doc(db, COLLECTION2_NAME, userId), userInfo);
};

export const getUserInfo = (userId:string)=>{
    return getDoc(doc(db,COLLECTION2_NAME,userId))
}

export const updateUserInfo = (userId: string, userInfo:UserProfile): Promise<void> => {
    const docRef = doc(db, COLLECTION2_NAME, userId)
    return updateDoc(docRef, {
        displayName: userInfo.displayName,
        photoURL: userInfo.photoURL,
        userBio: userInfo.userBio,
        userEmail: userInfo.userEmail
    })}