import {
 createNotificationValidator
} from "../validators/notificationValidator.js";


export const validateNotification = (req,res,next)=>{


 const {error}=createNotificationValidator(req.body);


 if(error){

   return res.status(400).json({

     success:false,

     message:"Notification validation failed",

     errors:error.details.map(
       err=>err.message
     )

   });

 }


 next();

};