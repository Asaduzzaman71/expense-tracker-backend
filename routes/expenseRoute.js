const express = require('express');
const router = express.Router();
const { categoryValidation } = require('../validations/categoryValidation');
const { validateRequestSchema } = require('../middleware/validate-request');
const {
    createCategory,
    updateCategory,
    getSingleCategory,
    getAllCategories


} = require('../controllers/CategoryController');

router.route('/').post( categoryValidation, validateRequestSchema, createCategory).get(getAllCategories);
router.route('/:id').patch(categoryValidation, updateCategory).get(getSingleCategory);

module.exports = router