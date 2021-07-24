import React, { useState, useContext } from 'react'
import { AuthenticationContext } from '../context/AuthenticationContext';
import { Link } from 'react-router-dom';
import api from '../api/api';
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setIsAuthenticated } = useContext(AuthenticationContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const body = { email, password };

      const response = await api.post("/api/v1/auth/login", body);

      localStorage.setItem("jwt_token", response.data.data.token);

      setEmail("");
      setPassword("");
  
      setIsAuthenticated(true);  
      toast.success("Login successfully completed!");
    } catch (err) {
      console.log(err.message);
      setEmail("");
      setPassword("");
      setIsAuthenticated(false);
      toast.error("Password or email incorrect.");
    }
  }

  return (
    <>
      <h1 className="text-center my-5">Login</h1>
      <form onSubmit={(e) => handleSubmit(e)} >
        <input value={email} onChange={(e) => setEmail(e.target.value)} className="form-control my-3" type="email" name="email" placeholder="email" />
        <input value={password} onChange={(e) => setPassword(e.target.value)} className="form-control my-3" type="password" name="password" placeholder="password" />
        <button className="btn btn-success btn-block" type="submit">Submit</button>
      </form>
      <Link to="/register">Register</Link>
    </>
  )
}

export default Login
