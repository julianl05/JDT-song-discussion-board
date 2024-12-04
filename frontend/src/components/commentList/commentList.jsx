import "./commentList.css"
import Comment from '../comment/comment'; 

function CommentList({ comments }) {
    return (
        <ul>
            {comments.map((comment, index) => (
                <li key={index}>
                    <Comment username={comment.username} text={comment.text} />
                </li>
            ))}
        </ul>
    );
}

export default CommentList;
