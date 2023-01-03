const express = require('express');
const upload = require('../middleware/file-upload');
const router = express.Router();
const {
  createComment,
  deleteComment,
  getAllComments,
  updateComment,
} = require('../controllers/commentController');

router.route('/').post(createComment).get(getAllComments);
router.route('/:id').delete(deleteComment).patch(updateComment);

module.exports = router