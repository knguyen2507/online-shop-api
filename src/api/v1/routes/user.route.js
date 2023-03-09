import express from "express";
// Controllers
import { userControllers } from "../controllers/user.controller.js";
import { refreshToken } from "../controllers/jwt.controller.js";
// MiddleWares
import {authUser} from "../middlewares/authUser.js";
import { authToken, authPage } from "../middlewares/jwtAuth.js";

const router = express.Router();

router.post('/sign-in', authUser.checkSignIn, userControllers.signIn); // log in
router.post('/sign-up-guest', authUser.checkSignUp, userControllers.signUpGuest); // register guest account
router.post('/admin/sign-up', authUser.checkSignUp, [authToken.verifyAccessToken, authPage(['admin'])], userControllers.signUpAdmin); // register admin account
router.put('/:id', authToken.verifyAccessToken, userControllers.updateUser); // update information user
router.delete('/:id', [authToken.verifyAccessToken, authPage(['admin'])], userControllers.deleteUser); // delete user
router.get('/:id', authToken.verifyAccessToken, userControllers.getUserById); // view information user
router.put('/:id/change-password', authUser.checkChangePassword, authToken.verifyAccessToken, userControllers.changePassword); // change password
router.post('/refresh-token', authToken.verifyRefreshToken, refreshToken); // get access token from refresh token

export default router;