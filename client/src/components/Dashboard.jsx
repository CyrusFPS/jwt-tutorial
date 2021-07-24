import React, { useState, useEffect, useContext } from 'react'
import { AuthenticationContext } from '../context/AuthenticationContext';
import api from '../api/api';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const [name, setName] = useState("");
  const { setIsAuthenticated } = useContext(AuthenticationContext);

  const getName = async () => {
    try {
      const response = await api.get("/api/v1/dashboard", {
        headers: {
          jwt_token: localStorage.jwt_token,
        },
      });
      
      setName(response.data.data.user.user_name);
    } catch (err) {
      console.log(err.message);
    }
  }

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("jwt_token");
    setIsAuthenticated(false);
    toast.success("Logged out successfully!");
  };

  useEffect(() => {
    getName();
  }, []);

  return (
    <>
      <h1>Dashboard {name}</h1>
      <button className="btn btn-primary" onClick={(e) => handleLogout(e)}>Logout</button>
    </>
  )
}

export default Dashboard
