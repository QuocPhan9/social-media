import React from 'react'
import {Sidebar, MessageContainer} from '../../components/index.js'
import Navbar from '../Navbar/Navbar'


const Message = () => {
    return (
        <>
            <Navbar/>
            <div className='flex w-full px-0 pb-14 bg-bgColor h-screen overflow-hidden fixed'>
                <Sidebar />
                <MessageContainer/>
            </div>
        </>
    )
}

export default Message
