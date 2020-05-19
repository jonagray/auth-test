import React, { Fragment, useState } from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

const EditUser = ({ users }) => {

  const [name, setName] = useState(users.name);
  const [email, setEmail] = useState(users.email);
  const [address, setAddress] = useState(users.address);

  const formNameUpdater = (e) => {
    setName(e.target.value);
  }

  const formEmailUpdater = (e) => {
    setEmail(e.target.value);
  }

  const formAddressUpdater = (e) => {
    setAddress(e.target.value);
  }

  const updateAll = async (e) => {
    e.preventDefault();

    try {
      const body = { name, email, address };
      const response = await fetch(`/users/${users.user_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      window.location = "/";
    } catch (error) {
      console.error(error.message);
    }
  }

  // Edit name function

  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-warning"
        data-toggle="modal"
        data-target={`#id${users.user_id}`}>
        Edit
    </button>

      <div
        className="modal"
        id={`id${users.user_id}`}>

        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit User</h4>
              <button type="button" className="close" data-dismiss="modal"
                onClick={() => { setName(users.name); setEmail(users.email); setAddress(users.address); }}
              >&times;</button>
            </div>

            <div className="modal-body">
              <input type="text" className="form-control" value={name} onChange={formNameUpdater} />
            </div>

            <div className="modal-body">
              <input type="text" className="form-control" value={email} onChange={formEmailUpdater} />
            </div>

            <div className="modal-body">
              <input type="text" className="form-control" value={address} onChange={formAddressUpdater} />
            </div>

            <Router>
            <div className="modal-footer">
              <button type="button" className="btn btn-warning" data-dismiss="modal" onClick={e => updateAll(e)}>Edit</button>
              <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={() => { setName(users.name); setEmail(users.email); setAddress(users.address);}}>Close</button>
            </div>
            </Router>
          </div>
        </div>
      </div>
    </Fragment>
  )
};

export default EditUser;