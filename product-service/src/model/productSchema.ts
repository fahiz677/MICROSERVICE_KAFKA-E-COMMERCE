import mongoose from "mongoose";
import { Schema } from "mongoose";

const ProductSchema = new Schema({
    name: String,
    description: String,
    price: Number,
    created_at: {
        type: Date,
        default: Date.now(),
    },
});

export const ProductModel = mongoose.model("product", ProductSchema);
