import express from "express";
// Controllers
import { brandControllers } from "../controllers/brand.controller.js";
// Middlewares
import { authBrand } from "../middlewares/authBrand.js";

const router = express.Router();

router.get('/', brandControllers.getAllBrand);
router.post('/create-new-brand', authBrand.checkBrandAvaiable, brandControllers.createNewBrand);
router.get('/:id', brandControllers.getBrandById);
router.put('/:id', brandControllers.updateBrand);
router.delete('/:id', brandControllers.deleteBrand);


export default router;