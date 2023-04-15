import mongoose from 'mongoose';
import OrderStatus from '../utils/OrderStatus.js';
const orderSchema = new mongoose.Schema(
    {
       product : {
        type: [
           {
            productId:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            },count:{
                type: Number,
                default: 0
            },Price : Number
           }
        ],
        required: true
       },
       user:{
        type:mongoose.Schema.Types.ObjectId,
        ref :'User'
       },
       address:{
        type:String,
        required: true
       },
       phone:{
        type:String,
        required: true
       },
       amount:{
        type:Number,
        required: true
       },
       Coupon: String,
       TransactionId:String,
       OrderStatus: {
        type: String,
        default: OrderStatus.Pending,
        enum: Object.values(OrderStatus)
       }


},{timestamps:true}
)

export default mongoose.model('Order', orderSchema);