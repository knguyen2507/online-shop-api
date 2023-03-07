import express from "express";
// Controllers
import { categoryControllers } from "../controllers/category.controller.js";
// Middlewares
import { authCategory } from "../middlewares/authCategory.js";

const router = express.Router();

router.get('/', categoryControllers.getAllCategory); // get all categories
router.post('/create-new-category', authCategory.checkCategoryAvaiable, categoryControllers.createNewCategory); // create new category
router.get('/:id', categoryControllers.getCategoryById); // get category by id
router.put('/:id', categoryControllers.updateCategory); // update category
router.delete('/:id', categoryControllers.deleteCategory); // delete category


export default router;