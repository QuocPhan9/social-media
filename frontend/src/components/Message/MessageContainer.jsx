import React, { useEffect } from 'react'
import {Messages, MessageInput, NoChatSelected} from '../index.js'
import useConversation from '../../zustand/useConversation';
import { NoProfile } from '../../assets';



const MessageContainer = () => {
   
    const {selectedConversation, setSelectedConversation} = useConversation();

    useEffect(() => {
        return () => setSelectedConversation(null);
    },[setSelectedConversation])

    return (
        <div className='w-full flex flex-col mr-1'>
            {!selectedConversation ? (
                    <div className='flex justify-center mt-[20%]'>
                        <NoChatSelected/>
                    </div>

                )  : (
                    <>
                        <div className='mt-4 rounded-lg shadow-md bg-primary px-4 py-4 flex items-center gap-2'
                        >
                            <img className='rounded-full w-10 h-10' src={selectedConversation?.profileUrl ?? NoProfile} alt=""/>
                            <span className='text-ascent-1 text-lg font-bold'>{selectedConversation?.firstName} {selectedConversation?.lastName}</span>
                        </div>
                        <Messages/>
                        <MessageInput/>
                    </>
                )
            }
        </div>

    )
}

export default MessageContainer
