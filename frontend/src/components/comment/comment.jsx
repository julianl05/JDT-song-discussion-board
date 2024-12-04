import "./comment.css"

function Comment({ username, text }) {
    return (
        <div className="comment">
            <strong>{username}</strong>: {text}
        </div>
    );
}

export default Comment;