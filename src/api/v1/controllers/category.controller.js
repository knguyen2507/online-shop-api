// Services
import { categoryServices } from "../services/category.service.js";

export const categoryControllers = {
    // get all categories
    getAllCategory: async (req, res) => {
        try {
            const { code, elements } = await categoryServices.get_all_category({});

            return res.status(code).json({code, elements});
        } catch (error) {
            next(error);
        }
    },

    // create new category
    createNewCategory: async (req, res) => {
        try {
            const { id, name } = req.body
            const { code, elements } = await categoryServices.create_new_category({id, name});

            return res.status(code).json({code, elements});
        } catch (error) {
            next(error);
        }
    },

    // get category by id
    getCategoryById: async (req, res) => {
        try {
            const idCategory = req.params.id
            const { code, elements } = await categoryServices.get_category_by_id({idCategory});

            return res.status(code).json({code, elements});
        } catch (error) {
            next(error);
        }
    },

    // update category
    updateCategory: async (req, res) => {
        try {
            const id = req.params.id;
            const { name } = req.body;
            const { code, elements, message } = await categoryServices.update_category({id, name});
            return res.status(code).json({code, elements, message});
        } catch (error) {
            next(error);
        }
    },

    // delete category
    deleteCategory: async (req, res) => {
        try {
            const idCategory = req.params.id;
            const { code, message } = await categoryServices.delete_category({idCategory});

            return res.status(code).json({code, message});
        } catch (error) {
            next(error);
        }
    }
}