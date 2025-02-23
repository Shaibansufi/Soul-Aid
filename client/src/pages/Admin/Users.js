import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import { Card, Table, Button, Form, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useAuth } from '../../context/auth';
import './Users.css'; // Optional: for custom styles

const Users = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [auth] = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/v1/user/users', {
          headers: { Authorization: `Bearer ${auth.token}` },
        });
        setUsers(response.data.users);
      } catch (err) {
        setError('Failed to fetch users. Please try again later.');
        console.error(err);
      }
    };

    fetchUsers();
  }, [auth.token]);

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`/api/v1/user/users/${userId}`, {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      setUsers(users.filter(user => user._id !== userId));
    } catch (err) {
      setError('Failed to delete user. Please try again later.');
      console.error(err);
    }
  };

  return (
    <Layout title={'All Users - Skill Barter'}>
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
              {error && <Alert variant="danger">{error}</Alert>}
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
                  {users.length > 0 ? (
                    users.filter(user =>
                      user.name.toLowerCase().includes(searchTerm.toLowerCase())
                    ).map(user => (
                      <tr key={user._id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.role === 1 ? 'Admin' : 'User'}</td>
                        <td>
                          <Button variant="warning" size="sm" className="me-1">Edit</Button>
                          <Button variant="danger" size="sm" onClick={() => handleDelete(user._id)}>Delete</Button>
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
              {users.length === 0 && (
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
};

export default Users;
