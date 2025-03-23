import React from 'react'
import { NoProfile } from '../../assets/index.js';
import useConversation from '../../zustand/useConversation.js'
import { useSocketContext } from '../../Context/SocketContext.jsx';


const Conversation = ({friendUsers}) => {
    const {selectedConversation, setSelectedConversation} = useConversation();
    const {onlineUsers} = useSocketContext();

    return (
        <>
            <div className='py-3'>
                    {friendUsers?.map((friend) => (
                        <div  
                            key={friend?._id} 
                            className={`cursor-pointer hover:bg-bgColor rounded p-2 py-1 my-4
                            ${selectedConversation?._id === friend._id ? "bg-bgColor" : ""}`}
                            onClick={() => setSelectedConversation(friend)}
                        >
                            <div className='relative flex items-center gap-2'>
                                <img className="w-10 h-10 rounded-full" src={friend?.profileUrl ?? NoProfile} alt={friend?.email} />
                                <span className={`top-0 left-7 absolute w-3.5 h-3.5 ${onlineUsers.includes(friend?._id) ? "bg-green" : ""} dark:border-bgColor rounded-full`}></span>
                                <div className='flex-col'>
                                    <p className='text-lg font-semibold text-ascent-1'>{friend?.firstName} {friend?.lastName}</p>
                                    <span className='text-ascent-2'>{onlineUsers.includes(friend?._id) ? "online" : "offline"}</span>
                                </div>
                            </div>
                        
                        </div>
                    ))}
            </div>
        </>
    )
}

export default Conversation
