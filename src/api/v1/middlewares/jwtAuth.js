import jwt from "jsonwebtoken";
import createError from 'http-errors';
// Models
import _User from '../models/user.model.js';
import _RefreshToken from '../models/refreshToken.model.js';

export const authToken = {
    // verify access token
    verifyAccessToken: async (req, res, next) => {
        try {
            // get authorization header
            const authHeader = req.headers["authorization"];

            if (!authHeader) {
                return next(createError.Forbidden('You need sign in!'));
            }

            // authHeader = 'bearer' + accessToken
            const accessToken = authHeader.split(' ')[1];

            if (!accessToken) {
                return next(createError.BadRequest('No token!'));
            }

            // verify access token
            jwt.verify(accessToken, process.env.SECRET_ACCESS_TOKEN, (err, decoded) => {
                if (err) {
                    if (err.name === 'JsonWebTokenError') {
                        return next(createError.Unauthorized());
                    }
                    return next(createError.Unauthorized(err.message));
                }
                req.user_id = decoded.id;
                next();
            });
        } catch (error) {
            next(error);
        }
    },

    verifyRefreshToken: async (req, res, next) => {
        try {
            const { refreshToken } = req.body;
            if(!refreshToken) return createError.BadRequest();

            const rf = await _RefreshToken.findOne({token: refreshToken});
            console.log(refreshToken);
            console.log(rf);
            if (!rf) {
                return next(createError.Forbidden('You need sign in!'));
            }
            // verify refresh token
            jwt.verify(refreshToken, process.env.SECRET_REFRESH_TOKEN, (err, decoded) => {
                if (err) {
                    if (err.name === 'JsonWebTokenError') {
                        return next(createError.Unauthorized());
                    }
                    return next(createError.Unauthorized(err.message));
                }
                if (refreshToken !== rf.token) {
                    return next(createError.Unauthorized('Your account does not have access!'));
                }
                if (rf.TTL < Date.now()) {
                    return next(createError.Unauthorized('Refresh Token has expired'));
                }
                req.payload = decoded;
                next();
            });
        } catch (error) {
            next(error);
        }
    }
};

// Role Based Authorization
export const authPage = permission => {
    return async (req, res, next) => {
        const user = await _User.findOne({_id: req.user_id});

        if (!user) {
            return next(createError.InternalServerError('Server Error!'));
        }

        // check role base
        if(!permission.includes(user.role)) {
            return next(createError.Unauthorized('Your account does not have access!'));
        }

        next();
    }
} 