import React from 'react'
import { BsBriefcase, BsPersonFillAdd } from 'react-icons/bs'
import { CiLocationOn } from 'react-icons/ci'
import { LiaEditSolid } from 'react-icons/lia'
import moment from "moment";
import { UpdateProfile } from '../redux/redux/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { NoProfile } from '../assets';

const ProfileCard = ({user}) => {
    const {user:data} = useSelector((state) => state.user);
    const isCurrentUser = user?._id === data?._id;
    const dispatch = useDispatch();


    return (
        <div className='p-4 bg-primary rounded-lg shadow-md text-sm flex-col gap-4'>
            <span className='text-ascent-1 text-2xl font-semibold'>Intro</span>
            {/* User profile */}
            <div className="flex flex-col items-center justify-center mt-2">
                <img src={user.profileUrl ?? NoProfile} alt={user?.email} className='rounded-full w-28 h-28 ring-2 ring-blue object-center md:object-center' /> 
                <span className='text-ascent-2 mt-1'>{user?.bio ?? "Add Bio"}</span>

                {/* <div className="flex flex-col items-center gap-2 cursor-pointer rounded-full"></div> */}
                <h1 className="mt-4 mb-4 text-2xl font-medium text-ascent-1 ">{user?.firstName} {user?.lastName}</h1>
            </div>
            <hr className='border-b border-[#66666645] mt-2'/>
            
            <div className='w-full flex items-center justify-between pb-5 mt-4'>
                <div className=''>
                    {isCurrentUser ? (
                        <LiaEditSolid
                            size={22}   
                            className='text-blue cursor-pointer'
                            onClick={() => dispatch(UpdateProfile(true))}
                        />
                    ) : (
                        <>  
                            <div className='flex gap-1'>
                                <button
                                    className='bg-[#0444a430] text-sm text-white p-1 rounded'
                                    onClick={() => {}}
                                >
                                    <BsPersonFillAdd size={20} className='text-[#0f52b6]' />
                                </button>
                            </div>
                        </>
                    )}
                   
                </div>
            </div>

            <div className=' w-full flex flex-col gap-2 py-4'>
                <p className='text-xl text-ascent-1 font-semibold'>
                    {user?.friends.length} Friends
                </p>
                <div className='flex gap-2 text-ascent-2'>
                    <CiLocationOn className='text-xl text-ascent-1' />
                    <span>{user?.location ?? "Add Location"}</span>
                </div>

                <div className='flex gap-2 items-center text-ascent-2 mt-2'>
                    <BsBriefcase className=' text-lg text-ascent-1' />
                    <span>{user?.profession ?? "Add Profession"}</span>
                </div>

                <span className='text-base text-blue'>
                    {user?.verified ? "Verified Account" : "Not Verified"}
                </span>

                <div className='flex items-center justify-between'>
                    <span className='text-ascent-2'>Joined </span>
                    <span className='text-ascent-1 text-base'>
                        {moment(user?.createdAt).fromNow()}
                    </span>
                </div>
            </div>
            
        </div>
    )
}

export default ProfileCard
