import React from 'react'
import { NoProfile } from '../../assets/index.js';
import useConversation from '../../zustand/useConversation.js';
import {extractTime} from "../../utils/extractTime.js";
import { useSelector } from 'react-redux';


const Message = ({message}) => {
    const {user} = useSelector((state) => state.user);
    const {selectedConversation} = useConversation();
    const fromMe = message.senderId === user._id;
    const formattedTime = extractTime(message.createdAt);

    return (
        <div>
            <div className="">
                {fromMe ? (
                    <>
                        <div className="flex items-end justify-end  mb-4 mt-4">
                            <div className="flex items-end justify-end mb-4">
                                <div className="text-right">
                                    <div className={`bg-blue text-white p-2 rounded-lg shadow-md`}>{message.message}</div>
                                    <div className="text-xs text-ascent-2 mt-1">{formattedTime}</div>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div  className='flex items-start mb-4 mt-4'>
                            <div className="rounded-full overflow-hidden mr-3">
                                <img alt="Avatar" src={selectedConversation?.profileUrl ?? NoProfile}  className='w-10 h-10 '/>
                            </div>
                            <div>
                                <div className="flex items-center mb-1">
                                    <span className="font-semibold mr-2 text-ascent-1">{selectedConversation?.firstName} {selectedConversation?.lastName}</span>
                                    <span className="text-xs text-ascent-1">{formattedTime}</span>
                                </div>
                                <div className={`bg-primary text-ascent-1 p-2 rounded-lg shadow-md`}>{message.message}</div>
                            </div>
                        </div>
                    </>
                )}
               
            </div>
           
        </div>
    )
}

export default Message;
