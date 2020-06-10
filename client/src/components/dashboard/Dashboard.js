import React, { Fragment, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import InputCustomer from "./customers/InputCustomer";
import ListCustomers from "./customers/ListCustomers";

const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState("");
  const [allCustomers, setAllCustomers] = useState([]);
  const [customersChange, setCustomersChange] = useState(false);

  const getProfile = async () => {
    try {
      const res = await fetch("http://localhost:5000/dashboard/customers", {
        method: "GET",
        headers: { jwt_token: localStorage.token }
      });
      const parseData = await res.json();
      setAllCustomers(parseData);
    } catch (err) {
      console.error(err.message);
    }
  };

  const getUserProfile = async () => {
    try {
      const userRes = await fetch("http://localhost:5000/dashboard", {
        method: "GET",
        headers: { jwt_token: localStorage.token }
      });
      const parseUserData = await userRes.json();
      setName(parseUserData.user_name);
    } catch (err) {
      console.error(err.message);
    }
  };

  const logout = async e => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      setAuth(false);
      toast.success("Logout successfully");
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProfile();
    getUserProfile();
    setCustomersChange(false);
  }, [customersChange]);

  return (
    <Fragment>
      <h2>{name}'s Customer List</h2>
      <button onClick={e => logout(e)} className="btn btn-warning">
        Logout
      </button>
      <InputCustomer setCustomersChange={setCustomersChange} />
      <ListCustomers allCustomers={allCustomers} setCustomersChange={setCustomersChange} />
    </Fragment>
  );
};

export default Dashboard;