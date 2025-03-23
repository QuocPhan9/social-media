import React from 'react'
import Conversation from './Conversation';


import { useSelector } from 'react-redux';


const Conversations = () => {
    const {user} = useSelector((state) => state.user);
    return (
        <div className='flex-col overflow-auto px-4'>
            <Conversation friendUsers={user?.friends}/>
        </div>
    )
}

export default Conversations;
