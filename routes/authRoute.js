const express = require('express');
const upload = require('../middleware/file-upload');
const router = express.Router();

const { register, login, logout } = require('../controllers/authController');

router.post('/register', upload.single('profile_pic') ,register);
router.post('/login', login);
router.get('/logout', logout);

module.exports = router;