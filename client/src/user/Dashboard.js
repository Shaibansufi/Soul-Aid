import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import { useAuth } from '../context/auth';
import UserMenu from './../components/Layout/UserMenu';
import { Card, Row, Col, ListGroup, Alert, Form, Button } from 'react-bootstrap';
import axios from 'axios';

function Dashboard() {
  const [auth, setAuth] = useAuth();
  const [interests, setInterests] = useState(auth?.user?.interests || []);
  const [newInterest, setNewInterest] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleAddInterest = async () => {
    if (!newInterest.trim()) return;

    try {
      const updatedInterests = [...interests, newInterest.trim()];
      const response = await axios.put(
        '/api/v1/user/profile',
        { interests: updatedInterests },
        { headers: { Authorization: `Bearer ${auth.token}` } }
      );

      setInterests(response.data.user.interests);
      setAuth({ ...auth, user: response.data.user });
      setNewInterest('');
      setMessage('Interest added successfully!');
      setError('');
    } catch (err) {
      setError('Failed to add interest. Please try again later.');
      console.error(err);
    }
  };

  return (
    <Layout title={'User Dashboard - Skill Barter'}>
      <div className='container-fluid m-3 p-3'>
        <div className='row'>
          <div className='col-md-3'>
            <UserMenu />
          </div>
          <div className='col-md-9'>
            <Card className='w-75 p-3'>
              <Card.Body>
                <Card.Title>User Information</Card.Title>
                <Card.Text>
                  <strong>Name:</strong> {auth?.user?.name}
                </Card.Text>
                <Card.Text>
                  <strong>Email:</strong> {auth?.user?.email}
                </Card.Text>
                <Card.Text>
                  <strong>Phone:</strong> {auth?.user?.phone}
                </Card.Text>
                <Card.Text>
                  <strong>Address:</strong> {auth?.user?.address}
                </Card.Text>
              </Card.Body>
            </Card>

            <Row className='mt-4'>
              <Col md={6}>
                <Card>
                  <Card.Header>Recent Posts</Card.Header>
                  <ListGroup variant="flush">
                    <ListGroup.Item>Website Design</ListGroup.Item>
                    <ListGroup.Item>Data Analysis</ListGroup.Item>
                    <ListGroup.Item>Marketing Strategy</ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
              <Col md={6}>
                <Card>
                  <Card.Header>Recent Transactions</Card.Header>
                  <ListGroup variant="flush">
                    <ListGroup.Item>Transaction 1</ListGroup.Item>
                    <ListGroup.Item>Transaction 2</ListGroup.Item>
                    <ListGroup.Item>Transaction 3</ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
            </Row>

            <Row className='mt-4'>
              <Col md={12}>
                <Card>
                  <Card.Header>Notifications</Card.Header>
                  <ListGroup>
                    {notifications.length > 0 ? (
                      notifications.map((notification, index) => (
                        <ListGroup.Item key={index} variant={notification.read ? 'light' : 'warning'}>
                          {notification.message}
                        </ListGroup.Item>
                      ))
                    ) : (
                      <Alert variant="info">No notifications found.</Alert>
                    )}
                  </ListGroup>
                </Card>
              </Col>
            </Row>

            <Row className='mt-4'>
              <Col md={12}>
                <Card>
                  <Card.Header>Interests</Card.Header>
                  <Card.Body>
                    {message && <Alert variant="success">{message}</Alert>}
                    {error && <Alert variant="danger">{error}</Alert>}
                    <ListGroup>
                      {interests.length > 0 ? (
                        interests.map((interest, index) => (
                          <ListGroup.Item key={index}>{interest}</ListGroup.Item>
                        ))
                      ) : (
                        <Alert variant="info">No interests added yet.</Alert>
                      )}
                    </ListGroup>
                    <Form className="mt-3">
                      <Form.Group controlId="formNewInterest">
                        <Form.Label>Add New Interest</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter a new interest"
                          value={newInterest}
                          onChange={(e) => setNewInterest(e.target.value)}
                        />
                      </Form.Group>
                      <Button variant="primary" className="mt-2" onClick={handleAddInterest}>
                        Add Interest
                      </Button>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;