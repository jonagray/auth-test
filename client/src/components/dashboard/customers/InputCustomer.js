import React, { Fragment, useState } from 'react';
import { toast } from 'react-toastify';

// Add a customer
const InputCustomer = ({ setCustomersChange }) => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    address: ""
  });

  const { name, email, address } = inputs;
  const onChange = e => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("jwt_token", localStorage.token);
      const body = { name, email, address };
      const response = await fetch("http://localhost:5000/dashboard/customers", {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(body)
      });

      const parseResponse = await response.json();
      setCustomersChange(true);
      setInputs({
        name: "",
        email: "",
        address: ""
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <form className="d-flex mt-5" onSubmit={onSubmitForm}>
        <input
          type="text"
          className="form-control"
          name="name"
          placeholder="Name"
          value={name}
          onChange={e => onChange(e)} />
        <input
          type="text"
          className="form-control"
          name="email"
          placeholder="Email"
          value={email}
          onChange={e => onChange(e)} />
        <input
          type="text"
          className="form-control"
          name="address"
          placeholder="Address"
          value={address}
          onChange={e => onChange(e)} />
        <button className="btn btn-success">Add Customer</button>
      </form>
    </Fragment>
  );
};

export default InputCustomer;