const { body } = require('express-validator');
const registrationDataValidation = [
    body('firstName').isLength({ min: 8, }).withMessage('Enter a name within 8 chars long'),
    body('lastName').isLength({ min: 8, }).withMessage('Enter a name within 8 chars long'),
    body('email').isEmail().withMessage('must be a valid email'),
    body("password").isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1
    }).withMessage("Password must be greater than 8 and contain at least one uppercase letter, one lowercase letter, and one number"),
    body('passwordConfirmation').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Password confirmation does not match password');
        }
        // Indicates the success of this synchronous custom validator
        return true;
    }),
]
   
module.exports = {
    registrationDataValidation,
};
