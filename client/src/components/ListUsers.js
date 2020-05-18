import React, {Fragment, useEffect, useState} from 'react';
import EditUser from "./EditUser";

const ListUsers = () => {

  const [users, setUsers] = useState([]);

  // Delete User Function

  const deleteUser = async (id) => {
    try {
      const deleteUser = await fetch(`/users/${id}`, {
        method: "DELETE"
      });
      
      setUsers(users.filter(users => users.user_id !== id));
    } catch (error) {
      console.error(error.message);
    }
  }

  const getUsers = async () => {
    try {
      const response = await fetch("/users")
      const jsonData = await response.json();

      setUsers(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Fragment>
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
      {users.map(users => (
        <tr key={users.user_id}>
          <td>{users.name}</td>
          <td>{users.email}</td>
          <td>{users.address}</td>
          <td>
            <EditUser users={users} />
          </td>
          <td>
            <button 
              className="btn btn-danger"
              onClick={() => deleteUser(users.user_id)}>Delete</button></td>
        </tr>
      ))}
    </tbody>
  </table>
    </Fragment>
  );
}

export default ListUsers;