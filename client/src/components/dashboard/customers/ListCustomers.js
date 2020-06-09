import React, {Fragment, useEffect, useState} from 'react';
import EditCustomer from "./EditCustomer";

const ListCustomers = ({ allCustomers, setCustomersChange }) => {
  // console.log(allCustomers);
  const [customers, setCustomers] = useState([]); //empty array

  //delete customer function
  async function deleteCustomer(id) {
    try {
      await fetch(`http://localhost:5000/dashboard/customers/${id}`, {
        method: "DELETE",
        headers: { jwt_token: localStorage.token }
      });

      setCustomers(customers.filter(customer => customer.customer_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  }


  useEffect(() => {
    setCustomers(allCustomers);
  }, [allCustomers]);

  // console.log(allCustomers);

  return (
    <Fragment>
      {" "}
      <table className="table mt-5 text-center">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>

          {customers.length !== 0 &&
            customers.customer_id !== null &&
            customers.map(customers => (
              <tr key={customers.customer_id}>
                <td>{customers.customer_name}</td>
                <td>{customers.customer_email}</td>
                <td>{customers.customer_address}</td>
                <td>
                  <EditCustomer customers={customers} setCustomersChange={setCustomersChange} />
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteCustomer(customers.customer_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListCustomers;