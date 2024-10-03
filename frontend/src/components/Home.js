import React from 'react'
import '../components/styles/Home.css'
import banner from '../components/assets/banner.jpg'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()
  const handleClick = ()=>{
    navigate('/login')
  }
  return (
    <div className="home">
      <header className="home-header">
        <h1>Discover & Chat About Your Favorite Books</h1>
        <p>Your one-stop app to explore books and join lively discussions.</p>
        <img src={banner} alt="Banner" className="banner" />
      </header>
      <section className="features">
        <div className="card" onClick={handleClick}>
          <h2>Search Books</h2>
          <p>Find information about your favorite books, authors, and genres.</p>
        </div>
        <div className="card" onClick={handleClick}>
          <h2>Join Chat Room</h2>
          <p>Engage in discussions with fellow book enthusiasts in real-time.</p>
        </div>
      </section>
    </div>
  )
}

export default Home