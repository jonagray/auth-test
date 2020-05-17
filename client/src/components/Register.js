'use strict';

import React, { Fragment, useState } from 'react';
import {Link} from 'react-router-dom';

const Register = ({setAuth}) => {

  const [inputs, setInput] = useState({
    email: "",
    password: "",
    name: ""
  })

  const { email, password, name } = inputs;

  const onChange = (e) => {
    setInput({ ...inputs, [e.target.name] : e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();

    try {

      const body = {email, password, name};

      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(body)
      });

      const parseRes = await response.json();

      localStorage.setItem("token", parseRes.jwtToken);

      setAuth(true);

    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <Fragment>
      <h1 className="text-center my-5">Register</h1>
      <form onSubmit={onSubmitForm}>
        <input type="email" name="email" placeholder="email" className="form-control my-3" value={email} onChange={e => onChange(e)} />
        <input type="password" name="password" placeholder="password" className="form-control my-3" value={password} onChange={e => onChange(e)} />
        <input type="text" name="name" placeholder="name" className="form-control my-3" value={name} onChange={e => onChange(e)} />
        <button className="btn btn-success btn-block">Submit</button>
      </form>
      <Link to="/login">Login</Link>
    </Fragment>
  );
};

export default Register;