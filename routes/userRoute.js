const express = require('express');
const upload = require('../middleware/file-upload');
const router = express.Router();
const {registrationDataValidation} = require('../validations/userValidation');
const { validateRequestSchema } = require('../middleware/validate-request');
const { register, login, logout } = require('../controllers/UserController');

router.post('/register', upload.single('profile_pic') , registrationDataValidation, validateRequestSchema , register);
router.post('/login', login);
router.get('/logout', logout);

module.exports = router;