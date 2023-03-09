import express from "express";
// Controllers
import { productControllers } from "../controllers/product.controller.js";
// Middlewares
import { authProduct } from "../middlewares/authProduct.js";
import { authToken, authPage } from "../middlewares/jwtAuth.js";

const router = express.Router();

router.get('/', productControllers.getAllProduct); // get all products
router.post('/create-new-product', authProduct.checkProductAvaiable , [authToken.verifyAccessToken, authPage(['admin'])], productControllers.createNewProduct); // create new product
router.get('/:id', productControllers.getProductById); // get product by id
router.put('/:id', [authToken.verifyAccessToken, authPage(['admin'])], productControllers.updateProduct); // update product
router.delete('/:id', [authToken.verifyAccessToken, authPage(['admin'])], productControllers.deleteProduct); // delete product


export default router;