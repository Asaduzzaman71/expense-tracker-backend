const express = require('express');
const router = express.Router();
const { categoryValidation } = require('../validations/categoryValidation');
const { validateRequestSchema } = require('../middleware/validate-request');
const {
    createCategory,
    updateCategory

} = require('../controllers/CategoryController');

router.post('/', categoryValidation, validateRequestSchema, createCategory);
router.route('/:id').patch(categoryValidation, updateCategory);

module.exports = router