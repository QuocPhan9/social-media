import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {BgImage, NoProfile} from '../../assets/index.js'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { SetTheme } from '../../redux/redux/themeSlice.js';
import { Logout } from '../../redux/redux/userSlice.js';
import {fetchPosts} from '../../utils/index.js';
import { FiBell, FiHome } from "react-icons/fi";
import { LiaFacebookMessenger, LiaUserFriendsSolid  } from "react-icons/lia";
import TextInput from '../../components/TextInput.jsx';
import CustomButton from '../../components/CustomButton.jsx';


const Navbar = () => {
    const {theme} = useSelector((state) => state.theme); 
    const {user} = useSelector((state) => state.user);
    //const [search, setSearch] = useState("");
    //const friend = user?.friends ;
    const dispatch = useDispatch();
    const {
        handleSubmit,
        register
    } = useForm();

    const handleTheme = () => {
        const themeValue = theme === "light" ? "dark" : "light";

        dispatch(SetTheme(themeValue));
    }

    const handleSearch = async (data) => {
        await fetchPosts(user.token, dispatch, "", data);
    }

    return (
        
        <nav className='navbar bg-primary shadow-lg rounded-b-4'>
            <div className='flex items-center justify-between md:py-2 px-4 mx-auto sm:px-6 lg:px-8'>
                <div className='flex items-center justify-center'>
                    <Link to='/' className='flex gap-2 items-center'>
                        <img src={BgImage} alt="" className="rounded-full w-14 h-14 object-cover mr-2"/>
                    </Link> 

                    <form 
                        className='hidden md:flex items-center justify-center' 
                        onSubmit={handleSubmit(handleSearch)}    
                    >
                       <TextInput
                            placeholder='Search...'
                            styles='rounded-l-full py-3'
                            register={register("search")}
                        />
                        <CustomButton
                            title='Search'
                            type='submit'
                            containerStyles='bg-[#0444a4] text-white px-6 py-2.5 mt-2 rounded-r-full'
                        />
                    </form>
                </div>

                <div className="flex-grow text-center justify-center items-center">
                    <div className="flex justify-center space-x-10 ">
                        <button className='bg-primary py-2 px-2 rounded-full hover:bg-bgColor'> 
                            <Link to="/" className="text-ascent-1 font-semibold"> 
                                <FiHome className='w-8 h-8'/>
                            </Link>
                        </button>

                        <button className='bg-primary py-2 px-2 rounded-full hover:bg-bgColor'>
                            <Link to={"/message"} className="text-ascent-1 font-semibold">
                                <LiaFacebookMessenger className='w-8 h-8'/>
                            </Link>
                        </button>

                        <button className='bg-primary py-2 px-2 rounded-full hover:bg-bgColor'>   
                            <Link
                                to="/friends" className="text-ascent-1 font-semibold">
                                <LiaUserFriendsSolid className='w-8 h-8'/>
                            </Link>
                        </button>  
                    </div>
                </div>

                <div className='flex items-center justify-center gap-3'>
                    <div className='flex gap-5 items-center text-ascent-1 text-md md:text-xl'>
                        <Link to={"/notifications"}>
                            <div className='hidden lg:flex relative'>
                                <button className='bg-primary py-2 px-2 rounded-full hover:bg-bgColor '>
                                        {/* <span className='top-1 left-19 absolute w-3.5 h-3.5 bg-red dark:border-bgColor rounded-full'></span> */}
                                        <FiBell className='w-8 h-8'/>
                                </button>
                            </div>
                        </Link>
                    </div>
                    <Menu as="div" className="relative inline-block text-left">
                        <div>
                            <MenuButton>
                                <img src={ user?.profileUrl ?? NoProfile} alt="" className='w-12 h-12 object-cover rounded-full border-b'/>
                            </MenuButton>
                        </div>

                        <MenuItems
                            transition
                            className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-primary shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                        >
                            <div className="py-1">
                                <MenuItems>
                                    <div className='p-2 m-2 bg-blue rounded-lg shadow-md text-sm flex-col gap-4'>
                                        <Link to="/profile" className='flex items-center gap-2 cursor-pointer rounded-lg p-2'>
                                            <img src={ user?.profileUrl ?? NoProfile} alt="" className='w-10 h-10 object-cover rounded-full border-b' />
                                            <span className='text-white'>{user?.firstName} {user?.lastName}</span>
                                        </Link>
                                    </div>
                                </MenuItems>
                                <div className='py-1'>
                                    <MenuItem >
                                        <p onClick={() => handleTheme()} className="flex px-4 py-2 text-sm text-ascent-1 data-[focus]:bg-bgColor data-[focus]:text-ascent-2 items-center justify-between cursor-pointer rounded-md p-2 m-2">
                                            Dark mode
                                        </p>
                                    </MenuItem>
                                    <MenuItem >
                                        <p onClick={() => dispatch(Logout())} className="flex px-4 py-2 text-sm text-ascent-1 data-[focus]:bg-bgColor data-[focus]:text-ascent-2 items-center justify-between cursor-pointer rounded-md p-2 m-2">
                                            Log out
                                        </p>
                                    </MenuItem>
                                </div>
                            </div>
                        </MenuItems>
                    </Menu>
                </div>
                
            </div>

            
        </nav>
    )
}

export default Navbar

