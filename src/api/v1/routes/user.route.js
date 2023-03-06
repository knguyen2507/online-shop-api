import express from "express";
// Controllers
import { userControllers } from "../controllers/user.controller.js";
// MiddleWares
import {authUser} from "../middlewares/authUser.js";
import { authToken, authPage } from "../middlewares/jwtAuth.js";

const router = express.Router();

router.post('/sign-in', authUser.checkSignIn, userControllers.signIn);
router.post('/sign-up-guest', authUser.checkSignUp, userControllers.signUpGuest);
router.post('/admin/sign-up', authUser.checkSignUp, [authToken.verifytoken, authPage(['admin'])], userControllers.signUpAdmin);

export default router;