//import Footer from './Footer.js'
import React from 'react'
import './Home.css'
import SignUp from "./SignUp"
import { Link,useParams ,useNavigate} from 'react-router-dom'
import { useState ,useEffect} from 'react';
import Navbar from './Navbar';


const Home = () => {
  const navigate = useNavigate();
  
  

  
  return (
    <main className="main_box2">
        <Navbar/>
        <input type="checkbox" id="check" />
      <div className="btn_one">
        <label htmlFor="check" style={{ color: 'white' }}>
          <i className="fas fa-bars"></i>
        </label>
      </div>
      <h1 className='name'><u>Posts Uploader</u></h1>
      <div className="header">
        
        <div className="signUp">
            <button className="si" style={{textAlign:"center"}}>
            <Link to="/signUp">SignUp </Link>        
            </button>
        </div>
        <div className="Login">
            <button className="si" style={{textAlign:"center"}}>
            <Link to="/Login">Login</Link>        
            </button>
        </div>
      </div>

      <div className="sidebar_menu">
        <div className="logo">
          <a href="#">MENU</a>
        </div>

        <div className="btn_two">
          <label htmlFor="check" style={{ color: 'grey' }}>
            <i className="fas fa-xmark"></i>
          </label>
        </div>

        <div className="menu">
          <ul>
            <li>
              <i className="fas fa-image"></i>
              <a href='#'>Posts</a>
            </li>
            <li>
              <i className="fas fa-arrow-up-right-from-square"></i>
              <a href="#">Shortcuts</a>
            </li>
            <li>
              <i className="fas fa-photo-film"></i>
              <a href="#">Exhibits</a>
            </li>
            <li>
              <i className="fas fa-calendar-days"></i>
              <a href="#">Events</a>
            </li>
            <li>
              <i className="fas fa-store"></i>
              <a href="#">Store</a>
            </li>
            <li>
              <i className="fas fa-phone"></i>
              <a href="#">Contact</a>
            </li>
            <li>
              <i className="far fa-comments"></i>
              <a href="#">Feedback</a>
            </li>
          </ul>
        </div>

        <div className="social_media">
          <ul>
            <a href="#">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#">
              <i className="fab fa-youtube"></i>
            </a>
          </ul>
        </div>
      </div>
        {/* //<Footer/> */}
    </main>
  )
}

export default Home