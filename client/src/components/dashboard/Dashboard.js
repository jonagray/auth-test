import React, { Fragment, useState, useEffect } from 'react';
import {toast} from 'react-toastify';
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

      // setName(parseData[0].user_id);
    } catch (err) {
      console.error(err.message);
    }
  };

  const getProfile2 = async () => {
    try {
      const res2 = await fetch("http://localhost:5000/dashboard", {
        method: "GET",
        headers: { jwt_token: localStorage.token }
      });

      const parseData2 = await res2.json();

      setName(parseData2.user_name);
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
    getProfile2();
    setCustomersChange(false);
  }, [customersChange]);

  return (
    <div>
      <div className="d-flex mt-5 justify-content-around">
        <h2>{name} 's Customer List</h2>
        <button onClick={e => logout(e)} className="btn btn-primary">
          Logout
        </button>
      </div>

      <InputCustomer setCustomersChange={setCustomersChange} />
      <ListCustomers allCustomers={allCustomers} setCustomersChange={setCustomersChange} />
    </div>
  );
};

export default Dashboard;