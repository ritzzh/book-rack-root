import React, { useEffect, useState } from 'react';
import BlogCard from './BlogCard';
import '../styles/MakeBlog.css';

const MakeBlog = ({ baseURL }) => {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editingPost, setEditingPost] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    fetch(`${baseURL}/api/posts`)
      .then(response => response.json())
      .then(data => setPosts(data))
      .catch(error => console.log(error));
  };

  useEffect(() => {
    if (searchQuery) {
      fetch(`${baseURL}/api/search?query=${searchQuery}`)
        .then(response => response.json())
        .then(data => setPosts(data))
        .catch(error => console.log(error));
    } else {
      fetchPosts();
    }
  }, [searchQuery]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingPost) {
      fetch(`${baseURL}/api/posts/${editingPost._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
      })
        .then(response => response.json())
        .then(() => {
          setEditingPost(null);
          setTitle('');
          setContent('');
          fetchPosts();
        })
        .catch(error => console.log(error));
    } else {
      fetch(`${baseURL}/api/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
      })
        .then(response => response.json())
        .then(() => {
          setTitle('');
          setContent('');
          fetchPosts();
        })
        .catch(error => console.log(error));
    }
  };

  const deletePost = (id) => {
    fetch(`${baseURL}/api/posts/${id}`, {
      method: 'DELETE',
    })
      .then(() => fetchPosts())
      .catch(error => console.log(error));
  };

  const editPost = (post) => {
    setEditingPost(post);
    setTitle(post.title);
    setContent(post.content);
  };

  return (
    <div className="make-blog-container">
      <h1>Blog Posts</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search posts"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <button type="submit">{editingPost ? 'Update Post' : 'Add Post'}</button>
      </form>
      {posts.map(post => (
        <BlogCard 
          key={post._id} 
          post={post} 
          onEdit={editPost} 
          onDelete={deletePost} 
        />
      ))}
    </div>
  );
};

export default MakeBlog;
