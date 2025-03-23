import React, { useState } from 'react'
import { IoSend } from "react-icons/io5";
import useSendMessage from '../../hooks/useSendMessage.js';
import {Loading} from '../index.js'


const MessageInput = () => {
    const [message, setMessage] = useState("");
    const {loading, sendMessage} = useSendMessage()


    const handleMessages = async (e) => {
        e.preventDefault();
        if(!message) return;
        await sendMessage(message);
        setMessage("");
    }

    return (
        <form className='px-4 my-3' onSubmit={handleMessages}>
            <div className='w-full pb-8 relative'>
                <input 
                    type='text'
                    className='border text-sm rounded-lg block w-full p-2.5 bg-primary border-primary text-ascent-1'
                    placeholder='Send a message'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3 '>
                    {loading ? (<Loading/>) : (<IoSend className='text-ascent-1 mb-7'/>)}
                </button>
            </div>

        </form>
    )
}

export default MessageInput
