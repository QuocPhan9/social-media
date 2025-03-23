import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import { Link } from 'react-router-dom'
import { FaUserFriends, FaBirthdayCake } from "react-icons/fa";
import { IoMdPersonAdd } from "react-icons/io";
import { NoProfile } from '../../assets';
import { CustomButton } from '../../components';
import { apiRequest, sendFriendRequest } from '../../utils';
import { useSelector } from 'react-redux';
import { BsPersonFillAdd } from 'react-icons/bs';
const Friend = () => {
    const { user } = useSelector((state) => state.user);
    const [friendRequest, setFriendRequest] = useState([]);
    const [suggestedFriends, setSuggestedFriends] = useState([]);

    const fetchFriendRequests = async () => {
        try {
            const res = await apiRequest({
                url: "/users/get-friend-request",
                token: user?.token,
                method: "POST"
            })
            setFriendRequest(res?.data);
        } catch (err) {
            console.log(err);
        }
    }

    const fetchFriendSuggests = async () => {
        try {
            const res = await apiRequest({
                url: "/users/suggested-friends",
                token: user?.token,
                method: "POST"
            })
            setSuggestedFriends(res?.data);
        } catch (err) {
            console.log(err);
        }
    }

    const handleFriendRequest = async (id) => {
        try {
            const res = await sendFriendRequest(user.token, id);
            await fetchFriendSuggests();
            return res;
        } catch (error) {
            console.error(error);
        }
    }

    const acceptFriendRequest = async (id, status) => {
        try {
            const res = await apiRequest({
                url: "/users/accept-request",
                token: user?.token,
                method: "POST",
                data: { rid: id, status },

            });
            setFriendRequest(res?.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchFriendRequests();
        fetchFriendSuggests();
    }, [])
    return (
        <div className='w-full px-0 pb-14 bg-bgColor h-screen overflow-hidden'>
            <Navbar />
            <div className='w-full flex gap-2 lg:gap-4 h-full'>
                {/* LEFT MENU */}
                <div className='hidden w-1/3 lg:w-1/4 md:flex flex-col gap-6 overflow-y-auto'>
                    <div className='p-4 bg-primary shadow-md text-sm flex-col h-full gap-4 '>
                        <span className='font-medium text-2xl text-ascent-1'>Friends</span>
                        <Link to={"/friends"}>
                            <div className='flex items-center mt-2 gap-4 hover:bg-bgColor rounded-lg px-2 py-2'>
                                <FaUserFriends className='text-ascent-1' size={32} />
                                <span className='font-medium text-lg text-ascent-1'>Home</span>
                            </div>
                        </Link>
                        <Link to={"/friends/requests"}>
                            <div className='flex items-center mt-2 gap-4 hover:bg-bgColor rounded-lg px-2 py-2'>
                                <FaUserFriends className='text-ascent-1' size={32} />
                                <span className='font-medium text-lg text-ascent-1'>Friend requests</span>
                            </div>
                        </Link>
                        <Link to={"/friends/suggestions"}>
                            <div className='flex items-center mt-2 gap-4 hover:bg-bgColor rounded-lg px-2 py-2'>
                                <IoMdPersonAdd className='text-ascent-1' size={32} />
                                <span className='font-medium text-lg text-ascent-1'>Suggestions</span>
                            </div>
                        </Link>
                    </div>
                </div>

                {/* RIGHT MENU */}
                <div className='px-2 overflow-y-auto w-full mb-10'>
                    {/* Friend requests */}
                    <span className='font-medium text-lg text-ascent-1'>Friend requests</span>
                    <div className="flex flex-wrap gap-4">
                        {friendRequest?.map(({ _id, requestFrom: from }, index) => (
                            <div key={index} className='flex items-center justify-between pt-4'>
                                <Link to={"/profile/" + from._id} className='flex gap-4 items-center cursor-pointer'>
                                    <div className="max-w-xs mx-auto bg-primary rounded-lg shadow-md overflow-hidden">
                                        <img className="w-full h-48 object-cover" src={from?.profileUrl ?? NoProfile} alt={from?.firstName} />
                                        <div className="p-4">
                                            <h2 className="text-lg font-semibold text-ascent-1">{from?.firstName} {from?.lastName}</h2>
                                            <div className="flex mt-4 space-x-2">
                                                <div className='flex gap-1'>
                                                    <CustomButton
                                                        title='Accept'
                                                        onClick={() => acceptFriendRequest(_id, "Accepted")}
                                                        containerStyles='bg-[#0444a4] text-xs text-white py-2 px-2 rounded-full'
                                                    />
                                                    <CustomButton
                                                        title='Deny'
                                                        onClick={() => acceptFriendRequest(_id, "Denied")}
                                                        containerStyles='bg-[#ff0000] text-xs text-white px-1.5 py-1 rounded-full'
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                    <hr className='bg-[#211414] text-ascent-1 w-full mt-4' />

                    {/* Suggests */}
                    <span className='font-medium text-lg text-ascent-1'>People you may know</span>
                    <div className="flex flex-wrap gap-4 mt-4">
                        {suggestedFriends?.map((friendSuggested, index) => (
                            <div className='flex items-center justify-between mb-2' key={index}>
                                <div className='max-w-xs mx-auto bg-primary rounded-lg shadow-md overflow-hidden'>
                                    <Link to={"/profile/" + friendSuggested?._id} className='w-full gap-4 items-center cursor-pointer'>
                                        <img src={friendSuggested?.profileUrl ?? NoProfile} alt={friendSuggested?.firstName} className='w-full h-48 object-cover' />
                                        <div className="p-4">
                                            <h2 className="text-lg font-semibold text-ascent-1">{friendSuggested?.firstName} {friendSuggested?.lastName}</h2>
                                            <span className='text-sm text-ascent-2'>
                                                {friendSuggested?.profession ?? "No Profession"}
                                            </span>
                                        </div>
                                    </Link>
                                <div className='flex gap-1 items-center justify-center'>
                                    <button
                                        className='bg-[#0444a430] text-sm text-white p-1 rounded w-full'
                                        onClick={() => handleFriendRequest(friendSuggested?._id)}
                                        >
                                        <BsPersonFillAdd size={20} className='text-[#0f52b6]' />
                                    </button>
                                </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Friend
