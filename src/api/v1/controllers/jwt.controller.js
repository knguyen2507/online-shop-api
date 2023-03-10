import createError from "http-errors";
// Services
import { refresh_token } from "../services/jwt.service.js";

export const refreshToken = async (req, res, next) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) return createError.BadRequest();

        const payload = req.payload;
        const { accessToken } = await refresh_token(payload);
        return res.json({ 
            accessToken
         });
    } catch (error) {
        next(error);
    }
}