import mongoose from 'mongoose';

const CouponSchema = new mongoose.Schema(
    {
      code:{
        type:String,
        required:true
      },
      discount:{
        type:Number,
        required:true
      }, 
      active:{
        type:Boolean,
        required:true
      }                               
    },{timestamps: true}
    )
    export default mongoose.model("Coupon",CouponSchema);