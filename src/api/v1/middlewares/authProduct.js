// Models
import _Product from '../models/product.model.js';

export const authProduct = {
    checkProductAvaiable: async (req, res, next) => {
        if (req.body.id === "" || req.body.name === "" || req.body.qty === "" || req.body.category === "" || req.body.brand === "" || req.body.price === "") {
            return res.status(400).json({msg: 'Bad Request. Please Fill all fields'});
        }

        try {
            const idProduct = req.body.id;
            const listProduct = await _Product.find({});

            for (let i of listProduct) {
                if (idProduct === i.id) {
                    res.status(400).send({msg: "This product is avaiable!"});
                    return;
                }
            }
            next();
        } catch (error) {
            console.log(error);
        }
    }
}