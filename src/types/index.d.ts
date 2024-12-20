import { User } from "firebase/auth";
export interface UserSignIn {
    email: string;
    password: string;
    confirmPassword?: string;
}
export interface Post {
    caption: string;
    photos: PhotoMeta[];
    likes: number;
    userLikes: [];
    userId: string | null;
    date: Date;
}
export interface PhotoMeta {
    cdnURL: string;
    uuid: string;
}
export interface FileEntry {
    name: string;
    size: number;
    type: string;
    url: string;
}
export interface DocRes {
    id?: string;
    caption?: string;
    photos?: PhotoMeta[];
    likes?: number;
    userLikes?: [];
    userId?: string | null;
    date?: Date;
}
export interface ProfilInfo {
    user?: User;
    photoURL?: string;
    displayName?: string;
}
