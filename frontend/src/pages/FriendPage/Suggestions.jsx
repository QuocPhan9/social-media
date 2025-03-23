import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import { Link } from 'react-router-dom'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { BsPersonFillAdd } from 'react-icons/bs'
import { NoProfile } from '../../assets'
import { apiRequest, sendFriendRequest } from '../../utils'
import { useSelector } from 'react-redux'

const Suggestions = () => {
    const {user} = useSelector((state) => state.user);
    const [suggestedFriends, setSuggestedFriends] = useState([]);

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

    useEffect(() => {
        fetchFriendSuggests();
    }, [])

    return (
        <div className='w-full px-0 bg-bgColor h-screen overflow-hidden'> 
            <Navbar/>
            <div className='w-full flex gap-2 lg:gap-4 h-full'>
                <div className='hidden w-1/3 lg:w-1/4 md:flex flex-col gap-6 overflow-y-auto'>
                    <div className='p-4 bg-primary shadow-md text-sm flex-col gap-4'>

                        <div className='flex items-center gap-2'>
                            <Link to={"/friends"}>
                                <IoMdArrowRoundBack className='text-ascent-1' size={20} />
                            </Link>
                            <div className='flex-col flex'>
                                <span className='text-ascent-1'>Friends</span>
                                <span className='font-medium text-2xl text-ascent-1'>Suggestions</span>
                            </div>
                        </div>

                        <div className='px-1 py-1 flex items-center justify-center mt-4'>
                            <div className='w-full flex flex-col gap-4'>
                                {suggestedFriends?.map((friendSuggested, index) => (
                                    <div className='flex items-center justify-between rounded-lg hover:bg-bgColor px-2 py-2' key={index}>
                                        <Link to={"/profile/" + friendSuggested?._id} className='w-full flex gap-4 items-center cursor-pointer'>
                                            <img src={friendSuggested?.profileUrl ?? NoProfile} alt={friendSuggested?.firstName} className='w-10 h-10 object-cover rounded-full' />
                                            
                                            <div className='flex-1'>
                                                <p className='text-base font-medium text-ascent-1'>
                                                    {friendSuggested?.firstName} {friendSuggested?.lastName}
                                                </p>
                                                <span className='text-sm text-ascent-2'>
                                                    {friendSuggested?.profession ?? "No Profession"}
                                                </span>
                                            </div>
                                        </Link>

                                        <div className='flex gap-1'>
                                            <button
                                                className='bg-[#0444a430] text-sm text-white p-1 rounded'
                                                onClick={() => handleFriendRequest(friendSuggested?._id)}
                                            >
                                                <BsPersonFillAdd size={20} className='text-[#0f52b6]' />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                {/* RIGHT */}
                <div>

                </div>
            </div>
        </div>
    )
}

export default Suggestions
