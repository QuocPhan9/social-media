import axios from 'axios'
import { SetPosts } from '../redux/redux/postSlice';


const API_URL = "http://social-media-backend-kappa-seven.vercel.app";

export const API = axios.create({
    baseURL: API_URL,
    responseType: "json"
});

export const apiRequest = async ({url, token, data, method}) => {
    try {
        const result = await API(url,{
            method: method || "GET",
            data: data,
            headers: {
                "Content-Type": "application/json",                
                Authorization: token ? `Bearer ${token}` : undefined,
            },
        }); 
        
        return result?.data;
    } catch (error) {
        const err = error.response ? error.response.data : { message: 'Network Error', success: false };
        console.log(err);
        return { status: err.success, message: err.message || 'An error occurred' };
    }
}

export const handleFileUpLoad = async (uploadFile) => {
    const formData = new FormData();
    formData.append("file", uploadFile);
    formData.append("upload_preset", "social");
    
    const isVideo = uploadFile.type.startsWith('video/');
    const CLOUDINARY_CLOUD_NAME = "dkd0o04li"
    const uploadPreset = isVideo ? 'social' : 'social'; // Replace with your presets
    const cloudinaryUrl = isVideo 
        ? `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/video/upload`
        : `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;
    formData.append('upload_preset', uploadPreset);

    console.log(uploadPreset);

    try {
        
        const response = await axios.post(
            cloudinaryUrl,
            formData
        )
        //console.log(response);
        return response.data.secure_url;
    } catch (error) {
        console.log(error)
    }
}

export const fetchPosts = async (token, dispatch, url, data) => {
    try {
        const res = await apiRequest({
            url: url || "/posts",
            token: token,
            method: "POST",
            data: data || {},
        });
        
        dispatch(SetPosts(res?.data));
        return;
    } catch (error) {
        console.error(error);
    }
}

export const likePost = async ({url, token}) => {
    try {
        const res = await apiRequest({
            url: url,
            token: token,
            method: "POST",
        });
        return res;
    } catch (error) {
        console.error(error);
    }
}

export const deletePost = async (id, token) => {
    try {
        const res = await apiRequest({
            url: "/posts/" + id,
            token: token, 
            method: "DELETE",

        });
        return res
    } catch (error) {
        console.log(error);
    }
}

export const getUserInfo = async (token, id) => {
    try {
        const url = id === undefined ? "/users/get-user/" : "/users/get-user/" + id;

        const res = await apiRequest({
            url: url,
            token: token, 
            method: "POST"
        });

        if(res?.message === "Authentication failed") {
            localStorage.removeItem("user");
            window.alert("User session expired. Login again");
            window.location.replace("/login");
        }
        return res?.user;
    } catch (error) {
        console.log(error)
    }
}

export const sendFriendRequest = async (token, id) => {
    try {
        const res = await apiRequest({
            url: "/users/friend-request",
            token: token,
            method: "POST",
            data: {requestTo: id},
        })
        return res;
    } catch (error) {
        console.error(error);
    }
}

export const viewUserProfile = async (token, id) => {
    try {
        const res = await apiRequest({
            url: "/users/profile-view",
            token: token,
            method: "POST",
            data: {id}
        })

        return res;
    } catch (error) {
        console.log(error);
    }
}
