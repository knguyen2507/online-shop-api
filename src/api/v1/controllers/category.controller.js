// Services
import { categoryServices } from "../services/category.service.js";

export const categoryControllers = {
    getAllCategory: async (req, res) => {
        try {
            const { code, elements } = await categoryServices.get_all_category({});

            return res.status(code).json({code, elements});
        } catch (error) {
            console.log(error);
        }
    },

    createNewCategory: async (req, res) => {
        try {
            const { id, name } = req.body
            const { code, elements } = await categoryServices.create_new_category({id, name});

            return res.status(code).json({code, elements});
        } catch (error) {
            console.log(error);
        }
    },

    getCategoryById: async (req, res) => {
        try {
            const idCategory = req.params.id
            const { code, elements } = await categoryServices.get_category_by_id({idCategory});

            return res.status(code).json({code, elements});
        } catch (error) {
            console.log(error);
        }
    },

    updateCategory: async (req, res) => {
        try {
            const id = req.params.id;
            const { name } = req.body;
            const { code, elements, message } = await categoryServices.update_category({id, name});
            return res.status(code).json({code, elements, message});
        } catch (error) {
            console.log(error);
        }
    },

    deleteCategory: async (req, res) => {
        try {
            const idCategory = req.params.id;
            const { code, message } = await categoryServices.delete_category({idCategory});

            return res.status(code).json({code, message});
        } catch (error) {
            console.log(error);
        }
    }
}