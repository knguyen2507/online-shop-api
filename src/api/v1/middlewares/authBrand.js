import createError from 'http-errors';
// Models
import _Brand from '../models/brand.model.js';

export const authBrand = {
    // check brand avaiable
    checkBrandAvaiable: async (req, res, next) => {
        // check request input
        if (req.body.id === "" || req.body.name === "") {
            return next(createError.BadRequest('Bad Request. Please Fill all fields'));
        }

        try {
            const idBrand = req.body.id;
            const nameBrand = req.body.name;
            const listBrand = await _Brand.find({});

            // check name or id avaiable
            for (let i of listBrand) {
                if (idBrand === i.id || nameBrand === i.name) {
                    return next(createError.BadRequest('This brand is avaiable!'));
                }
            }
            next();
        } catch (error) {
            next(error)
        }
    }
}