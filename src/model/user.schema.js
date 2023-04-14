import mongoose from "mongoose";

const User = new mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,"name is required"],
            minLength:[3,"name must be at least 3 characters"],
            maxLength:[50,"name must be less than 50 characters"],
            trim:true
        },
    
        email : {
        type:String,
        required:[true,"email is required"],
        unique:true,
        trim:true
        },

        password:{
            type:String,
            required:[true,"password is required"],
            minLength:[6,"password must be at least 6 characters"],
            maxLength:[50,"password must be less than 50 characters"],
            trim:true
            },

        role:{
            type:String,
            enum:Object.values(AuthRole),
            default:AuthRole.USER

        },
        forgotPasswordToken : String,
        forgotPasswordTokenExpiry : Date
    }
        
        )
        export default mongoose.model("User",User);