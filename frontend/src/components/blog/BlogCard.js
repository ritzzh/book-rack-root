import React from "react";
import "../styles/BlogCard.css";
import { useSelector } from "react-redux";

const BlogCard = ({ post, onEdit, onDelete }) => {
  const { username } = useSelector((state) => state.user);
  return (
    <div className="blog-card">
      <div className="head">
        <h2>{post.title}</h2>
        <div className="user">{post.username}</div>
      </div>
      <p>{post.content}</p>
      {username == post.username ? (
        <div>
          <button onClick={() => onEdit(post)}>Edit</button>
          <button onClick={() => onDelete(post._id)}>Delete</button>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default BlogCard;
