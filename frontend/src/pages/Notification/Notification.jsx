import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import {useQuery, useMutation, useQueryClient} from  "@tanstack/react-query"
import toast from 'react-hot-toast';
import LoadingSpinner from '../../components/LoadingSpinner';
import { FaHeart } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const Notification = () => {
    const queryClient = useQueryClient();
    const {data:notifications, isLoading} = useQuery({
        queryKey: ["notifications"],
        queryFn: async () => {
            try {
                const res = await fetch("/notifications");
                const data = await res.json();
                if(!res.ok) throw new Error(data.error || "Something went wrong");
                return data;
            } catch (error) {
                throw new Error(error);
            }
        }
    })

    const {mutate: deleteNotifications} = useMutation({
        mutationFn: async () => {
            try {
                const res = await fetch("/notifications", {
                    method: "DELETE",
                });
                const data = await res.json();

                if(!res.ok) throw new Error(data.error || "Something went wrong");
                return data;
            } catch (error) {
                throw new Error(error);
            }
        },
        onSuccess: () => {
            toast.success("Notifications deleted successfully");
            queryClient.invalidateQueries({ queryKey: ["notifications"] });
        },
        onError: (error) => {
            toast.error(error.message);
        }
    })

    return (
        <div>
            <Navbar/>
            <div className='flex justify-center'>
                <div className='mt-4 w-1/2 p-2 rounded-lg shadow-md text-sm flex-row gap-2 bg-primary pb-2'>
                    <div className='w-full flex items-center justify-between'>
                        <span className='font-medium text-2xl text-ascent-1'>
                            Notifications
                        </span>
                        <div className="flex-row">
                            <Menu>
                                <MenuButton className="inline-flex items-center gap-2 rounded-md bg-primary py-1.5 px-3 text-sm/6 font-semibold text-ascent-1 focus:outline-none data-[hover]:bg-bgColor data-[open]:bg-bgColor data-[focus]:outline-1 data-[focus]:outline-white">
                                    <HiOutlineDotsHorizontal size={20} className='text-ascent-1'/>
                                </MenuButton>

                                <MenuItems
                                    transition
                                    anchor="bottom end"
                                    className="w-52 origin-top-right rounded-xl border border-bgColor bg-primary p-1 text-sm/6 text-ascent-1 transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
                                >
                                    <MenuItem>
                                        <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-bgColor" onClick={deleteNotifications}>
                                            Delete all notifications
                                        </button>
                                    </MenuItem>
                                </MenuItems>
                            </Menu>
                        </div>
                    </div>
                    {
                        isLoading &&  (
                            <div className='flex justify-center h-full items-center'>
                                <LoadingSpinner size='lg'/>
                            </div>
                        )
                    }
                    {
                        notifications?.length === 0 && <div className='text-center p-4 font-bold'>
                            No notifications 🤔
                        </div>
                    }
                    {
                        notifications?.map((notification) => (
                            <div className='border-b border-bgColor' key={notification._id}>
                                <div className='flex gap-2 p-4'>
                                    {notification.type === "like" && <FaHeart className='w-7 h-7 text-red' />}
                                <Link to={`/profile/${notification.from.firstName}`}>
                                        <div className='avatar'>
                                            <div className='w-8 rounded-full'>
                                                <img src={notification.from.profileUrl} alt='' />
                                                jghgjhkghjgjkhghjkghjkg
                                            </div>
                                        </div>
                                </Link>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Notification
