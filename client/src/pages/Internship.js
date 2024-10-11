import React, { useState } from 'react';
import Layout from '../components/Layout/Layout';
import { Card, Table, Button, Form, Alert } from 'react-bootstrap';
import { useAuth } from '../context/auth'; // Adjust the path as necessary
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported

const Internship = () => {
  const [auth] = useAuth();
  const [searchTerm, setSearchTerm] = useState('');

  // Sample internship data
  const internships = [
    { id: 1, title: 'Web Development Internship', location: 'Remote', duration: '3 months', description: 'Learn and contribute to web development projects.' },
    { id: 2, title: 'Data Science Internship', location: 'On-site', duration: '6 months', description: 'Work with data analysis and machine learning.' },
    { id: 3, title: 'Marketing Internship', location: 'Remote', duration: '2 months', description: 'Assist with marketing campaigns and strategies.' },
  ];

  const filteredInternships = internships.filter(internship =>
    internship.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout title={'Internship Opportunities - SB'}>
      <div className='container-fluid m-3 p-3'>
        <div className='row'>
          <div className='col-md-12'>
            <Card className='shadow p-4'>
              <Card.Title>Internship Opportunities</Card.Title>
              <Form.Control
                type="text"
                placeholder="Search internships..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="mb-3"
              />
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Location</th>
                    <th>Duration</th>
                    <th>Description</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInternships.length > 0 ? (
                    filteredInternships.map(internship => (
                      <tr key={internship.id}>
                        <td>{internship.title}</td>
                        <td>{internship.location}</td>
                        <td>{internship.duration}</td>
                        <td>{internship.description}</td>
                        <td>
                          <Button variant="primary" size="sm">Apply</Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center">No internships found</td>
                    </tr>
                  )}
                </tbody>
              </Table>
              {filteredInternships.length === 0 && (
                <Alert variant="info">
                  No internships match your search criteria.
                </Alert>
              )}
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Internship;
