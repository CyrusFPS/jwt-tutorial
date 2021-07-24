import React, { useState, useContext } from 'react'
import { AuthenticationContext } from '../context/AuthenticationContext';
import { Link } from 'react-router-dom';
import api from '../api/api';
import { toast } from 'react-toastify';

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { setIsAuthenticated } = useContext(AuthenticationContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const body = { email, password, name };
      const response = await api.post("/api/v1/auth/register", body);

      localStorage.setItem('jwt_token', response.data.data.token);

      setEmail("");
      setPassword("");
      setName("");

      setIsAuthenticated(true);
      toast.success("Account successfully registered!");
    } catch (err) {
      console.log(err.message);
      setEmail("");
      setPassword("");
      setName("");
      setIsAuthenticated(false);
      toast.error("Unable to register account.");
    }
  };

  return (
    <>
      <h1 className="text-center my-5">Register</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input value={name} onChange={(e) => setName(e.target.value)} type="text" name="name" placeholder="name" className="form-control my-3"/>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" placeholder="email" className="form-control my-3"/>
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" placeholder="password" className="form-control my-3"/>
        <button type="submit" className="btn btn-success btn-block">Submit</button>
      </form>
      <Link to="/login">Login</Link>
    </>
  )
}

export default Register
