import Home from './components/Home';
import Navbar from './components/Navbar';
import ChatBox from './components/chat/ChatBox';
import Chat from './components/chat/Chat';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import io from 'socket.io-client';
import { useState } from 'react';
import BookSearch from './components/BookSearch';


const socket = io.connect('https://book-rack-root-backend.onrender.com');

function App() {
  const [username,setUsername] = useState('');
  const [logged,setLogin] = useState(false);
  const [room,setRoom] = useState("");

  return (
    <div>
    <Router>
      <Navbar logged={logged} setLogin={setLogin}></Navbar>
      <Routes>
        <Route path="*" element={<Home/>}/>
        <Route exact path='/Search' element={<BookSearch/>}>Search</Route>
        <Route 
        exact path='/ChatBox' 
        element={
        <ChatBox
                username={username} 
                setUsername={setUsername} 
                room={room} 
                setRoom={setRoom} 
                socket={socket} 
        />}>ChatBox</Route>
        <Route
            exact path='/chat'
            element={<Chat username={username} room={room} socket={socket} />}
          />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
