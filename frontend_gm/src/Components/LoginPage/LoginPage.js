import React, { useState,useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import { BASE_URL } from '../../Config/config';
import { UserContext } from '../UserContext/userContext';

export default function HomePage() {

  const { login } = useContext(UserContext);

  const [loginData, setLoginData] = useState({
    username: "",
    password: ""
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(loginData);
      const response = await axios.post(`${BASE_URL}/api/auth/login`, loginData,new URLSearchParams({
        username: loginData.username,  // Ensure this matches what Spring expects
        password: loginData.password,  // Same for the password
      }), {
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
          },
          withCredentials: true,  // Make sure credentials (cookies) are sent with the request
      });
      console.log(response.data);
      let user = response.data.role.slice(5);
      login(response.data.email)

      if (user === 'USER') {
        navigate('/userDashboard'); // Redirect to customer dashboard
      } else if (user === 'SUPERVISOR') {
        navigate('/supervisorDashboard'); // Redirect to supervisor dashboard
      } else if (user === 'ASSIGNEE') {
        navigate('/assigneeDashboard'); // Redirect to assignee dashboard
      }
    } catch (error) {
      console.error("Login failed:", error);
      setErrorMessage('Login failed. Please check your credentials.');
    }
  };

  const redirectToSignup = () => {
    navigate('/signup'); 
  };

  return (
    <div className="loginPage">
      <h1>LOGIN</h1>
      <form className="loginForm" onSubmit={handleLoginSubmit}>
        <div className="formGroup">
          <label>Email</label>
          <input
            type="email"
            name="username"
            value={loginData.username}
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
        {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
      </form>
      <div className="signupPrompt">
        <div>New to the system?</div>
        <button className="signupBtn" onClick={redirectToSignup}>Sign Up</button>
      </div>
    </div>
  );
}
