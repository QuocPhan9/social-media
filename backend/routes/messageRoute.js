import express from 'express';
import {getMessages, sendMessage} from '../controllers/sendMessageController.js';
import userAuth from '../middleware/authMiddleware.js';


const router = express.Router();

router.post('/send/:id', userAuth,sendMessage)

router.get('/:id', userAuth,getMessages)

export default router;