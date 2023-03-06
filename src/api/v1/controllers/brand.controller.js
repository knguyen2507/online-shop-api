// Services
import { brandServices } from "../services/brand.service.js";

export const brandControllers = {
    getAllBrand: async (req, res) => {
        try {
            const { code, elements } = await brandServices.get_all_brand({});

            return res.status(code).json({code, elements});
        } catch (error) {
            console.log(error);
        }
    },

    createNewBrand: async (req, res) => {
        try {
            const { id, name } = req.body
            const { code, elements } = await brandServices.create_new_brand({id, name});

            return res.status(code).json({code, elements});
        } catch (error) {
            console.log(error);
        }
    },

    getBrandById: async (req, res) => {
        try {
            const idBrand = req.params.id
            const { code, elements } = await brandServices.get_brand_by_id({idBrand});

            return res.status(code).json({code, elements});
        } catch (error) {
            console.log(error);
        }
    },

    updateBrand: async (req, res) => {
        try {
            const id = req.params.id;
            const { name } = req.body;
            const { code, elements, message } = await brandServices.update_brand({id, name});
            return res.status(code).json({code, elements, message});
        } catch (error) {
            console.log(error);
        }
    },

    deleteBrand: async (req, res) => {
        try {
            const idBrand = req.params.id;
            const { code, message } = await brandServices.delete_brand({idBrand});

            return res.status(code).json({code, message});
        } catch (error) {
            console.log(error);
        }
    }
}