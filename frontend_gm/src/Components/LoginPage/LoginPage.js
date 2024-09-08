import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

export default function HomePage() {
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      // Replace this with your actual login API
      const response = await axios.post('/api/login', loginData);
      if (response.data.role === 'CUSTOMER') {
        navigate('/customer-dashboard'); // Redirect to customer dashboard
      } else if (response.data.role === 'SUPERVISOR') {
        navigate('/supervisor-dashboard'); // Redirect to supervisor dashboard
      } else if (response.data.role === 'ASSIGNEE') {
        navigate('/assignee-dashboard'); // Redirect to assignee dashboard
      }
    } catch (error) {
      setErrorMessage('Login failed. Please check your credentials.');
    }
  };

  const redirectToSignup = () => {
    navigate('/signup'); 
  };

  return (
    <div className="homePage">

      <form className="loginForm" onSubmit={handleLoginSubmit}>
        <div className="formGroup">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={loginData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="formGroup">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={loginData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="formGroup">
          <button type="submit" className="submitBtn">Login</button>
        </div>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </form>
      <div className="signupPrompt">
        <p>New to the system?</p>
        <button className="signupBtn" onClick={redirectToSignup}>Sign Up</button>
      </div>
    </div>
  );
}
