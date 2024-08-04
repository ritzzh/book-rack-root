
const Blog = require('../models/Blog');

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createBlog = async (req, res) => {
  const { title, content } = req.body;
  const newBlog = new Blog({ title, content });
  try {
    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateBlog = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(id, { title, content }, { new: true });
    res.json(updatedBlog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteBlog = async (req, res) => {
  const { id } = req.params;
  try {
    await Blog.findByIdAndDelete(id);
    res.status(204).json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const searchBlogs = async (req, res) => {
  const { query } = req.query;
  try {
    const blogs = await Blog.find({ $text: { $search: query } });
    res.json(blogs);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getAllBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  searchBlogs
};
