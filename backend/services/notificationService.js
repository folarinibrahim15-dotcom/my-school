import Notification from "../models/Notification.js";
import sendNotificationEmail from "../utils/sendNotificationEmail.js";
import User from "../models/User.js";
import sendSMS from "../utils/sendSMS.js";
// import sendPushNotification from "../utils/sendPushNotification.js";


/*
|--------------------------------------------------------------------------
| Create Single Notification
|--------------------------------------------------------------------------
*/
export const createNotificationService = async (data) => {

    const notification = await Notification.create(data);

    const recipient = await User.findById(notification.recipient);

    if (!recipient) {
        return notification;
    }

    /*
    |--------------------------------------------------------------------------
    | Email Notification
    |--------------------------------------------------------------------------
    */

    if (
        notification.channels?.email &&
        recipient.email
    ) {

        await sendNotificationEmail({

            to: recipient.email,

            subject: notification.title,

            title: notification.title,

            message: notification.message,

        });

    }

    /*
    |--------------------------------------------------------------------------
    | SMS Notification
    |--------------------------------------------------------------------------
    */

    if (
        notification.channels?.sms &&
        recipient.phoneNumber
    ) {

        await sendSMS({

            to: recipient.phoneNumber,

            message: notification.message,

        });

    }

    return notification;

};

/*
|--------------------------------------------------------------------------
| Get User Notifications
|--------------------------------------------------------------------------
*/

export const getUserNotificationsService = async () => {

    const notifications = await Notification.find();

    // console.log("====================================");
    // console.log("TOTAL NOTIFICATIONS:", notifications.length);
    // console.log(notifications);
    // console.log("====================================");

    return notifications;
};



/*
|--------------------------------------------------------------------------
| Get Single Notification
|--------------------------------------------------------------------------
*/






/*
|--------------------------------------------------------------------------
| Mark Notification As Read
|--------------------------------------------------------------------------
*/

export const markNotificationAsReadService = async (id)=>{


    const notification = await Notification.findById(id);


    if(!notification){

        return null;

    }


    notification.isRead = true;


    await notification.save();


    return notification;

};




/*
|--------------------------------------------------------------------------
| Delete Notification
|--------------------------------------------------------------------------
*/

export const deleteNotificationService = async(id)=>{


    const notification = await Notification.findById(id);


    if(!notification){

        return null;

    }


    await notification.deleteOne();


    return notification;

};

export const getSingleNotificationService = async (
    id,
    userId
) => {

    const notification = await Notification.findById(id)
        .populate("sender", "firstName lastName email")
        .populate("recipient", "firstName lastName email");

    return notification;

};

export const getUnreadNotificationCountService = async (userId) => {

    return await Notification.countDocuments({

        recipient: userId,

        isRead: false,

        isActive: true,

    });

};

export const markAllNotificationsAsReadService = async (userId) => {

    return await Notification.updateMany(

        {

            recipient: userId,

            isRead: false,

            isActive: true,

        },

        {

            $set: {

                isRead: true,

                readAt: new Date(),

            },

        }

    );

};

export const updateNotificationService = async (
    id,
    data
) => {

    return await Notification.findByIdAndUpdate(

        id,

        data,

        {
            new: true,
            runValidators: true,
        }

    );

};