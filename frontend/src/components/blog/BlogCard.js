import React from 'react';
import '../styles/BlogCard.css';

const BlogCard = ({ post, onEdit, onDelete }) => {
  return (
    <div className="blog-card">
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <button onClick={() => onEdit(post)}>Edit</button>
      <button onClick={() => onDelete(post._id)}>Delete</button>
    </div>
  );
};

export default BlogCard;
