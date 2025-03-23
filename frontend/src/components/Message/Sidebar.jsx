import React from 'react'
import SearchInput from './SearchInput'
import Conversations from './Conversations'

const Sidebar = () => {
    return (
        <div className='p-2 rounded-lg shadow-md text-sm flex flex-col gap-2 bg-primary mt-4 mx-4 mb-10'>
            <SearchInput/>
            <div className='divide px-3'></div>
            <Conversations />
        </div>
    )
}

export default Sidebar
