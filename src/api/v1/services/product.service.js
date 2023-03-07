// Models
import _Product from '../models/product.model.js';

export const productServices = {
    // get all products
    get_all_product: async () => {
        try {
            const product = await _Product.find({});
            
            return {
                code: 200,
                elements: product
            }
        } catch (error) {
            console.log(error);
        }
    },
    
    // create new product
    create_new_product: async ({
        id, name, qty, category, brand, price, details
    }) => {
        try {
            const newProduct = {
                id: id, 
                name: name, 
                qty: qty, 
                category: category, 
                brand: brand, 
                price: price, 
                details: details
            };

            const product = await _Product.create(newProduct);

            return {
                code: 201,
                elements: product
            }
        } catch (error) {
            console.log(error)
        }
    },

    // get product by id
    get_product_by_id: async ({
        idProduct
    }) => {
        try {
            const product = await _Product.find({id: idProduct});
            
            return {
                code: 200,
                elements: product
            }
        } catch (error) {
            console.log(error);
        }
    },

    // update product
    update_product: async ({
        id, name, qty, category, brand, price, details
    }) => {
        try {
            const p = {
                id: id, 
                name: name, 
                qty: qty, 
                category: category, 
                brand: brand, 
                price: price, 
                details: details
            };

            const product = await _Product.updateOne({id: id}, {$set: p});

            return {
                code: 201,
                elements: product,
                message: "Product updated Successfully!"
            }

        } catch (error) {
            console.log(error);
        }
    },

    // delete product
    delete_product: async ({ 
        idProduct 
    }) => {
        try {
            const product = await _Product.findOne({id: idProduct});

            if (!product) {
                return {
                    code: 401,
                    message: "Product not exist in database!"
                }
            }

            await _Product.deleteOne({id: idProduct});

            return {
                code: 201,
                message: `Product deleted Successfully!`
            }
        } catch (error) {
            console.log(error);
        }
    }
}