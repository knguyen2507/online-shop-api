import createError from 'http-errors';
// Models
import _User from '../models/user.model.js';

export const authUser = {
    // check log in
    checkSignIn: async (req, res, next) => {
        try {
            // check request input
            if (req.body.username === "" || req.body.password === "") {
                return next(createError.BadRequest('Bad Request. Please Fill all fields'));
            }

            const user = _User.findOne({username: req.body.username});

            // check username is avaiable
            if (!user) {
                return next(createError.Forbidden('Wrong username or password!'));
            }

            next();
        } catch (error) {
            next(error);
        }
    },

    // check register
    checkSignUp: async (req, res, next) => {
        try {
            // check request input
            if (req.body.name == "" || req.body.username == "" || req.body.phone == "" || req.body.password == "") {
                return next(createError.BadRequest('Bad Request. Please Fill all fields'));
            }

            const username = req.body.username;
            const phone = req.body.phone;
            const getUserByUsername = await _User.findOne({ username });
            const getUserByPhone = await _User.findOne({ phone });

            // check username avaiable
            if (getUserByUsername) {
                return next(createError.BadRequest('This username is used!'));
            }

            // check phone avaiable
            if (getUserByPhone) {
                return next(createError.BadRequest('This phone is used!'));
            }

            next();
        } catch (error) {
            next(error)
        }
    },

    // check change password
    checkChangePassword: async (req, res, next) => {
        try {
            // check request input
            if (req.body.password == "" || req.body.re_password == "") {
                return res.status(400).json({msg: 'Bad Request. Please Fill all fields'});
            }

            // check password and re-enter password
            if (req.body.password !== req.body.re_password) {
                res.status(400).send({message: "Incorrect password"});
                return;
            }

            next();
        } catch (error) {
            next(error);
        }
    }
}