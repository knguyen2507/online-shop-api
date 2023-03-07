// Models
import _Category from '../models/category.model.js';

export const categoryServices = {
    // get all categories
    get_all_category: async () => {
        try {
            const category = await _Category.find({});
            
            return {
                code: 200,
                elements: category
            }
        } catch (error) {
            console.log(error);
        }
    },

    // create new category
    create_new_category: async ({
        id, name
    }) => {
        try {
            const newCategory = {
                id: id,
                name: name
            };
    
            const category = await _Category.create(newCategory);
            
            return {
                code: 201,
                elements: category
            }
        } catch (error) {
            console.log(error);
        }
    },

    // get category by id
    get_category_by_id: async ({ idCategory }) => {
        try {
            const category = await _Category.find({id: idCategory});
            
            return {
                code: 200,
                elements: category
            }
        } catch (error) {
            console.log(error);
        }
    },

    // update category
    update_category: async ({
        id, name
    }) => {
        try {
            const category = await _Category.updateOne({id: id}, {$set: {name: name}});

            return {
                code: 201,
                elements: category,
                message: "Category updated Successfully!"
            }

        } catch (error) {
            console.log(error);
        }
    },

    // delete category
    delete_category: async ({ 
        idCategory 
    }) => {
        try {
            const category = await _Category.findOne({id: idCategory});

            if (!category) {
                return {
                    code: 401,
                    message: "Category not exist in database!"
                }
            }

            await _Category.deleteOne({id: idCategory});

            return {
                code: 201,
                message: `Category deleted Successfully!`
            }
        } catch (error) {
            console.log(error);
        }
    }
}