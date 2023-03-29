const { createOrUpdateCategory,} = require('../repositories/categoryRepository');
const { createSlug } = require('../utils')
const Category = require('../models/Category');
const show = async (id) => {
    try {
        const category = await Category.findOne({
            where: {
                'id': id
            }
        });
        if (category){
            return { status: 200, message: 'category found', data: category }
        }else{
            return { status: 204, message: 'category not found', data: category }
        }
    } catch (error) {
        return error
    }
};
const list = async () => {
    try {
        const categories = await Category.findAll();
        return { status: 200, message: 'categories found', data: categories }
    } catch (error) {
        return error
    }
};
const create = async (req) => {
    try {
        req.body.slug = createSlug(req.body.title)
        const response = await createOrUpdateCategory(req);
        if (response.errors.length > 0){
            return { status: 400, message: response.errors[0].message}
        }else{
            return { status: 200, message: 'category created successfully', data: response }
        }

    } catch (error) {
        return error
    }
};
const update = async (req) => {
    try {
        req.body.slug = createSlug(req.body.title)
        const category = await createOrUpdateCategory(req);
        return { status: 200, message: 'Category updated successfully', data: category }

    } catch (error) {
        return {
            status: 400, message: error
        }
    }
};



module.exports = { create, update, list, show }