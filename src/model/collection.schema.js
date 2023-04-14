import mongoose, { models } from "mongoose";


const CollectionSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: ["true","please provide a name"],
            trim: true,
            maxLength: [100,"name should not be more than 100 characters"]
             },
             

    },
    {timestamps: true}
    
    )

    export default mongoose.model("Collection",CollectionSchema)