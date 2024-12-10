import './App.css'
import Navbar from './components/navbar/navbar'
import CurrentDate from './components/currentDate/currentDate'
import Songs from './components/songs/songs'
import Comment from './components/comment/comment'
import CommentBox from './components/commentBox/commentBox'
import CommentList from './components/commentList/commentList'
import { useState } from 'react'
import { useEffect } from "react";
import { format } from 'date-fns'




function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [comments, setComments] = useState([]);
  // useEffect(() => {
  //   console.log('Fetching date...');
  //   const fetchDate = async () => {
  //       try {
  //           const response = await fetch('http://localhost:4000/date');
  //           const data = await response.json();
  //           setCurrentDate(new Date(data.date));
  //       } catch (error) {
  //           console.error('Error fetching date:', error);
  //       }
  //   };
  //   fetchDate();
  // }, []);
  useEffect(() => {
    updateComments();
  }, []);
  
  async function updateComments() {
    const formattedDate = encodeURIComponent(format(currentDate, 'MM/dd/yyyy'));
    try {
      const response = await fetch(`http://localhost:4000/comments/${formattedDate}`);
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  }
  const addComment = (username, text) => {
    setComments(comments.concat({ username, text }));
  };

  return (
    <>
      <Navbar/>
      <div class="container">
        <CurrentDate date={currentDate}/>
        <Songs date={currentDate}/>
        <div class="commentSection">
          <div id="commentsDiv">
              <div id="discussion title">
                  <h2>Discussion</h2>
              </div>
              <CommentList comments={comments}/>
              <CommentBox updateComments={updateComments}/>
          </div>
        </div>
      </div>
      
      <div>

      </div>
    </>
  )
}

export default App
