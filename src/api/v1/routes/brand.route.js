import express from "express";
// Controllers
import { brandControllers } from "../controllers/brand.controller.js";
// Middlewares
import { authBrand } from "../middlewares/authBrand.js";
import { authToken, authPage } from "../middlewares/jwtAuth.js";

const router = express.Router();

router.get('/', brandControllers.getAllBrand); // get all brands
router.post('/create-new-brand', authBrand.checkBrandAvaiable, [authToken.verifyAccessToken, authPage(['admin'])], brandControllers.createNewBrand); // create new brand
router.get('/:id', brandControllers.getBrandById); // get brand by id
router.put('/:id', [authToken.verifyAccessToken, authPage(['admin'])], brandControllers.updateBrand); // update brand
router.delete('/:id', [authToken.verifyAccessToken, authPage(['admin'])], brandControllers.deleteBrand); // delete brand


export default router;