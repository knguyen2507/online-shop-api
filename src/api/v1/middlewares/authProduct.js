import createError from 'http-errors';
// Models
import _Product from '../models/product.model.js';

export const authProduct = {
    // check product avaiable
    checkProductAvaiable: async (req, res, next) => {
        // check request input
        if (req.body.id === "" || req.body.name === "" || req.body.qty === "" || req.body.category === "" || req.body.brand === "" || req.body.price === "") {
            return next(createError.BadRequest('Bad Request. Please Fill all fields'));
        }

        try {
            const idProduct = req.body.id;
            const listProduct = await _Product.find({});

            // check id avaiable
            for (let i of listProduct) {
                if (idProduct === i.id) {
                    return next(createError.BadRequest('This product is avaiable!'));
                }
            }
            next();
        } catch (error) {
            next(error);
        }
    }
}