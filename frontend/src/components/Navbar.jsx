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
      <div className="navbar-hamburger" onClick={toggleMenu}>
        <div className={isOpen ? 'bar open' : 'bar'}></div>
        <div className={isOpen ? 'bar open' : 'bar'}></div>
        <div className={isOpen ? 'bar open' : 'bar'}></div>
      </div>
      <div className={`navbar-pages ${isOpen ? 'open' : ''}`}>
        <div className="navbar-logged">
          <Link to='/Search'>Search</Link>
          <Link to='/ChatBox'>ChatRoom</Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
