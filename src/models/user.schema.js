import mongoose from "mongoose";
import AuthRole from  "../utils/AuthRole.js";
import bcrypt from "bcryptjs";
import config from "../config/index.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";

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
    },{timestamps:true})
    // encrypt the password before saving
    User.pre("save", async function(next){
        if(!this.isModified("password")){
            this.password = await bcrypt.hash(this.password,10);
            next();
            }})
    User.methods = {
        comparePassword : async function(password){
            return await bcrypt.compare(password,this.password)
        },
        // generate token
        generateToken: function(){
            jwt.sign({id:this._id},config.JWT_SECRET,{expiresIn:config.JWT_EXPIRY})
    },
    // generate forgotPasswordToken
    generateForgotPasswordToken: function(){
        const forgotToken = crypto.randomBytes(20).toString("hex");

        this.forgotPasswordToken = crypto
        .createHash("sha256")
        .update(forgotToken)
        .digest("hex");

        //time for token to expire time
        this.forgotPasswordTokenExpiry = Date.now() + 20 * 60 * 1000    ;

        return forgotToken;


    }
}

export default mongoose.model("User",User);