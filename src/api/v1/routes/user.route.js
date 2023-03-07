import express from "express";
// Controllers
import { userControllers } from "../controllers/user.controller.js";
// MiddleWares
import {authUser} from "../middlewares/authUser.js";
import { authToken, authPage } from "../middlewares/jwtAuth.js";

const router = express.Router();

router.post('/sign-in', authUser.checkSignIn, userControllers.signIn); // log in
router.post('/sign-up-guest', authUser.checkSignUp, userControllers.signUpGuest); // register guest account
router.post('/admin/sign-up', authUser.checkSignUp, [authToken.verifytoken, authPage(['admin'])], userControllers.signUpAdmin); // register admin account
router.put('/:id', authToken.verifytoken, userControllers.updateUser); // update information user
router.delete('/:id', [authToken.verifytoken, authPage(['admin'])], userControllers.deleteUser); // delete user
router.get('/:id', authToken.verifytoken, userControllers.getUserById); // view information user
router.put('/:id/change-password', authUser.checkChangePassword, authToken.verifytoken, userControllers.changePassword); // change password

export default router;