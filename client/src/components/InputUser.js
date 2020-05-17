import React, { Fragment, useState } from 'react';

const InputUser = () => {

  const [name, setName] = useState("Name");
  const [email, setEmail] = useState("Email");
  const [address, setAddress] = useState("Address");

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = { name, email, address };
      const response = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(body)
      });

      // The line below refreshes the page, but for some reason is causing it to not be saved to the database
      // window.location = "/";
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
  <Fragment>
    <h1 className="text-center mt-5">User Database</h1>
    <form className="d-flex mt-5" onSubmit={onSubmitForm}>
      <input
        type="text" 
        className="form-control" 
        value={name} 
        onChange={e => setName(e.target.value)}/>
      <input
        type="text" 
        className="form-control" 
        value={email} 
        onChange={e => setEmail(e.target.value)}/>
        <input
        type="text" 
        className="form-control" 
        value={address} 
        onChange={e => setAddress(e.target.value)}/>
      <button className="btn btn-success">Add User</button>
    </form>
  </Fragment>
  );
};

export default InputUser;