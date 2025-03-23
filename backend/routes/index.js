import express from "express";
import authRoute from './authRoute.js'
import userRoute from './userRoute.js'
import postRoute from './postRoute.js'
import messageRoute from './messageRoute.js'
import notificationRoute from './notificationRoute.js'

const router = express.Router();

//auth
router.use(`/auth`, authRoute);

//message
router.use(`/message`, messageRoute);

//user
router.use(`/users`, userRoute)

//post
router.use(`/posts`, postRoute)

//notification
router.use(`/notification`, notificationRoute)


export default router;