import React, { useState } from 'react';
import '../components/styles/Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = ({ logged, setLogin }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='navbar-container'>
      <div className="navbar-logo">
        <h3>Ink Stain.</h3>
      </div>
      <div className={`hamburger-lines ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
        <span className='line line1'></span>
        <span className='line line2'></span>
        <span className='line line3'></span>
      </div>
      <div className={`navbar-pages ${isOpen ? 'navbar-open' : ''}`}>
        {logged ? (
          <div className="navbar-logged">
            <Link onClick={()=>{setIsOpen(false)}} to='/Search'>Search</Link>
            <Link onClick={()=>{setIsOpen(false)}} to='/Blog'>Blog</Link>
            <Link onClick={()=>{setIsOpen(false)}} to='/ChatBox'>ChatRoom</Link>
            <Link onClick={()=>{setIsOpen(false)}} to='/Profile'>Profile</Link>
          </div>
        ) : (
          <Link to='/Login'>Login</Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
