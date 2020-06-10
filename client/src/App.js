import React, { Fragment, useState, useEffect } from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import Components
import Dashboard from "./components/dashboard/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import Landing from "./components/Landing";
toast.configure();

function App() {
  const checkAuthenticated = async () => {
    try {
      const res = await fetch("http://localhost:5000/auth/verify", {
        method: "POST",
        headers: { jwt_token: localStorage.token}
      });
      const parseRes = await res.json();
      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    checkAuthenticated();
  }, []);
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  return (
    <Fragment>
      <Router>
        <div className="container">
          <Switch>
            <Route exact path="/" render={props => !isAuthenticated ? ( <Landing {...props} />) : (<Redirect to="/dashboard" />)}/>
            <Route exact path="/login" render={props => !isAuthenticated ? (<Login {...props} setAuth={setAuth} />) : (<Redirect to="/dashboard" />)}/>
            <Route exact path="/register" render={props => !isAuthenticated ? (<Register {...props} setAuth={setAuth} />) : (<Redirect to="/dashboard" />)}/>
            <Route exact path="/dashboard" render={props => isAuthenticated ? (<Dashboard {...props} setAuth={setAuth} />) : (<Redirect to="/login" />)}/>
          </Switch>
        </div>
      </Router>
    </Fragment>
  );
};

export default App;