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
            
            <div class="commentBox">
                <div id="usernameBox">
                    <label id="usernameIdentifier" htmlFor="username">Post as:</label>
                    <input
                        id="username"
                        type="text"
                        placeholder="e.g. JulianLim123"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        required
                    />
                </div>
                <hr ></hr>
                <textarea
                    id="comment"
                    placeholder="Join the discussion..."
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                    required
                />
                <div id="submission">
                    <button id="submit" type="submit">Submit</button>
                </div>
            </div>
            
            
            {/* <label htmlFor="comment">Comment:</label> */}
            
        </form>
    )
}
export default CommentBox;