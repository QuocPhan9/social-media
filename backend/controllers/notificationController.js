import Notification from "../models/notificationModel.js";

export const getNotifications = async (req, res) => {
    try {
        const {userId} = req.body.user;

        const notifications = await Notification.find({to: userId}).populate({
            "path" : "from",
            select: "firstName lastName profileUrl"
        });

        await Notification.updateMany({to: userId}, {read: true});

        res.status(200).json(notifications);
    } catch (error) {
        console.error("Error in get notifications function", error.message);
        res.status(500).json({error: "Internal Server Error"});
    }
}

export const deleteNotifications = async (req, res) => {
    try {
        const {userId} = req.body.user;

        await Notification.deleteMany({to: userId}, {read: true});

        res.status(200).json({message: "Notifications deleted successfully"});
    } catch (error) {
        console.error("Error in delete notifications function", error.message);
        res.status(500).json({error: "Internal Server Error"});
    }
}

export const deleteNotification = async (req, res) => {
    try {
        const notificationId = req.param.id;
        const {userId} = req.body.user;
        const notification = await Notification.findById(notificationId); 

        if(!notification) {
            return res.status(404).json({error: "Notification Not Found"});
        }

        if(notification.to.toString() !== userId.toString()) {
            return res.status(403).json({error: "You're not allowed to delete this notification"})
        }

        await Notification.findByIdAndDelete(notificationId);
        res.status(200).json({message: "Notification deleted successfully"});

    } catch (error) {
        console.error("Error in delete notification function", error.message);
        res.status(500).json({error: "Internal Server Error"})
    }
} 