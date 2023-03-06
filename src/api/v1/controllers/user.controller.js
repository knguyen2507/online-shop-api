import { userServices } from "../services/user.service.js";

export const userControllers = {
    signIn: async (req, res, next) => {
        try {
            const { username, password } = req.body;
            const { code, message, elements } = await userServices.sign_in({username, password});

            return res.status(code).json({
                code, message, elements
            })
        } catch (error) {
            console.log(error);
            next(error);
        }
    },

    signUpGuest: async (req, res, next) => {
        try {
            const { name, username, password, phone } = req.body;
            const { code, message, elements } = await userServices.sign_up_guest({name, username, password, phone});

            return res.status(code).json({
                code, message, elements
            })
        } catch (error) {
            console.log(error);
            next(error);
        }
    },

    signUpAdmin: async (req, res, next) => {
        try {
            const { name, username, password, phone } = req.body;
            const { code, message, elements } = await userServices.sign_up_admin({name, username, password, phone});

            return res.status(code).json({
                code, message, elements
            })
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}