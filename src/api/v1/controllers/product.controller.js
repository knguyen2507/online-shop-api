// Services
import { productServices } from "../services/product.service.js";

export const productControllers = {
    getAllProduct: async (req, res) => {
        try {
            const { code, elements } = await productServices.get_all_product({});

            return res.status(code).json({code, elements});
        } catch (error) {
            console.log(error);
        }
    },

    createNewProduct: async (req, res) => {
        try {
            const { id, name, qty, category, brand, price, details } = req.body;
            const { code, elements } = await productServices.create_new_product({id, name, qty, category, brand, price, details});

            return res.status(code).json({code, elements});
        } catch (error) {
            console.log(error);
        }
    },

    getProductById: async (req, res) => {
        try {
            const idProduct = req.params.id;
            const { code, elements } = await productServices.get_product_by_id({idProduct});

            return res.status(code).json({code, elements});
        } catch (error) {
            console.log(error);
        }
    },

    updateProduct: async (req, res) => {
        try {
            const id = req.params.id;
            const { name, qty, category, brand, price, details } = req.body;
            const { code, elements, message } = await productServices.update_product({id, name, qty, category, brand, price, details});
            return res.status(code).json({code, elements, message});
        } catch (error) {
            console.log(error);
        }
    },

    deleteProduct: async (req, res) => {
        try {
            const idProduct = req.params.id;
            const { code, message } = await productServices.delete_product({idProduct});

            return res.status(code).json({code, message});
        } catch (error) {
            console.log(error);
        }
    }
}