import React, { useState } from 'react';
import Layout from '../components/Layout/Layout';
import { Card, Table, Button, Form, Alert } from 'react-bootstrap';
import { useAuth } from '../context/auth'; // Adjust the path as necessary
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported

const Internship = () => {
  const [auth] = useAuth();
  const [searchTerm, setSearchTerm] = useState('');

  // Sample project data
  const projects = [
    { id: 1, title: 'Website Design', client: 'Tech Corp', duration: '3 months', description: 'Design a responsive website.' },
    { id: 2, title: 'Data Analysis', client: 'Data Solutions', duration: '6 months', description: 'Analyze data and create reports.' },
    { id: 3, title: 'Marketing Campaign', client: 'Marketing Inc.', duration: '2 months', description: 'Develop and execute marketing strategies.' },
  ];

  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout title={'Project Opportunities - Skill Barter'}>
      <div className='container-fluid m-3 p-3'>
        <div className='row'>
          <div className='col-md-12'>
            <Card className='shadow p-4'>
              <Card.Title>Project Opportunities</Card.Title>
              <Form.Control
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="mb-3"
              />
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Client</th>
                    <th>Duration</th>
                    <th>Description</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProjects.length > 0 ? (
                    filteredProjects.map(project => (
                      <tr key={project.id}>
                        <td>{project.title}</td>
                        <td>{project.client}</td>
                        <td>{project.duration}</td>
                        <td>{project.description}</td>
                        <td>
                          <Button variant="primary" size="sm">Apply</Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center">No projects found</td>
                    </tr>
                  )}
                </tbody>
              </Table>
              {filteredProjects.length === 0 && (
                <Alert variant="info">
                  No projects match your search criteria.
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
