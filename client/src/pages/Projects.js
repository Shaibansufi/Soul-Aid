import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import { Card, Row, Col, Form, Alert } from 'react-bootstrap';
import axios from 'axios';
import './Projects.css'; // Optional: for custom styles

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('/api/projects');
        setProjects(response.data.projects);
      } catch (err) {
        setError('Failed to fetch projects. Please try again later.');
        console.error(err);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout title={'Projects - Skill Barter'}>
      <div className='container-fluid m-3 p-3'>
        <h1>Projects</h1>
        <Form.Control
          type="text"
          placeholder="Search projects..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="mb-3"
        />
        {error && <Alert variant="danger">{error}</Alert>}
        <Row>
          {filteredProjects.length > 0 ? (
            filteredProjects.map(project => (
              <Col md={4} key={project._id} className="mb-4">
                <Card>
                  <Card.Body>
                    <Card.Title>{project.name}</Card.Title>
                    <Card.Text>
                      <strong>Description:</strong> {project.description}
                    </Card.Text>
                    <Card.Text>
                      <strong>Client:</strong> {project.client}
                    </Card.Text>
                    <Card.Text>
                      <strong>Status:</strong> {project.status}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Col>
              <Alert variant="info">No projects found.</Alert>
            </Col>
          )}
        </Row>
      </div>
    </Layout>
  );
};

export default Projects;
