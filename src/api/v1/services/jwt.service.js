import jwt from 'jsonwebtoken';
import createError from 'http-errors';
// Models
import _RefreshToken from '../models/refreshToken.model.js';

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

                const refreshToken = {
                    userId: id.toString(),
                    token: token,
                    TTL: Date.now() + 365*24*60*60*1000
                }

                const rf = _RefreshToken.create(refreshToken);
                console.log(rf);
                
                resolve(token)
            })
        })
    }
};

export const refresh_token = async (payload) => {
    try {
        const id = payload.id;
        const accessToken = await signToken.signAccessToken(id);

        return {
            accessToken: accessToken
        }
    } catch (error) {
        console.log(error);
    }
};
