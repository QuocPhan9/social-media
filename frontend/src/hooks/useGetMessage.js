import { useEffect, useState } from 'react'
import useConversation from '../zustand/useConversation'
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

const useGetMessage = () => {
    const { user } = useSelector((state) => state.user);
    const [loading, setLoading] = useState(false);
    const {messages, setMessages, selectedConversation} = useConversation();

    useEffect(() => {
        const getMessages = async () => {
            setLoading(true);

            try {
                const res = await fetch(`https://social-media-server-eta-seven.vercel.app/message/${selectedConversation._id}`,{
                    method:"GET",
                    headers: {
                        'Content-Type' : 'application/json',
                        'Authorization': `Bearer ${user.token}`
                    }
                });
                const data = await res.json();
                if(data.error) throw new Error(data.error);
                setMessages(data);

            } catch (error) {
                toast.error(error.messages);
            } finally {
                setLoading(false);
            }
        }
        if(selectedConversation?._id) getMessages();
    },[selectedConversation?._id, setMessages])

    return {messages, loading};
}

export default useGetMessage
