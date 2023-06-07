import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {useAuth} from '../App'
import './Login.css';
export default function Login() {

  const [input, setInput] = useState({
    userName: "",
    password: "",
  });
  const [data, setData] = useState('');
  const [error, setError] = useState(null);
  let auth = useAuth();
  const navigate = useNavigate();

 
  useEffect(() => {
    setError(auth.error)
    return () => {
      auth.error
    }
  }, [auth.error])
  

  const handleInputChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    setInput((user) => ({
      ...user,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await auth.signin(input, () => {
      navigate("/newuser"); 
    });
   
  };

  return (
    <div className="loginForm">
      <form onSubmit={handleSubmit}>
        <label htmlFor="userName">User Name:</label>
        <input
          type="text"
          name="userName"
          id="userName"
          placeholder="User Name"
          value={input.userName}
          onChange={handleInputChange}
        /><br />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          value={input.password}
          onChange={handleInputChange}
        /><br />
        <button type="submit" className="loginButton">
          Log In
        </button>
      </form>
      <br />
      {error && <div>{error}</div>}
    </div>
  );
}
