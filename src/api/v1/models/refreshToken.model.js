import { Schema, model } from "mongoose";

const refreshTokenSchema = new Schema({
    userId: {
        type: String, 
        ref: 'Users'
    },
    token: String,
    TTL: Number
}, {
    collection: 'RefreshTokens',
    timestamps: true
})

export default model('RefreshTokens', refreshTokenSchema);