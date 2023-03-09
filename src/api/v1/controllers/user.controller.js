// Services
import { userServices } from "../services/user.service.js";

export const userControllers = {
    // Login user
    signIn: async (req, res, next) => {
        try {
            const { username, password } = req.body;
            const { code, message, elements } = await userServices.sign_in({username, password});

            return res.status(code).json({
                code, message, elements
            })
        } catch (error) {
            next(error);
        }
    },

    // Register guest account
    signUpGuest: async (req, res, next) => {
        try {
            const { name, username, password, phone } = req.body;
            const { code, message, elements } = await userServices.sign_up_guest({name, username, password, phone});

            return res.status(code).json({
                code, message, elements
            })
        } catch (error) {
            next(error);
        }
    },

    // Register admin account
    signUpAdmin: async (req, res, next) => {
        try {
            const { name, username, password, phone } = req.body;
            const { code, message, elements } = await userServices.sign_up_admin({name, username, password, phone});

            return res.status(code).json({
                code, message, elements
            })
        } catch (error) {
            next(error);
        }
    },

    // Update user
    updateUser: async (req, res, next) => {
        try {
            const id = req.params.id;
            const { name, phone } = req.body;
            const { code, message, elements } = await userServices.update_user({id, name, phone});

            return res.status(code).json({
                code, message, elements
            })
        } catch (error) {
            next(error);
        }
    },

    // Delete user
    deleteUser: async (req, res, next) => {
        try {
            const id = req.params.id;
            const { code, message } = await userServices.delete_user({id});

            return res.status(code).json({
                code, message
            })
        } catch (error) {
            next(error);
        }
    },

    // Get information of user
    getUserById: async (req, res, next) => {
        try {
            const id = req.user_id;
            const { code, elements } = await userServices.get_user({id});

            return res.status(code).json({
                code, elements
            })
        } catch (error) {
            next(error);
        }
    },

    // Change password
    changePassword: async (req, res, next) => {
        try {
            const id = req.params.id;
            const password = req.body.password;
            const { code, message } = await userServices.change_password({id, password});

            return res.status(code).json({
                code, message
            })
        } catch (error) {
            next(error);
        }
    }
}