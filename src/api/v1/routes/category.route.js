import express from "express";
// Controllers
import { categoryControllers } from "../controllers/category.controller.js";
// Middlewares
import { authCategory } from "../middlewares/authCategory.js";

const router = express.Router();

router.get('/', categoryControllers.getAllCategory);
router.post('/create-new-category', authCategory.checkCategoryAvaiable, categoryControllers.createNewCategory);
router.get('/:id', categoryControllers.getCategoryById);
router.put('/:id', categoryControllers.updateCategory);
router.delete('/:id', categoryControllers.deleteCategory);


export default router;