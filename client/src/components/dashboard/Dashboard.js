import React, { Fragment, useState, useEffect } from 'react';
import {toast} from 'react-toastify';
import InputUser from "./customers/InputUser";
import ListUsers from "./customers/ListUsers";

const Dashboard = ({setAuth}) => {
  const [name, setName] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [usersChange, setUsersChange] = useState(false);

  const getProfile = async () => {
    try {
      const res = await fetch("http://localhost:5000/dashboard", {
        method: "GET",
        headers: { jwt_token: localStorage.token }
      });

      const parseData = await res.json();

      setAllUsers(parseData);

      console.log(parseData)
      setName(parseData.user_name);
    } catch (err) {
      console.error(err.message);
    }
  };

  const logout = async e => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      setAuth(false);
      toast.success("Logged out successfully!");
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProfile();
    setUsersChange(false);
  }, [usersChange]);

  return (
    <Fragment>
      <h1>{name}'s Dashboard</h1>
      <button className="btn btn-warning" onClick={e => logout(e)}>Logout</button>
      <div className="container">
      <InputUser setUsersChange={setUsersChange}/>
      <ListUsers allUsers={allUsers} setUsersChange={setUsersChange}/>
      </div>
    </Fragment>
  );
};

export default Dashboard;