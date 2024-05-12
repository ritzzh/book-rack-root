import React from 'react'
import '../components/styles/Navbar.css'
import { Link } from 'react-router-dom';

const Navbar=()=> {
  return (
    <div className='navbar-container'>
            <div className="navbar-logo">
                <h1>Ink Stain.</h1>
            </div>
            <div className="navbar-pages">
                  <Link to='/Home'>Home</Link>
                  <Link to='/ChatBox'>ChatRoom</Link>
                  <Link to='/Comments'>Comments</Link>
                  <Link to='/Contact'>Contact</Link>
            </div>
    </div>
  )
}

export default Navbar;