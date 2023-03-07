import express from "express";
// Controllers
import { productControllers } from "../controllers/product.controller.js";
// Middlewares
import { authProduct } from "../middlewares/authProduct.js";

const router = express.Router();

router.get('/', productControllers.getAllProduct); // get all products
router.post('/create-new-product', authProduct.checkProductAvaiable, productControllers.createNewProduct); // create new product
router.get('/:id', productControllers.getProductById); // get product by id
router.put('/:id', productControllers.updateProduct); // update product
router.delete('/:id', productControllers.deleteProduct); // delete product


export default router;