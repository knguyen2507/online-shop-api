// Models
import _Brand from '../models/brand.model.js';

export const brandServices = {
    // get all brand
    get_all_brand: async () => {
        try {
            const brand = await _Brand.find({});
            
            return {
                code: 200,
                elements: brand
            }
        } catch (error) {
            console.log(error)
        }
    },

    // create new brand
    create_new_brand: async ({
        id, name
    }) => {
        try {
            const newBrand = {
                id: id,
                name: name
            };
    
            const brand = await _Brand.create(newBrand);
            
            return {
                code: 201,
                elements: brand
            }
        } catch (error) {
            console.log(error);
        }
    },

    // get brand by id
    get_brand_by_id: async ({ idBrand }) => {
        try {
            const brand = await _Brand.find({id: idBrand});
            
            return {
                code: 200,
                elements: brand
            }
        } catch (error) {
            console.log(error);
        }
    },

    // update brand
    update_brand: async ({
        id, name
    }) => {
        try {
            const brand = await _Brand.updateOne({id: id}, {$set: {name: name}});

            return {
                code: 201,
                elements: brand,
                message: "Brand updated Successfully!"
            }

        } catch (error) {
            console.log(error);
        }
    },

    // delete brand
    delete_brand: async ({ 
        idBrand 
    }) => {
        try {
            const brand = await _Brand.findOne({id: idBrand});

            if (!brand) {
                return {
                    code: 401,
                    message: "Brand not exist in database!"
                }
            }

            await _Brand.deleteOne({id: idBrand});

            return {
                code: 201,
                message: `Brand deleted Successfully!`
            }
        } catch (error) {
            console.log(error);
        }
    }
}