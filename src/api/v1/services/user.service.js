import bcrypt from 'bcrypt';
// Models
import _User from '../models/user.model.js';
import _RefreshToken from '../models/refreshToken.model.js';
// Services
import { signToken } from './jwt.service.js';

export const userServices = {
    // Login user
    sign_in: async ({
        username, password
    }) => {
        try {
            const user = await _User.findOne({username});
            if (!user) {
                return {
                    code: 403,
                    message: "Wrong username or password"
                }
            }
            // check password
            const isValid = await bcrypt.compare(password, user.password);
            if (!isValid) {
                return {
                    code: 403,
                    message: "Wrong username or password"
                }
            }

            // get access token
            const accessToken = await signToken.signAccessToken(user.id);
            // get refresh token
            const refreshToken = await signToken.signRefreshToken(user.id);


            return {
                code: 200,
                elements: {
                    id: user.id,
                    name: user.name,
                    accessToken: accessToken,
                    refreshToken: refreshToken
                }
            }
        } catch (error) {
            console.log(error);
        }
    },

    // Register guest account
    sign_up_guest: async ({
        name, username, password, phone
    }) => {
        try {
            const salt = await bcrypt.genSalt(10);
            // hash password
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

    // Register admin account
    sign_up_admin: async ({
        name, username, password, phone
    }) => {
        try {
            const salt = await bcrypt.genSalt(10);
            // hash password
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
    },

    // update user
    update_user: async ({
        id, name, phone
    }) => {
        try {
            const user = await _User.updateOne({_id: id}, { $set: {
                name: name,
                phone: phone
            }});

            return {
                code: 201,
                elements: user,
                message: "User updated Successfully!"
            }
        } catch (error) {
            console.log(error);
        }
    },

    // delete user
    delete_user: async ({
        id
    }) => {
        try {
            const user = await _User.findOne({_id: id});
            if (!user) {
                return {
                    code: 401,
                    message: `User ${id} not exist in database!`
                }
            }

            await _User.deleteOne({_id: id});

            return {
                code: 201,
                message: `User ${user.username} deleted Successfully!`
            }
        } catch (error) {
            console.log(error);
        }
    },

    // Get information of user
    get_user: async ({
        id
    }) => {
        try {
            const user = await _User.findOne({_id: id});
            return {
                code: 201,
                elements: user
            }
        } catch (error) {
            console.log(error);
        }
    },

    // Change password
    change_password: async ({
        id, password
    }) => {
        try {
            const user = await _User.findOne({_id: id});
            // check password
            const isValid = await bcrypt.compare(password, user.password);
            if (isValid) {
                return {
                    code: 403,
                    message: "new and old password are similar"
                }
            }

            const salt = await bcrypt.genSalt(10);
            // hash password
            const hashPW = await bcrypt.hash(password, salt);

            const u = await _User.updateOne({_id: id}, { $set: {
                password: hashPW
            }});

            return {
                code: 201,
                message: "Password updated Successfully!"
            }
        } catch (error) {
            console.log(error);
        }
    },

    // Log out
    log_out: async ({ payload }) => {
        try {
            const id = payload.id;
    
            await _RefreshToken.deleteOne({userId: id});
            return {
                code: 201,
                message: `Logout Successfully!`
            }
        } catch (error) {
            console.log(error);
        }
    }
}
