import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, updateDoc, where } from "firebase/firestore";
import { db } from "../firebaseConfig";
const COLLECTION_NAME = 'posts';
export const createPost = (post) => {
    return addDoc(collection(db, COLLECTION_NAME), post);
};
export const getPosts = () => {
    const q = query(collection(db, COLLECTION_NAME), orderBy("date", "desc"));
    return getDocs(q);
};
export const getPostByUserId = (id) => {
    const q = query(collection(db, COLLECTION_NAME), where('userId', '==', id));
    return getDocs(q);
};
export const getPost = (id) => {
    return getDoc(doc(collection(db, COLLECTION_NAME, id)));
};
export const deletePost = (id) => {
    return deleteDoc(doc(collection(db, COLLECTION_NAME, id)));
};
export const updateLikesOnPost = (id, userLikes, likes) => {
    const docRef = doc(db, COLLECTION_NAME, id);
    return updateDoc(docRef, {
        userLikes: userLikes,
        likes: likes
    });
};

export const getUserLikes = async (userId) => {
    const q = query(collection(db, COLLECTION_NAME), where('userLikes', 'array-contains', userId));
    const querySnapshot = await getDocs(q);
    const likedPosts = querySnapshot.docs.map((doc) => doc.id); // Return post IDs where the user has liked
    return likedPosts;
};