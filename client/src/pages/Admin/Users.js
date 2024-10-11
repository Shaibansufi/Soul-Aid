// import React from 'react'
// import Layout from '../../components/Layout/Layout'
// import AdminMenu from '../../components/Layout/AdminMenu'

// const Users = () => {
//   return (
//     <Layout title={'All Users - SB'}>
//         <div className='container-fluid m-3 p-3'>
//         <div className='row'>
//           <div className='col-md-3'>
//             <AdminMenu/>
//             </div>  
//           <div className='col-md-9'>
//             <h1>Users</h1>
//             </div>  
//         </div>
//         </div>
//     </Layout>
    
//   )
// }

// export default Users

// //////////////////////////////////////




import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import { Card, Table, Button, Form, Alert } from 'react-bootstrap';
import './Users.css'; // Optional: for custom styles

const Users = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Sample user data (you can replace this with actual data from your API)
  const users = [
    { id: 1, username: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, username: 'Jane Smith', email: 'jane@example.com', role: 'Editor' },
    { id: 3, username: 'Bob Johnson', email: 'bob@example.com', role: 'Viewer' },
  ];

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout title={'All Users - SB'}>
      <div className='container-fluid m-3 p-3'>
        <div className='row'>
          <div className='col-md-3'>
            <AdminMenu />
          </div>
          <div className='col-md-9'>
            <Card className='shadow p-4'>
              <Card.Title>User Management</Card.Title>
              <Form.Control
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="mb-3"
              />
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map(user => (
                      <tr key={user.id}>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>
                          <Button variant="warning" size="sm" className="me-1">Edit</Button>
                          <Button variant="danger" size="sm">Delete</Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center">No users found</td>
                    </tr>
                  )}
                </tbody>
              </Table>
              {filteredUsers.length === 0 && (
                <Alert variant="info">
                  No users match your search criteria.
                </Alert>
              )}
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Users;
