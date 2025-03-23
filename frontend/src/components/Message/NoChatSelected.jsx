import React from 'react'
import { TiMessages } from "react-icons/ti";
import { useSelector } from 'react-redux';

const NoChatSelected = () => {
    const { user } = useSelector((state) => state.user);

    return (
        <div className='flex items-center justify-between h-full'>
            <div className='px-4 text-center sm:text-lg md:text-xl text-ascent-1 font-semibold flex flex-col items-center gap-2'>
                <p>Welcome to 👋 {user?.firstName} {user?.lastName}</p>
                <p>Select a chat start messaging</p>
                <TiMessages className='text-3xl md:text-6xl text-center'/>
            </div>
        </div>
    )
}

export default NoChatSelected
