import Conversation from '../models/ConversationModel.js'
import Message from '../models/MessageModel.js'
import { getReceiverSocketId, io } from '../socket/socket.js';
import { v2 as cloudinary } from 'cloudinary'

export const sendMessage = async (req,res) => {
    try {
        const {message} = req.body;
        const {id: receiverId} = req.params;
        const senderId = req.body.user.userId;
        
        console.log("Request Body:", req.body);

      
        let conversation = await Conversation.findOne({
            participants: {$all: [senderId, receiverId]},
        })

        if(!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            })
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        })

        if(newMessage) {
            conversation.messages.push(newMessage._id);
        }

        await Promise.all([conversation.save(), newMessage.save()]);

        const receiverSocket = getReceiverSocketId(receiverId);
        if(receiverSocket) {
            io.to(receiverSocket).emit("newMessage", newMessage);
        }

        res.status(201).json(newMessage);

    } catch (error) {
        console.error("Error in sendMessage controller: ", error.message);        
        res.status(500).json({error: "Internal server error"});
    }
}

export const getMessages = async (req, res) => {
    try {
        
        const {id: userToChatId} = req.params;
        const senderId = req.body.user.userId;
        
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] },
        }).populate("messages");

        res.status(200).json(conversation.messages);

    } catch (error) {
        console.error("Error in getMessages controller: ", error.message);        
        res.status(500).json({error: "Internal server error"});
    }
}