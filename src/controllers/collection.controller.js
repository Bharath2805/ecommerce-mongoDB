import Collection from '../models/collection.schema.js'
import asyncHandler from '../service/asyncHandler.js';
import CustomError from '../utils/customError.js';


export const getCollections = asyncHandler(async (req, res, next) => {
    const{name} = req.body;
    if(!name){
        throw new CustomError('collection not found', 400)
    }
    const collections = await collection.create({
        name
    })
    res.status(200).json({
        status:'success',
         collections
    })
})

export const updatedCollection = asyncHandler(async (req, res, next) => {
    const{name} = req.body;
    const{id:collectionId} = req.params;
    if(!name){
        throw new CustomError('collection not found', 400)
    }
    const updatedcollection = await collection.findByIdAndUpdate(collectionId, {name},{new:true,
    runValidators:true})
    if(!updatedcollection){
        throw new CustomError('collection not found', 400)
    }
    res.status(200).json({
        status:'success',
        updatedcollection
    })
})
