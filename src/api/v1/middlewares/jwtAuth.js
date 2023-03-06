import jwt from "jsonwebtoken";
import _User from '../models/user.model.js';

export const authToken = {
    verifytoken: async (req, res, next) => {
        try {
            const authHeader = req.headers["authorization"];

            if (!authHeader) {
                res.status(403).send({message: "You need sign in"});
                return;
            }

            const token = authHeader.split(' ')[1];

            if (!token) {
                res.status(403).send({message: "no token"});
                return;
            }

            jwt.verify(token, process.env.SECRET_ACCESS_TOKEN, (err, decoded) => {
                if (err) {
                    return res.status(401).send({message: "Don't have access"});
                }
                req.user_id = decoded.id;
                next();
            });
        } catch (error) {
            console.log(error)
        }
    }
};

// Role Based Authorization
export const authPage = permission => {
    return async (req, res, next) => {
        const user = await _User.findOne({_id: req.user_id});

        if (!user) {
            res.status(500).send({message: "Server Error"});
            return;
        }

        if(!permission.includes(user.role)) {
            return res.status(401).send({message: "Your account does not have access!"});
        }

        next();
    }
} 