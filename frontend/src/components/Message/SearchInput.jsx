import React, { useState } from 'react'
import { FaSearch } from "react-icons/fa";
import useConversation from '../../zustand/useConversation';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const SearchInput = () => {
    const {user} = useSelector((state) => state.user);
    const [search, setSearch] = useState("");
    const {setSelectedConversation} = useConversation();
    const friend = user?.friends ;

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!search) return;
        if(search.length < 3) {
            toast.error("Search term must be least 3 characters long")
        }
        const conversation = friend.find((c) =>(c.firstName.toLowerCase().includes(search.toLowerCase()) && c.lastName.toLowerCase().includes(search.toLowerCase())))

        if(conversation) {
            setSelectedConversation(conversation)
            setSearch("");
        } else toast.error("No such user found!")
    }
    return (
        <form onSubmit={handleSubmit} className='flex items-center gap-2 mt-4 px-2'>
            <input 
                type="text" 
                placeholder='Search...' 
                className='flex-1 rounded-full px-4 py-2 bg-bgColor'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <button type='submit' className='rounded-full bg-primary text-ascent-1 px-2 py-2'>
                <FaSearch size={24}/>
            </button>
        </form>
    )
}

export default SearchInput
