import mongoose from "mongoose";
import { Schema } from "mongoose";

const OrderSchema = new Schema({
  products: [
    {
      product_id: String,
    },
  ],
  user: String,
  total_price: Number,
  payment: {
    type: Boolean,
    default: false,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

export const OrderModel = mongoose.model("order", OrderSchema);
