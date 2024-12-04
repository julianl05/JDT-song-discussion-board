import './App.css'
import Navbar from './components/navbar/navbar'
import Date from './components/date/date'
import Songs from './components/songs/songs'
function App() {
  return (
    <>
      <Navbar/>
      <div class="container">
        <Date/>
        <Songs/>
      </div>
      
      <div>

      </div>
    </>
  )
}

export default App
