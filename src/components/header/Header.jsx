import React from 'react'
import { Link } from 'react-router-dom';
import './header.scss'

const Header = () => {
  return (
    <nav>
      <Link to="/" className="logo">
        Events CRM
      </Link>
      <div>
        <Link to='/dashboard'>Dashboard</Link>
        <Link to='/add-event'>Create Event</Link>
        <Link to='/guests'>Guests</Link>
      </div>
      <div>
        <Link to="/my-events" className='myEvents'>My Events</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </nav>
  )
}

export default Header