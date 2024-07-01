import React from 'react'
import '../components/styles/Navbar.css'
import { Link } from 'react-router-dom';

const Navbar=({logged,setLogin})=> {
  return (
    <div className='navbar-container'>
            <div className="navbar-logo">
                <h3>Ink Stain.</h3>
            </div>
           <div className="navbar-pages">
              <div className="navbar-logged">
                  <Link to='/Search'>Search</Link>
                  <Link to='/ChatBox'>ChatRoom</Link>
                  <Link to='/Profile'>Profile</Link>
              </div>
            </div>
    </div>
  )
}

export default Navbar;