import { Post } from "../types";
export declare const createPost: (post: Post) => Promise<import("@firebase/firestore").DocumentReference<import("@firebase/firestore").DocumentData, import("@firebase/firestore").DocumentData>>;
export declare const getPosts: () => Promise<import("@firebase/firestore").QuerySnapshot<import("@firebase/firestore").DocumentData, import("@firebase/firestore").DocumentData>>;
export declare const getPostByUserId: (id: string) => Promise<import("@firebase/firestore").QuerySnapshot<import("@firebase/firestore").DocumentData, import("@firebase/firestore").DocumentData>>;
export declare const getPost: (id: string) => Promise<import("@firebase/firestore").DocumentSnapshot<import("@firebase/firestore").DocumentData, import("@firebase/firestore").DocumentData>>;
export declare const deletePost: (id: string) => Promise<void>;
export declare const updateLikesOnPost: (id: string, userLikes: string[], likes: number) => Promise<void>;
