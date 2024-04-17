import Home from './components/Home';
import Navbar from './components/Navbar';
import Comments from './components/Comments';
import ChatBox from './components/ChatBox';
import Contact from './components/Contact';
import Chat from './components/Chat';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import io from 'socket.io-client';
import { useState } from 'react';

const socket = io.connect('http://localhost:4000');

function App() {
  const [username,setUsername] = useState('');
  const [room,setRoom] = useState("");

  return (
    <div>
    <Router>
      <Navbar></Navbar>
      <Routes>
        <Route exact path='/Home' element={<Home></Home>}>Home</Route>
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
          
        <Route exact path='/Comments' element={<Comments/>}>Comments</Route>
        <Route exact path='/Contact' element={<Contact/>}>Contact</Route>
      </Routes>
    </Router>
    </div>
  );
}

export default App;
