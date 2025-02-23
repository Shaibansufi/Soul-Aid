import React from 'react';
import Layout from '../components/Layout/Layout';
import { useAuth } from '../context/auth';
import UserMenu from './../components/Layout/UserMenu';
import { Card, Row, Col, ListGroup } from 'react-bootstrap';

function Dashboard() {
  const [auth] = useAuth();
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
                  <ListGroup variant="flush">
                    <ListGroup.Item>Notification 1</ListGroup.Item>
                    <ListGroup.Item>Notification 2</ListGroup.Item>
                    <ListGroup.Item>Notification 3</ListGroup.Item>
                  </ListGroup>
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