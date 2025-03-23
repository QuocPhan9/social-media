import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { EditProfile, FriendCard, Loading, PostCard, ProfileCard } from '../../components';
import Navbar from '../Navbar/Navbar';
import { useParams } from 'react-router-dom';
import { deletePost, fetchPosts, getUserInfo, likePost } from '../../utils';



const Profile = () => {
    const {id} = useParams();
    const {user, edit} = useSelector((state) => state.user);
    const {posts} = useSelector((state) => state.posts);
    const [userInfo, setUserInfo] = useState(user);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    
    const url = "/posts/get-user-post/" + id;

    const getUser = async () => {
        const res = await getUserInfo(user?.token,id);
        setUserInfo(res);
    }
    
    const getPosts = async () => {
        await fetchPosts(user.token, dispatch, url);
        setLoading(false);
    }

    const handleDelete = async (id) => {
        await deletePost(id, user.token);
        await getPosts();
    };
    
    const handleLikePost = async (url) => {
        await likePost({url: url, token: user?.token});
        await getPosts();
    };

    useEffect(() => {
        setLoading(true);
        getUser();
        getPosts();
    }, [id]);
    return (
        <div>
            <Navbar/>
            <div className='home w-full px-0 bg-bgColor h-screen overflow-hidden'>
                {/* ProfileCard & PostCard */}
                <div className='w-full flex gap-2 pt-5 pb-14 h-full fixed'>
                    {/* LEFT */}
                    <div className='hidden w-1/3 lg:w-1/4 h-full md:flex flex-col gap-6 overflow-y-auto pl-8'>
                        <ProfileCard user={userInfo}/> 
                    </div>
                    {/* CENTER */}
                    <div className='flex-1 h-full px-4 flex flex-col gap-6 overflow-y-auto rounded-lg pb-8'>
                        
                        {loading ? (
                            <Loading />
                        ) : posts?.length > 0 ? (
                            posts?.map((post) => (
                                <PostCard
                                    post={post}
                                    key={post?._id}
                                    user={user}
                                    deletePost={handleDelete}
                                    likePost={handleLikePost}
                                />
                            ))
                        ) : (
                            <div className='flex w-full h-full items-center justify-center'>
                                <p className='text-lg text-ascent-2'>No Post Available</p>
                            </div>
                        )}
                    </div>
                    {/* RIGHT */}
                    <div className='hidden w-1/4 lg:flex h-full md:flex flex-col gap-6 pb-14 pr-8'>
                        <FriendCard friends={userInfo?.friends} />
                    </div>

                </div>
            </div>
            {edit && <EditProfile/>}
        </div>
    )   
}

export default Profile
