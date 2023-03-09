import jwt from 'jsonwebtoken';
import createError from 'http-errors';
// Services
import { redisServices } from './redis.service.js';

// create access token
export const signToken = {
    signAccessToken: async (id) => {
        return new Promise ((resolve, reject) => {
            const payload = {
                id
            }
            const secret = process.env.SECRET_ACCESS_TOKEN;
            const options = {
                expiresIn: '30s'
            }

            jwt.sign(payload, secret, options, (err, token) => {
                if (err) reject(err)
                resolve(token)
            })
        })
    },

    signRefreshToken: async (id) => {
        return new Promise ((resolve, reject) => {
            const payload = {
                id
            }
            const secret = process.env.SECRET_REFRESH_TOKEN;
            const options = {
                expiresIn: '1y'
            }

            jwt.sign(payload, secret, options, (err, token) => {
                if (err) reject(err)
                resolve(token)
            })
        })
    }
};

export const refresh_token = async (payload) => {
    try {
        const id = payload.id;
        const accessToken = await signToken.signAccessToken(id);
        const refToken = await signToken.signRefreshToken(id);

        return {
            accessToken,
            refToken
        }
    } catch (error) {
        console.log(error);
    }
}