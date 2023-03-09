import createError from 'http-errors';
// Models
import _Category from '../models/category.model.js';

export const authCategory = {
    // check category avaiable
    checkCategoryAvaiable: async (req, res, next) => {
        // check request input
        if (req.body.name === "") {
            return next(createError.BadRequest('Bad Request. Please Fill all fields'));
        }

        try {
            const idCategory = req.body.id;
            const nameCategory = req.body.name;
            const listCategory = await _Category.find({});

            // check name or id avaiable
            for (let i of listCategory) {
                if (idCategory === i.id || nameCategory === i.name) {
                    return next(createError.BadRequest('This category is avaiable!'));
                }
            }
            next();
        } catch (error) {
            next(error)
        }
    }
}