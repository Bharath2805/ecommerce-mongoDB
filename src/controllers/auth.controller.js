// signup a new user

import asyncHandler from "../service/asyncHandler";
import CustomError from "../utils/CustomError";
import User from "../models/User";

export const cookieOptions = {
    expires: new Date(Date.now() + 1000*60*60*24*7),
    httpOnly: true
}






export default signUp = asyncHandler(async(req,res)=> {
    // get data from user

const{name,mail,password} = req.body

// validation

if(!name || !mail || !password){
    throw new CustomError("all fields are required",400)
}

// add this to database

// check if user already exists

const userExists = await User.findOne({mail})

if (userExists){
    throw new CustomError("user already exists",400)
}

const user = await User.create({
    name,
    email,
    password
})
const token = user.generateToken()
password = undefined
res.cookie("token",token,cookieOptions)
res.status(200).json({
    success:true,
    token,
    user
})
})

