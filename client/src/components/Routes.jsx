import React, { useEffect, useContext } from 'react'
import { AuthenticationContext } from '../context/AuthenticationContext';
import Dashboard from "./Dashboard";
import Login from "./Login";
import Register from "./Register";
import { Switch, Redirect, Route } from 'react-router-dom';
import api from '../api/api';

const Routes = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthenticationContext);

  const checkAuthentication = async () => {
    try {
      const response = await api.get("/api/v1/auth/verify", {
        headers: {
          jwt_token: localStorage.jwt_token
        }
      });

      response.data.data.verified ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    checkAuthentication();
  }, [])

  return (
    <div className="container">
      <Switch>
        <Route exact path="/dashboard" render={props => isAuthenticated ? <Dashboard {...props} /> : <Redirect to="/login" />} />
        <Route exact path="/login" render={props => !isAuthenticated ? <Login {...props} /> : <Redirect to="/dashboard"/>} />
        <Route exact path="/register" render={props => !isAuthenticated ? <Register {...props} /> : <Redirect to="/dashboard" />} />
      </Switch>
    </div>
  )
}

export default Routes
