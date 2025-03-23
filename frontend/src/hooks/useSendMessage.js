import { useState } from 'react'
import useConversation from '../zustand/useConversation'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux';



const useSendMessage = () => {
    const { user } = useSelector((state) => state.user);
    const [loading, setLoading] = useState(false);
    const {messages, setMessages, selectedConversation} = useConversation();
    
    const sendMessage = async (message) => {
        setLoading(true);

        try {
            const res = await fetch(`https://social-media-server-eta-seven.vercel.app/message/send/${selectedConversation._id}`,{
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({message})
            })

            const data = await res.json()
            if(data.error) throw new Error(data.error)

            setMessages([...messages, data]);
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false);
        }
    }

    return {sendMessage, loading}
}

export default useSendMessage
