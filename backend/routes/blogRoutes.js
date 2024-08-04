
const express = require('express');
const { getAllBlogs, createBlog, updateBlog, deleteBlog, searchBlogs } = require('../controllers/blogController');
const router = express.Router();

router.get('/posts', getAllBlogs);
router.post('/posts', createBlog);
router.put('/posts/:id', updateBlog);
router.delete('/posts/:id', deleteBlog);
router.get('/search', searchBlogs);

module.exports = router;
