import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import { useAuth } from '../AuthContext';

function Navbar() {
  const { authToken, logout } = useAuth();
  const location = useLocation();

  const handleLogout = () => {
    logout();
  };

  console.log('AuthToken:', authToken); // Debugging line

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link
            to="/"
            className={location.pathname === '/' ? 'active' : ''}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/about"
            className={location.pathname === '/about' ? 'active' : ''}
          >
            About
          </Link>
        </li>
        {authToken && (
          <li>
            <Link
              to="/projects"
              className={location.pathname === '/projects' ? 'active' : ''}
            >
              Projects
            </Link>
          </li>
        )}
        {!authToken ? (
          <>
            <li>
              <Link
                to="/login"
                className={location.pathname === '/login' ? 'active' : ''}
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className={location.pathname === '/register' ? 'active' : ''}
              >
                Register
              </Link>
            </li>
          </>
        ) : (
          <li>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </li>
        )}
        <li>
          <Link
            to="/contact"
            className={location.pathname === '/contact' ? 'active' : ''}
          >
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
