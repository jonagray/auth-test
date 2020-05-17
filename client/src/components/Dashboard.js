import React, { Fragment, useState, useEffect } from 'react';
import {toast} from 'react-toastify';
import InputUser from "./InputUser";
import ListUsers from "./ListUsers";

const Dashboard = ({setAuth}) => {

  const [name, setName] = useState("");

  async function getName() {
    try {
      const response = await fetch("http://localhost:5000/dashboard", {
        method: "GET",
        headers: {jwt_token: localStorage.token}
      })

      const parseRes = await response.json();

      setName(parseRes.nearapogee_user_name);

    } catch (error) {
      console.error(error.message);
    }
  }

  const logout = e => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
    toast.success("Logged out successfully!");
  }

  useEffect(() => {
    getName();
  },[]);

  return (
    <Fragment>
      <h1>Dashboard {name} </h1>
      <button className="btn btn-primary" onClick={e => logout(e)}>Logout</button>
      <div className="container">
      <InputUser />
      <ListUsers />
      </div>
    </Fragment>
  );
};

export default Dashboard;