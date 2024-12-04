import './App.css'
import Navbar from './components/navbar/navbar'
import CurrentDate from './components/currentDate/currentDate'
import Songs from './components/songs/songs'
import Comment from './components/comment/comment'
import CommentBox from './components/commentBox/commentBox'
import CommentList from './components/commentList/commentList'
import { useState } from 'react'

function App() {
  const [comments, setComments] = useState([]);
  const addComment = (username, text) => {
    setComments(comments.concat({ username, text }));
  };

  return (
    <>
      <Navbar/>
      <div class="container">
        <CurrentDate/>
        <Songs/>
        <CommentList comments={comments}/>
        <CommentBox addComment={addComment}/>
      </div>
      
      <div>

      </div>
    </>
  )
}

export default App
