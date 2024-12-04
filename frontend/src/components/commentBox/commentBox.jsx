import "./commentBox.css";

import { useState } from "react";

function CommentBox({ addComment }) {
    const [username, setUsername] = useState('');
    const [comment, setComment] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!username.trim() || !comment.trim()) {
            alert('Please fill in all fields.');
            return;
        }
        addComment(username, comment);
        setUsername('');
        setComment('');
    }
    
    return (
        <form onSubmit={ handleSubmit }>
            <label htmlFor="username">Username:</label>
            <input
                id="username"
                type="text"
                placeholder="Your username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
            />
            <label htmlFor="comment">Comment</label>
            <textarea
                id="comment"
                placeholder="Your comment"
                value={comment}
                onChange={e => setComment(e.target.value)}
                required
            />
            <button type="submit">Comment</button>
        </form>
    )
}
export default CommentBox;