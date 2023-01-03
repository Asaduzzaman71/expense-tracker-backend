const express = require('express');
const upload = require('../middleware/file-upload');
const router = express.Router();
const {
  createPost,
  deletePost,
  getAllPosts,
  updatePost,
  getPost,
} = require('../controllers/postController');

router.route('/').post(upload.array("images",2),createPost).get(getAllPosts);
router.route('/:id').get(getPost).delete(deletePost).patch(updatePost);

module.exports = router