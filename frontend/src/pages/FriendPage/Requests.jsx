import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import { Link } from 'react-router-dom'
import { IoMdArrowRoundBack } from "react-icons/io";
import { NoProfile } from '../../assets';
import { CustomButton } from '../../components';
import { apiRequest } from '../../utils';
import { useSelector } from 'react-redux';

function Requests() {
    const { user } = useSelector((state) => state.user);
    const [friendRequest, setFriendRequest] = useState([]);

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
    }, [])

    return (
        <div className='w-full px-0 pb-14 bg-bgColor h-screen overflow-hidden'>
            <Navbar />
            <div className='w-full flex gap-2 lg:gap-4 h-full'>
                <div className='hidden w-1/3 lg:w-1/4 md:flex flex-col gap-6 overflow-y-auto'>
                    <div className='p-4 bg-primary shadow-md text-sm flex-col h-full gap-4'>

                        <div className='flex items-center gap-2'>
                            <Link to={"/friends"}>
                                <IoMdArrowRoundBack className='text-ascent-1' size={20} />
                            </Link>
                            <div className='flex-col flex'>
                                <span className='text-ascent-1'>Friends</span>
                                <span className='font-medium text-2xl text-ascent-1'>Friend requests</span>
                            </div>
                        </div>

                        <span className='font-medium text-lg text-ascent-1'>{friendRequest?.length} Friend requests</span>

                        <div className='px-1 py-1 flex items-center justify-center mt-4'>
                            <div className='w-full flex flex-col gap-4'>
                                {friendRequest?.map(({ _id, requestFrom: from }, index) => (
                                    <div key={index} className='flex items-center justify-between rounded-lg hover:bg-bgColor px-2 py-2'>
                                        <Link to={"/profile/" + from._id} className='flex  gap-4 items-center cursor-pointer'>
                                            <img src={from?.profileUrl ?? NoProfile} alt={from?.firstName} className='w-10 h-10 object-cover rounded-full' />

                                            <div className='flex-1 '>
                                                <p className='text-base font-medium text-ascent-1'>
                                                    {from?.firstName} {from?.lastName}
                                                </p>
                                                <span className='text-sm text-ascent-2'>
                                                    {from?.profession ?? "No Profession"}
                                                </span>
                                            </div>
                                        </Link>

                                        <div className='flex gap-1'>
                                            <CustomButton
                                                title='Accept'
                                                onClick={() => acceptFriendRequest(_id, "Accepted")}
                                                containerStyles='bg-[#0444a4] text-xs text-white px-1.5 py-1 rounded-full'
                                            />
                                            <CustomButton
                                                title='Deny'
                                                onClick={() => acceptFriendRequest(_id, "Denied")}
                                                containerStyles='bg-[#ff0000] text-xs text-white px-1.5 py-1 rounded-full'
                                            />
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

export default Requests