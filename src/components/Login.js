import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import './Login.css'; // Ensure this points to your CSS file for styling alerts

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, authToken } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    setLoading(true); // Show loading indicator

    try {
      const response = await fetch('http://localhost:5000/login', {
      //const response = await fetch('http://192.168.0.105:5000/login', {
      //const response = await fetch('http://192.168.0.105/login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.token) {
          login(data.token);
          navigate('/'); // Redirect to home page or another protected route
        } else {
          setError('Login failed. Please check your credentials.');
        }
      } else {
        const data = await response.json();
        setError(data.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      if (err.name === 'TypeError') {
        // Handle network errors or backend not running
        setError('Unable to reach the server. Please check your network connection or try again later.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };

  if (authToken) {
    return null; // Hide the login component if already logged in
  }

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      {error && <div className="alert">{error}</div>}
    </div>
  );
};

export default Login;
