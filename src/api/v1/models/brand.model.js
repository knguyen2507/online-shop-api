import { Schema, model } from "mongoose";
import mongoose from 'mongoose';

const brandSchema = new Schema({
    id: String,
    name: String
}, {
    collection: 'Brands',
    timestamps: true
});

const data = [
    { "id": "samsung", "name": "Samsung" },
    { "id": "toshiba","name": "Toshiba" },
    { "id": "sony","name": "Sony" },
    { "id": "mutosi","name": "Mutosi" },
    { "id": "aqua","name": "Aqua" },
    { "id": "sunhouse","name": "Sunhouse" },
    { "id": "duy-tan","name": "Duy Tân" },
    { "id": "other","name": "Others" }
];

const db = mongoose.connection;

const [err, count] = await model('Brands', brandSchema).estimatedDocumentCount().then(
    count => ([null, count]),
    err => ([err, null])
);

if (!err && count === 0) {
    db.collection('Brands').insertMany(data, (e) => {
        if (err) {
            console.log(err);
        } else {
            console.log("add Roles database to collection");
        }
    });
}

export default model('Brands', brandSchema);