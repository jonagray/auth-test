import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="jumbotron mt-5">
      <h1>Welcome to the Customer Database</h1>
      <p>Sign In and Start Building Your Customers List</p>
      <Link to="/login" className="btn btn-primary">
        Login
      </Link>
      <Link to="/register" className="btn btn-primary ml-3">
        Register
      </Link>
    </div>
  );
};

export default Landing;