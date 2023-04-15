import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,"please enter product name"],
        trim : true
},
    price:{
        type: Number,
        required: [true,"please enter product price"],
        trim : true
    },
    description:{
        type:String,
        required: [true,"please enter product description"],
        trim : true
    },
    photos : [
        {
            secure_url:{
                type:String,
                required: [true,"please enter product image url"],
                trim : true
            }
        }
    ],stock:{
        type:Number,
        required: [true,"please enter product stock"],
        trim : true
    },
    sold:{
        type:Number,
        required: [true,"please enter product sold"],
        trim : true
    },
    collectionId:{
        ref :"Collection",
        type:mongoose.Schema.Types.ObjectId

    }


},{timestamps:true}
)

export default mongoose.model("Product",productSchema);