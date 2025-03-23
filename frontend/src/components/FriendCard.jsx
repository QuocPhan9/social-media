import React from 'react'
import { Link } from 'react-router-dom'
import { NoProfile } from '../assets'

const FriendCard = ({friends}) => {
    
    return (
        <div className='p-4 bg-primary rounded-lg shadow-md text-sm flex-col gap-4'>
            <div className='w-full flex flex-col gap-4 pt-4'>
                <div className='flex items-center justify-between'>
                    <p className='text-xl text-ascent-1 font-semibold'>
                        {friends?.length} Friends
                    </p>
                    <a href={"/friends/" + friends?._id} className='text-blue'>see all</a>
                </div>
                <hr className='border-b border-[#66666645]'/>
                {friends?.map((friend) => (
                    <Link
                        to={"/profile/" + friend?._id}
                        key={friend?._id}
                        className='w-full flex gap-4 items-center cursor-pointer'
                    >
                        <img src={friend?.profileUrl ?? NoProfile} alt={friend?.firstName} className='w-10 h-10 object-cover rounded-full' />

                        <div className='flex-1'>
                            <p className='text-base font-medium text-ascent-1'>{friend?.firstName} {friend?.lastName}</p>
                        </div>
                    </Link>
                ))}
            </div>
           
        </div>
        
    )
}

export default FriendCard
