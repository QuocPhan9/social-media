import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { NoProfile } from '../assets';
import { FaRegHeart,FaHeart } from "react-icons/fa";
import { BiComment } from "react-icons/bi";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import moment from 'moment';
import { Menu, MenuButton, MenuItems } from '@headlessui/react';
import Loading from './Loading';
import { apiRequest } from '../utils';
import { useForm } from 'react-hook-form';
import TextInput from './TextInput';
import CustomButton from './CustomButton';

const getPostComments = async (id) => {
    try {
        const res = await apiRequest({
            url: "/posts/comments/" + id,
            method: "GET"
        });
        return res?.data;
    } catch (error) {
        console.log(error);
    }
}

const ReplyCard = ({ reply, user, handleLike }) => {
    return (
        <div className='w-full py-3'>
            <div className='flex gap-3 items-center mb-1'>
                <Link to={"/profile/" + reply?.userId?._id}>
                    <img
                        src={reply?.userId?.profileUrl ?? NoProfile}
                        alt={reply?.userId?.firstName}
                        className='w-10 h-10 rounded-full object-cover'
                    />
                </Link>

                <div>
                    <Link to={"/profile/" + reply?.userId?._id}>
                        <p className='font-medium text-base text-ascent-1'>
                            {reply?.userId?.firstName} {reply?.userId?.lastName}
                        </p>
                    </Link>
                    <span className='text-ascent-2 text-sm'>
                        {moment(reply?.createdAt).fromNow()}
                    </span>
                </div>
            </div>

            <div className='ml-12'>
                <p className='text-ascent-2 '>{reply?.comment}</p>
                <div className='mt-2 flex gap-6'>
                    <p
                        className='flex gap-2 items-center text-base text-ascent-2 cursor-pointer'
                        onClick={handleLike}
                    >
                        {reply?.likes?.includes(user?._id) ? (
                            <FaHeart size={20} color='red' />
                        ) : (
                            <FaRegHeart size={20} />
                        )}
                        {reply?.likes?.length} Likes
                    </p>
                </div>
            </div>
        </div>
    );
};

const CommentForm = ({ user, id, replyAt, getComments }) => {
    const [loading, setLoading] = useState(false);
    const [errMsg, setErrMsg] = useState("");
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        mode: "onChange",
    });

    const onSubmit = async (data) => {
        setLoading(true);
        setErrMsg("");

        try {
            const URL = !replyAt ? ("/posts/comment/" + id) : ("/posts/reply-comment/" + id);

            const newData = {
                comment: data?.comment,
                from: user?.firstName + " " + user.lastName,
                replyAt: replyAt,
            };

            const res =await apiRequest({
                url: URL,
                data: newData,
                token: user?.token, 
                method: "POST",
            })

            if(res?.status === "failed") {
                setErrMsg(res);
            } else {
                reset({
                    comment: "",
                });
                setErrMsg("");
                await getComments();
            }
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className='w-full border-b border-[#66666645]'
        >
            <div className='w-full flex items-center gap-2 py-4'>
                <img
                    src={user?.profileUrl ?? NoProfile}
                    alt='User'
                    className='w-10 h-10 rounded-full object-cover'
                />

                <TextInput
                    name='comment'
                    styles='w-full rounded-full py-3'
                    placeholder={replyAt ? `Reply @${replyAt}` : "Comment this post"}
                    register={register("comment", {
                        required: "Comment can not be empty",
                    })}
                    error={errors.comment ? errors.comment.message : ""}
                />
            </div>
            {errMsg?.message && (
                <span
                    role='alert'
                    className={`text-sm ${errMsg?.status === "failed"
                            ? "text-[#f64949fe]"
                            : "text-[#2ba150fe]"
                        } mt-0.5`}
                >
                    {errMsg?.message}
                </span>
            )}

            <div className='flex items-end justify-end pb-2'>
                {loading ? (
                    <Loading />
                ) : (
                    <CustomButton
                        title='Submit'
                        type='submit'
                        containerStyles='bg-[#0444a4] text-white py-1 px-3 rounded-full font-semibold text-sm'
                    />
                )}
            </div>
        </form>
    );
};

