import mongoose from "mongoose";
import { Schema } from "mongoose";

const OrderSchema = new Schema({
  products:String,
  total_price: Number,
  payment: Boolean,
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

export const OrderModel = mongoose.model("order", OrderSchema);
