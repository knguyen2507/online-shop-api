import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
// Models
import _User from '../models/user.model.js';

export const userServices = {
    sign_in: async ({
        username, password
    }) => {
        try {
            const user = await _User.findOne({username});

            const isValid = await bcrypt.compare(password, user.password);

            if (!isValid) {
                return {
                    code: 403,
                    message: "Wrong username or password"
                }
            }

            const token = jwt.sign({id: user.id}, process.env.SECRET_ACCESS_TOKEN, {
                expiresIn: 3000
            })

            return {
                code: 200,
                elements: {
                    id: user.id,
                    name: user.name,
                    accessToken: token
                }
            }
        } catch (error) {
            console.log(error);
        }
    },

    sign_up_guest: async ({
        name, username, password, phone
    }) => {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashPW = await bcrypt.hash(password, salt);

            const newUser = {
                name: name,
                username: username,
                password: hashPW,
                phone: phone,
                role: "guest"
            }

            const user = await _User.create(newUser);
            console.log(user);

            return {
                code: 201,
                message: "Your account has been successfully created",
                elements: user
            }
        } catch (error) {
            console.log(error);
        }
    },

    sign_up_admin: async ({
        name, username, password, phone
    }) => {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashPW = await bcrypt.hash(password, salt);

            const newUser = {
                name: name,
                username: username,
                password: hashPW,
                phone: phone,
                role: "admin"
            }

            const user = await _User.create(newUser);

            return {
                code: 201,
                message: "Your account has been successfully created",
                elements: user
            }
        } catch (error) {
            console.log(error);
        }
    }
}