const PostCard = ({post, user, deletePost, likePost, socket}) => {
    const [showAll, setShowAll] = useState(0);
    const [showReply, setShowReply] = useState(0);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [replyComments, setRelyComments] = useState(0);
    const [showComments, setShowComments] = useState(0);
    const getIdUser = user?._id === post?.userId?._id;
    const menuEdit = getIdUser ? <HiOutlineDotsHorizontal className='text-ascent-1' size={20}/> : "";

    const getComments = async (id) => {
        setRelyComments(0);
        const result = await getPostComments(id);
        setComments(result);
        setLoading(false);
    }

    const handleLike = async (url) => {
        await likePost(url);
        await getComments(post?._id);
    }
   
    return (
        <div className='mb-2 bg-primary p-4 rounded-lg '>
            <div className='flex gap-2 items-center mb-2'>
                {/* Avatar */}
                <Link to={"/profile/" + post?.userId?._id} className='items-center rounded-full'>
                    <img src={post?.userId?.profileUrl ?? NoProfile} alt={post?.userId?.firstName} className='w-10 h-10 object-cover rounded-full'/>
                </Link>
                {/* Post */}
                <div className='w-full flex justify-between'>
                    <div className=''>
                        <Link to={"/profile/" + post?.userId?._id}>
                            <p className='font-medium text-lg text-ascent-1'>
                                {post?.userId?.firstName} {post?.userId?.lastName}
                            </p>
                        </Link>
                        <span className='text-ascent-2'>
                            {moment(post?.createdAt ?? "2024-10-17").fromNow()}
                        </span>
                    </div>
                    <Menu as="div" className="relative inline-block text-left text-ascent-1">
                        <div>
                            <MenuButton >
                                {menuEdit}
                            </MenuButton>
                        </div>

                        <MenuItems
                            transition
                            className="absolute right-0 z-10 mt-2 w-20 origin-top-right divide-y divide-bgColor rounded-md bg-primary shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in hover:bg-bgColor"
                        >
                            <div className="py-1">
                                <MenuItems>
                                    
                                    {
                                        user?._id === post?.userId?._id && (
                                            <div className='flex cursor-pointer mx-4' onClick={() => deletePost(post?._id)}>
                                                <span>Delete</span>
                                            </div>
                                        )
                                    }
                                    
                                </MenuItems>
                            </div>
                        </MenuItems>
                    </Menu>
                </div>
            </div>

            <div className=''>
                <p className='text-ascent-2'>
                    {showAll === post?._id ? post?.description : post?.description.slice(0, 300)}
                    {post?.description?.length > 301 && (
                            showAll === post?._id ? (
                                <span 
                                    className='text-blue ml-2 font-medium cursor-pointer' onClick={() => {setShowAll(0)}}>
                                    Show less
                                </span>)
                                : 
                                (<span 
                                    className='text-blue ml-2 font-medium cursor-pointer'    onClick={() => {setShowAll(post?._id)}}>
                                    Show more
                                </span>
                            )
                        )
                    }
                </p>
                {
                    post?.image && (
                        <img src={post?.image} alt='post' className='w-full my-10 mt-2 rounded-xl'/>
                    )
                }
            </div>

            <div className='mt-4 flex justify-between items-center text-base border-t border-[#66666645] px-3 py-2 text-ascent-2'>
                {/* Like post */}
                <p className='flex gap-2 items-center text-base cursor-pointer' onClick={() => handleLike(`/posts/like/${post?._id}`)}
                >
                    {post?.likes?.includes(user?._id) ? (
                        <FaHeart size={20} color='red'/>
                    ) : (
                        <FaRegHeart size={20}/>
                    )}
                    {post?.likes?.length} Likes
                </p>
                {/* Comment post */}
                <p className='flex gap-2 items-center text-base cursor-pointer' onClick={() => {
                    setShowComments(showComments === post._id ? null : post._id)
                    getComments(post?._id)
                }}>
                    <BiComment size={20}/>
                    {post?.comments?.length} Comments
                </p>
            </div>
            {/* Comments */}
            {
                showComments === post?._id && <div className='w-full mt-4 border-t border-[#66666645] pt-4'>
                    <CommentForm 
                        user={user}
                        id={post?._id}
                        getComments={() => getComments(post?._id)}
                    />

                    {
                        loading ? (<Loading/>) : (
                            comments?.length > 0 ? (
                                comments?.map((comment) => (
                                    <div key={comment?._id} className='w-ful py-2'>
                                        <div className='flex gap-3 items-center mb-1'>
                                            <Link to={"/profile/" + comment?.userId?._id}>
                                                <img src={comment?.userId?.profileUrl ?? NoProfile} alt={comment?.userId?.firstName} className='w-10 h-10 rounded-full object-cover'/>

                                            </Link>
                                            <div className=''>
                                                <Link to={"/profile/"  + comment?.userId?._id}>
                                                    <p className='font-medium text-base text-ascent-1'>
                                                        {comment?.userId?.firstName} {comment?.userId?.lastName}
                                                    </p>
                                                </Link>
                                                <span className='text-ascent-2 text-sm'>
                                                    {moment(comment?.createdAt ?? "2024-10-17").fromNow()}
                                                </span>
                                            </div>
                                        </div>
                                        {/* Comment post */}
                                        <div className='ml-12'>
                                            <p className='text-ascent-2'>
                                                {comment?.comment}
                                            </p>
                                            <div className='mt-2 flex gap-6'>
                                                <p 
                                                    className='flex gap-2 items-center text-base text-ascent-2 cursor-pointer'
                                                    onClick={() => handleLike("/posts/like-comment/" + comment?._id)}
                                                >
                                                    {comment?.likes?.includes(user?._id) ? (
                                                        
                                                        <FaHeart size={20} color='red'/>
                                                    ) : (
                                                        <FaRegHeart size={20}/>
                                                    )}
                                                    {comment?.likes?.length} Likes
                                                </p>
                                                <span className='text-blue cursor-pointer' onClick={() => setRelyComments(comment?._id)}>
                                                    Reply
                                                </span>
                                            </div>
                                            {replyComments === comment?._id && (
                                                <CommentForm 
                                                    user={user}
                                                    id={comment?._id}
                                                    replyAt={comment?.from}
                                                    getComments={() => getComments(post?._id)}
                                                />
                                            )}
                                        </div>

                                        {/* replies */}
                                        <div className='py-2 px-8 mt-6'>
                                            {comment?.replies?.length > 0 && (
                                                <p className='text-base text-ascent-1 cursor-pointer' onClick={() => setShowReply(
                                                    showReply === comment?.replies?._id ? 0 : comment?.replies?._id
                                                )}>
                                                    Show Replies ({comment?.replies?.length})
                                                </p>
                                            )}

                                            {showReply === comment?.replies?._id && comment?.replies?.map((reply) => (
                                                <ReplyCard 
                                                    reply={reply} 
                                                    user={user} 
                                                    key={reply?._id} 
                                                    handleLike={() => 
                                                        handleLike("/posts/like-comment/" + comment?._id + "/" + reply?._id)
                                                    }
                                                />
                                            ))}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <span className='flex text-sm py-4 text-ascent-2 text-center'>
                                    No comments, be first to comment
                                </span>
                            )
                        )
                    }

                </div>
            }
        </div>
    )
}

export default PostCard
