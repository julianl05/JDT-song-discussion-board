import './App.css'
import Navbar from './components/navbar/navbar'
import CurrentDate from './components/currentDate/currentDate'
import Songs from './components/songs/songs'
import Comment from './components/comment/comment'
import CommentBox from './components/commentBox/commentBox'
import CommentList from './components/commentList/commentList'
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { useState } from 'react'
import { useEffect } from "react";
import { format } from 'date-fns'




function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [comments, setComments] = useState([]);
  const isCurrentDate = currentDate.toDateString() === new Date().toDateString();
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
  // }, [])
  useEffect(() => {
    updateComments();
  }, [currentDate]);

  async function updateSongs() {
    try {
      const response = await fetch('http://localhost:4000/3songs');
      const data = await response.json();
      setSongs(data);
    } catch (error) {
      console.error('Error fetching songs:', error);
    }
  }
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
  
  function decrementDate() {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 1);
    setCurrentDate(newDate);  
  }

  function incrementDate() {
    if (currentDate.toDateString() === new Date().toDateString()) {
      return;
    }
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 1);
    setCurrentDate(newDate);  
  }

  const leftArrowStyles = {
    fontSize: 50,
    cursor: 'pointer',
    color: '#333333',
    '&:hover': {
        color: 'gray'  
    }
  }

  const rightArrowStyles = {
    fontSize: 50,
    cursor: isCurrentDate ? 'default' : 'pointer',
    color: isCurrentDate ? 'lightgray' : '#333333',
    '&:hover': isCurrentDate ? {} : {color: 'gray'}
  }

  return (
    <>
      <Navbar/>
      <div class="container">
        <div id="dateContainer">
          <ArrowLeftIcon onClick={decrementDate} sx={leftArrowStyles}/>
          <CurrentDate date={currentDate}/>
          <ArrowRightIcon onClick={incrementDate} sx={rightArrowStyles}/>
        </div>
        <Songs date={currentDate}/>
        <div class="commentSection">
          <div id="commentsDiv">
              <div id="discussion title">
                  <h2>Discussion</h2>
              </div>
              <CommentList comments={comments}/>
              <CommentBox updateComments={updateComments} date={currentDate}/>
          </div>
        </div>
      </div>
      
      <div>

      </div>
    </>
  )
}

export default App
