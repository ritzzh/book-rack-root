import React, { useState } from 'react';
import './styles/Comments.css'; // Import CSS file for styling

function Comment({socket}) {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    const handleChange = (event) => {
        setNewComment(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (newComment.trim() !== '') {
            setComments(prevComments => [...prevComments, newComment]);
            socket.emit("store_comment",newComment)
            setNewComment('');
        }
    };

    return (
      <div className="comment-outer">
        <div className="comment-section">
            <h2>Comments</h2>
            <ul className="comment-list">
                {comments.map((comment, index) => (
                    <li key={index} className="comment-item">{comment}</li>
                ))}
            </ul>
            <form onSubmit={handleSubmit} className="comment-form">
                <textarea
                    value={newComment}
                    onChange={handleChange}
                    placeholder="Write your comment here..."
                    className="comment-input"
                />
                <button type="submit" className="comment-submit">Submit</button>
            </form>
        </div>
        </div>
    );
}

export default Comment;
