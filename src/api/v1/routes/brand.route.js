import express from "express";
// Controllers
import { brandControllers } from "../controllers/brand.controller.js";
// Middlewares
import { authBrand } from "../middlewares/authBrand.js";

const router = express.Router();

router.get('/', brandControllers.getAllBrand); // get all brands
router.post('/create-new-brand', authBrand.checkBrandAvaiable, brandControllers.createNewBrand); // create new brand
router.get('/:id', brandControllers.getBrandById); // get brand by id
router.put('/:id', brandControllers.updateBrand); // update brand
router.delete('/:id', brandControllers.deleteBrand); // delete brand


export default router;