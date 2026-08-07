import mongoose from "mongoose";


const notificationSchema = new mongoose.Schema(
{

    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },


    recipient:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },


    title:{
        type:String,
        required:true,
        trim:true,
        maxlength:100
    },


    message:{
        type:String,
        required:true,
        trim:true,
        maxlength:500
    },


    type:{
        type:String,
        enum:[
            "SYSTEM",
            "ACADEMIC",
            "FINANCE",
            "EVENT",
            "MESSAGE",
            "SECURITY"
        ],
        required:true
    },


    priority:{
        type:String,
        enum:[
            "LOW",
            "MEDIUM",
            "HIGH",
            "URGENT"
        ],
        default:"MEDIUM"
    },


    isRead:{
        type:Boolean,
        default:false
    },


    metadata:{
        type:Object,
        default:{}
    }

},
{
    timestamps:true
});


notificationSchema.index({
    recipient:1,
    createdAt:-1
});


notificationSchema.index({
    isRead:1
});


const Notification = mongoose.model(
    "Notification",
    notificationSchema
);


export default Notification;