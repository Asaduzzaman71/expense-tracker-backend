const { body } = require('express-validator');
const categoryValidation = [
    body('title').isLength({ min: 8, }).withMessage('Enter Title minimum 8 chars long'),
    body('description').isLength({ min: 8, }).withMessage('Enter description'),
]

module.exports = {
    categoryValidation,
};
