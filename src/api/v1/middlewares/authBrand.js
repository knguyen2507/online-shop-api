// Models
import _Brand from '../models/brand.model.js';

export const authBrand = {
    checkBrandAvaiable: async (req, res, next) => {
        if (req.body.id === "" || req.body.name === "") {
            return res.status(400).json({msg: 'Bad Request. Please Fill all fields'});
        }

        try {
            const idBrand = req.body.id;
            const nameBrand = req.body.name;
            const listBrand = await _Brand.find({});

            for (let i of listBrand) {
                if (idBrand === i.id || nameBrand === i.name) {
                    res.status(400).send({msg: "This brand is avaiable!"});
                    return;
                }
            }
            next();
        } catch (error) {
            console.log(error)
        }
    }
}