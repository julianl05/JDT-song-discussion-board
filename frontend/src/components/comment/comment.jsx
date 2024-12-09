import "./comment.css"
import profile from '../../assets/profile-icon.png'
function Comment({ username, text }) {
    return (
        <div class="comment">
            <img id="profile" width="30" src={profile}/>
            <div class="commentBody">
                <strong id="user">{username}:</strong>
                <p id="commentText">{text}</p>
            </div>
        </div>
    );
}

export default Comment;