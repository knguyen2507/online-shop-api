import express from "express";
// Controllers
import { productControllers } from "../controllers/product.controller.js";
// Middlewares
import { authProduct } from "../middlewares/authProduct.js";

const router = express.Router();

router.get('/', productControllers.getAllProduct);
router.post('/create-new-product', authProduct.checkProductAvaiable, productControllers.createNewProduct);
router.get('/:id', productControllers.getProductById);
router.put('/:id', productControllers.updateProduct);
router.delete('/:id', productControllers.deleteProduct);


export default router;