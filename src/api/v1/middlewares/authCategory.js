// Models
import _Category from '../models/category.model.js';

export const authCategory = {
    checkCategoryAvaiable: async (req, res, next) => {
        if (req.body.name === "") {
            return res.status(400).json({msg: 'Bad Request. Please Fill all fields'});
        }

        try {
            const idCategory = req.body.id;
            const nameCategory = req.body.name;
            const listCategory = await _Category.find({});

            for (let i of listCategory) {
                if (idCategory === i.id || nameCategory === i.name) {
                    res.status(400).send({msg: "This category is avaiable!"});
                    return;
                }
            }
            next();
        } catch (error) {
            console.log(error)
        }
    }
}