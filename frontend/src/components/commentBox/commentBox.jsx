import "./commentBox.css";

import { useState } from "react";
import { format } from 'date-fns';

function CommentBox({ updateComments, date }) {
    const [username, setUsername] = useState('');
    const [comment, setComment] = useState('');
    const formattedDate = encodeURIComponent(format(date, 'MM/dd/yyyy'));

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!username.trim() || !comment.trim()) {
            alert('Please fill in all fields.');
            return;
        }
        console.log('Submitting comment:', JSON.stringify({ username, comment }));
        const response = await fetch(`https://lit-temple-38398-8cae6dc3273e.herokuapp.com/comments/${formattedDate}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, comment })
        })
        if (response.ok) {
            updateComments();
        }
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