import Home from './components/Home';
import Navbar from './components/Navbar';
import ChatBox from './components/chat/ChatBox';
import Chat from './components/chat/Chat';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import io from 'socket.io-client';
import BookSearch from './components/BookSearch';
import Login from './components/profile/Login';
import Profile from './components/profile/Profile';
import SignUp from './components/profile/SignUp';
import { useSelector } from 'react-redux';
import KeepAlive from './components/KeepAlive';


// const socket = io.connect('http://localhost:4000');
const socket = io.connect('https://book-rack-root-backend.onrender.com');
const baseURL = 'https://book-rack-root-backend.onrender.com'

function App() {
  const {username, logged} = useSelector(state => state.user)
  const {room} = useSelector(state => state.user)
  

  return (
    <div>
    <Router>
      <Navbar logged={logged} ></Navbar>
      <Routes>
        <Route path="*" element={<Home/>}/>
        <Route exact path='/Search' element={<BookSearch/>}>Search</Route>
        <Route 
        exact path='/ChatBox' 
        element={
        <ChatBox
                room={room} 
                socket={socket} 
        />}>ChatBox</Route>
        <Route
            exact path='/chat'
            element={<Chat username={username} room={room} socket={socket} />}
          />
        <Route
            exact path='/Login'
            element={<Login baseURL={baseURL}/>}
          />
        <Route
            exact path='/Profile'
            element={<Profile baseURL={baseURL} />}
          />
        <Route
            exact path='/SignUp'
            element={<SignUp baseURL={baseURL}/>}
          />
        
      </Routes>
    </Router>
    </div>
  );
}

export default App;
