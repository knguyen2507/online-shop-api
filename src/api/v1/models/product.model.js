import { Schema, model } from "mongoose";

const productSchema = new Schema({
    id: String,
    name: String,
    qty: Number,
    category: String,
    brand: String,
    price: Number,
    details: []
}, {
    collection: 'Products',
    timestamps: true
})

export default model('Products', productSchema);