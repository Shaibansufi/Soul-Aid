// import React from 'react'
// import Layout from '../../components/Layout/Layout'
// import AdminMenu from '../../components/Layout/AdminMenu'
// import { useAuth } from '../../context/auth'


// const AdminDashboard = () => {
//   const [auth] = useAuth()
//   return (
//     <Layout title={'AdminDashBoard -SB'}>
//       <div className='container-fluid m-3 p-3'>
//         <div className='row'>
//           <div className='col-md-3'>
//             <AdminMenu/>
//           </div>
//           <div className='col-md-9'>
//             <div className='card w-75 p-3'>
//               <h3>Admin Name :{auth?.user?.name}</h3>
//               <h3>Admin Email :{auth?.user?.email}</h3>
//               <h3>Admin Contact :{auth?.user?.phone}</h3>
//               {/* {console.log(auth?.user?.phone)} */}

//             </div>
//           </div>
//         </div>
//       </div>
//         <h1>AdminDashboard</h1>
//     </Layout>
//   )
// }

// export default AdminDashboard


// /////////////////////////////////
import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import { useAuth } from '../../context/auth';
import { Card, Button, Alert, Table, Form } from 'react-bootstrap';
import './AdminDashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminDashboard = () => {
  const [auth] = useAuth();
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
    <Layout title={'AdminDashBoard -SB'}>
      <div className='container-fluid m-3 p-3'>
        <div className='row'>
          <div className='col-md-3'>
            <AdminMenu />
          </div>
          <div className='col-md-9'>
            <Card className='w-75 p-3 shadow'>
              <Card.Body>
                <Card.Title>Admin Details</Card.Title>
                <Card.Text>
                  <strong>Name:</strong> {auth?.user?.username || 'N/A'}<br />
                  <strong>Email:</strong> {auth?.user?.email || 'N/A'}<br />
                  <strong>Contact:</strong> {auth?.user?.phone || 'N/A'}
                </Card.Text>
                <Button variant="primary" className="me-2">Edit Profile</Button>
                <Button variant="secondary">Manage Users</Button>
              </Card.Body>
            </Card>

            <div className='mt-4'>
              <h4>User Management</h4>
              <Form.Control
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
              <Table striped bordered hover className="mt-3">
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
            </div>

            <div className='mt-4'>
              <h4>Recent Activities</h4>
              <Alert variant="info">
                You have 3 new notifications and 2 pending requests.
              </Alert>
            </div>

            <div className='mt-4'>
              <h4>Admin Actions</h4>
              <Button variant="outline-primary" className="me-2">View User Statistics</Button>
              <Button variant="outline-success" className="me-2">Generate Reports</Button>
              <Button variant="outline-warning">Send Notifications</Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
