import {

    createNotificationService,
    getUserNotificationsService,
    getSingleNotificationService,
    updateNotificationService,
    markNotificationAsReadService,
    deleteNotificationService,
    markAllNotificationsAsReadService,
    getUnreadNotificationCountService

} from "../services/notificationService.js";

export const createNotification = async(req,res)=>{
    try{

        const notification =
        await createNotificationService({

            ...req.body,

            sender:req.user._id

        });



        res.status(201).json({

            success:true,

            message:"Notification created successfully",

            notification

        });


    }catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};



export const getNotifications = async(req,res)=>{


    try{


        const notifications =
        await getUserNotificationsService(
            req.user._id
        );



        res.status(200).json({

            success:true,

            count:notifications.length,

            notifications

        });



    }catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};



export const getSingleNotification = async(req,res)=>{


    try{


        const notification =
        await getSingleNotificationService(
            req.params.id
        );



        if(!notification){

            return res.status(404).json({

                success:false,

                message:"Notification not found"

            });

        }



        res.status(200).json({

            success:true,

            notification

        });



    }catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};

export const updateNotification = async (req, res) => {

    try {

        const notification =
            await updateNotificationService(

                req.params.id,

                req.body

            );

        if (!notification) {

            return res.status(404).json({

                success: false,

                message: "Notification not found"

            });

        }

        res.status(200).json({

            success: true,

            message: "Notification updated successfully",

            notification

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


export const markNotificationAsRead = async(req,res)=>{


    try{


        const notification =
        await markNotificationAsReadService(
            req.params.id
        );



        if(!notification){

            return res.status(404).json({

                success:false,

                message:"Notification not found"

            });

        }



        res.status(200).json({

            success:true,

            message:"Notification marked as read",

            notification

        });



    }catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};


export const deleteNotification = async(req,res)=>{


    try{


        const notification =
        await deleteNotificationService(
            req.params.id
        );



        if(!notification){

            return res.status(404).json({

                success:false,

                message:"Notification not found"

            });

        }



        res.status(200).json({

            success:true,

            message:"Notification deleted successfully"

        });



    }catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};

export const markAllNotificationsAsRead = async (req, res) => {

    try {

        await markAllNotificationsAsReadService(req.user._id);

        res.status(200).json({

            success: true,

            message: "All notifications marked as read."

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

export const getUnreadNotificationCount = async (req, res) => {

    try {

        const count =
            await getUnreadNotificationCountService(
                req.user._id
            );

        res.status(200).json({

            success: true,

            count

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};