// signup a new user

import asyncHandler from "../service/asyncHandler";
import CustomError from "../utils/CustomError";
import User from "../models/User";

export const cookieOptions = {
    expires: new Date(Date.now() + 1000*60*60*24*7),
    httpOnly: true
}






export const signUp = asyncHandler(async(req,res)=> {
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

export const login = asyncHandler(async(req,res)=> {
      
    const{email,password} = req.body

    if(!email || !password){
        throw new CustomError("all fields are required",400)
    }

    // check if user exists
    const user = await User.findOne({email}).select("+password")
    if(!user){
        throw new CustomError("user does not exists",400)
    }
    const isPasswordMatch = await User.comparePassword(password)
    if(isPasswordMatch){
        const token = user.generateToken()
        user.password = undefined
        res.cookie("token",token,cookieOptions)
        return res.status(200).json({
            success:true,
            token,
            user})

    }

    throw CustomError("password is incorrect",400)
})

export const logout = asyncHandler(async(req,res)=> {
    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true
    })
    res.status(200).json({
        success:true,

        message:"logged out"
    })


})

export const getProfile = asyncHandler(async(req,res)=> {
    const{user} = req
    if(!user){
        throw new CustomError("not logged in",401)
    }
    res.status(200).json({
        success:true,
        user
    })
       
    
})