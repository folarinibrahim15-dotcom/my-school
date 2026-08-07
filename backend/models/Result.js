import mongoose from "mongoose";


const resultSchema = new mongoose.Schema(

    {

        student:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Student",
            required:true
        },


        class:{
            type:String,
            required:true
        },


        session:{
            type:String,
            required:true
        },


        term:{
            type:String,
            required:true,
            enum:[
                "First Term",
                "Second Term",
                "Third Term"
            ]
        },


        subject:{
            type:String,
            required:true
        },


        score:{
            type:Number,
            required:true,
            min:0,
            max:100
        },


        grade:{
            type:String,
            required:true
        },


        teacher:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },


        remark:{
            type:String,
            default:""
        }

    },

    {
        timestamps:true
    }

);



const Result = mongoose.model(
    "Result",
    resultSchema
);


export default Result;