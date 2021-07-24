import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { AuthenticationContextProvider } from "./context/AuthenticationContext";
import Routes from "./components/Routes";

toast.configure();

function App() {
  return (
    <AuthenticationContextProvider>
      <>
        <Router>
          <Routes />
        </Router>
      </>
    </AuthenticationContextProvider>
  );
}

export default App;
