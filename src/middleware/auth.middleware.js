import  jwt from "jsonwebtoken";
import User from "../models/user.schema.js";
import config from "../config/config.js";
import asyncHandler from "asyncHandler.js";
import CustomError from "../utils/customError.js";


export const isLoggedIn = asyncHandler(async (req, res, next) => {
    let token;
    if (req.cookies.token|| (req.headers.authorization && req.headers.authorization.startsWith('Bearer '))) {
        token = req.cookies.token || req.headers.authorization.split(' ')[1];
}
    if(!token){
        throw new CustomError("Not logged in", 401)
    }

    try {
        const decodedjwtPayload = jwt.verify(token,config.JWT_SECRET)
        req.user = await User.findById(decodedjwtPayload._id, "name email role")
        next()
        
    } catch (error) {
        
        throw new CustomError("Not logged in", 401)
    }
})

export const authorization = (...roles) => asyncHandler(async (req, res, next) => {
    if(!roles.includes(req.user.role)){
        throw new CustomError("Not authorized", 403)
    }
    next()
})

