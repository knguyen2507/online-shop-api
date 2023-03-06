import { Schema, model } from "mongoose";

const categorySchema = new Schema({
    id: String,
    name: String
}, {
    collection: 'Categories',
    timestamps: true
})

export default model('Categories', categorySchema);