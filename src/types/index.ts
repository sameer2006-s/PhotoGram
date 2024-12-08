import { OutputFileEntry } from "@uploadcare/react-uploader";

export interface UserSignIn{
    email:string;
    password:string;
    confirmPassword?:string;
}

export interface Post{
    caption:string;
    photos:PhotoMeta[];
    likes:number,
    userLikes:[],
    userId:string|null,
    date:Date,
}

export interface PhotoMeta{
    cdnURL:string,
    uuid:string
}

export interface FileEntry {
    name: string;
    size: number;
    type: string; // MIME type
    url: string; // URL of the file
}