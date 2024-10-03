import Home from './components/Home';
import Navbar from './components/Navbar';
import ChatBox from './components/chat/ChatBox';
import Chat from './components/chat/Chat';
import BookSearch from './components/books/BookSearch';
import Login from './components/profile/Login';
import Profile from './components/profile/Profile';
import SignUp from './components/profile/SignUp';
import MakeBlog from './components/blog/MakeBlog';
import io from 'socket.io-client';
import {useSelector } from 'react-redux';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import './App.css'


// const socket = io.connect('http://localhost:4000');
// const baseURL = 'http://localhost:4000'
const socket = io.connect('https://book-rack-root.onrender.com');
const baseURL = 'https://book-rack-root.onrender.com'

function App() {
  const {username, logged} = useSelector(state => state.user)
  const {room} = useSelector(state => state.user)

  

  return (
    <div>
    <Router>
      <Navbar logged={logged} ></Navbar>
      <Routes>
        <Route path="*" element={<Home/>}/>
        <Route exact path='/Search' element={logged&&<BookSearch/>}>Search</Route>
        <Route 
        exact path='/ChatBox' 
        element={
        logged&&<ChatBox
                room={room} 
                socket={socket} 
        />}>ChatBox</Route>
        <Route
            exact path='/chat'
            element={logged&&<Chat username={username} room={room} socket={socket} />}
          />
        <Route
            exact path='/Login'
            element={<Login baseURL={baseURL}/>}
          />
        <Route
            exact path='/Profile'
            element={logged&&<Profile baseURL={baseURL} />}
          />
        <Route
            exact path='/SignUp'
            element={<SignUp baseURL={baseURL}/>}
          />
          <Route exact path="/Blog" element={logged&&<MakeBlog baseURL={baseURL}></MakeBlog>} />
          </Routes>
    </Router>
    </div>
  );
}

export default App;
