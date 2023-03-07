import { Schema, model } from "mongoose";
import mongoose from 'mongoose';

const brandSchema = new Schema({
    id: String,
    name: String
}, {
    collection: 'Brands',
    timestamps: true
});

export default model('Brands', brandSchema);