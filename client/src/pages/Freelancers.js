import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import { Card, Row, Col, Form, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useAuth } from '../context/auth';
import './Freelancers.css'; // Optional: for custom styles

const Freelancers = () => {
  const [freelancers, setFreelancers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);
  const [auth] = useAuth();

  useEffect(() => {
    const fetchFreelancers = async () => {
      try {
        const response = await axios.get('/api/user/users', {
          headers: { Authorization: `Bearer ${auth.token}` },
        });
        setFreelancers(response.data.users);
      } catch (err) {
        setError('Failed to fetch freelancers. Please try again later.');
        console.error(err);
      }
    };

    fetchFreelancers();
  }, [auth.token]);

  const filteredFreelancers = freelancers.filter(freelancer =>
    freelancer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout title={'Freelancers - Skill Barter'}>
      <div className='container-fluid m-3 p-3'>
        <h1>Freelancers</h1>
        <Form.Control
          type="text"
          placeholder="Search freelancers..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="mb-3"
        />
        {error && <Alert variant="danger">{error}</Alert>}
        <Row>
          {filteredFreelancers.length > 0 ? (
            filteredFreelancers.map(freelancer => (
              <Col md={4} key={freelancer._id} className="mb-4">
                <Card>
                  <Card.Body>
                    <Card.Title>{freelancer.name}</Card.Title>
                    <Card.Text>
                      <strong>Email:</strong> {freelancer.email}
                    </Card.Text>
                    <Card.Text>
                      <strong>Skills:</strong> {freelancer.skills.join(', ')}
                    </Card.Text>
                    <Card.Text>
                      <strong>Rating:</strong> {freelancer.rating}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Col>
              <Alert variant="info">No freelancers found.</Alert>
            </Col>
          )}
        </Row>
      </div>
    </Layout>
  );
};

export default Freelancers;
