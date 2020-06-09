import React, { Fragment, useState } from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

const EditCustomer = ({ customers, setCustomersChange }) => {
  //editText function

  const [name, setCustomerName] = useState(customers.customer_name);
  const [email, setCustomerEmail] = useState(customers.customer_email);
  const [address, setCustomerAddress] = useState(customers.customer_address);

  const formNameUpdater = (e) => {
    setCustomerName(e.target.value);
  }

  const formEmailUpdater = (e) => {
    setCustomerEmail(e.target.value);
  }

  const formAddressUpdater = (e) => {
    setCustomerAddress(e.target.value);
  }

  const editText = async id => {
    try {
      const body = { name, email, address };

      const myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("jwt_token", localStorage.token);

      await fetch(`http://localhost:5000/dashboard/customers/${id}`, {
        method: "PUT",
        headers: myHeaders,
        body: JSON.stringify(body)
      });

      setCustomersChange(true);

      // window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  // const updateAll = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const body = { name, email, address };
  //     const response = await fetch(`http://localhost:5000/dashboard/customers/${customers.customer_id}`, {
  //       method: "PUT",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(body)
  //     });

  //     window.location = "/";
  //   } catch (error) {
  //     console.error(error.message);
  //   }
  // }

  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-warning"
        data-toggle="modal"
        data-target={`#id${customers.customer_id}`}
      >
        Edit
      </button>
      <div
        className="modal"
        id={`id${customers.customer_id}`}>

        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit User</h4>
              <button type="button" className="close" data-dismiss="modal"
                onClick={() => { setCustomerName(customers.customer_name); setCustomerEmail(customers.customer_email); setCustomerAddress(customers.customer_address); }}
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
              <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => editText(customers.customer_id)}>Edit</button>
              <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={() => { setCustomerName(customers.customer_name); setCustomerEmail(customers.customer_email); setCustomerAddress(customers.customer_address);}}>Close</button>
            </div>
            </Router>
          </div>
        </div>
      </div>
    </Fragment>
  )
};

export default EditCustomer;