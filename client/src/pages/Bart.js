import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import { useAuth } from '../context/auth';
import axios from 'axios';
import './MyPage.css';

const MyPage = () => {
  const [projects, setProjects] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [auth] = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch projects
        const projectsResponse = await axios.get('/api/v1/mypage/projects', {
          headers: { Authorization: `Bearer ${auth.token}` },
        });
        setProjects(projectsResponse.data.projects);

        // Fetch sessions
        const sessionsResponse = await axios.get('/api/v1/mypage/sessions', {
          headers: { Authorization: `Bearer ${auth.token}` },
        });
        setSessions(sessionsResponse.data.sessions);

        // Fetch resources
        const resourcesResponse = await axios.get('/api/v1/mypage/resources');
        setResources(resourcesResponse.data.resources);
      } catch (err) {
        if (err.response) {
          setError(`Error: ${err.response.status} - ${err.response.data.message}`);
        } else if (err.request) {
          setError('No response from the server. Please check your network connection.');
        } else {
          setError(`Error: ${err.message}`);
        }
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [auth.token]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <Layout title={'My Page'}>
      <div className="my-page-container">
        <h1>My Page</h1>

        {/* Projects Section */}
        <section className="projects-section">
          <h2>My Projects</h2>
          {projects.length === 0 ? (
            <p>No projects found.</p>
          ) : (
            <ul className="project-list">
              {projects.map((project) => (
                <li key={project._id} className="project-item">
                  <h3>{project.title}</h3>
                  <p>Client: {project.client}</p>
                  <p>Status: {project.status}</p>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Sessions Section */}
        <section className="sessions-section">
          <h2>My Sessions</h2>
          {sessions.length === 0 ? (
            <p>No sessions found.</p>
          ) : (
            <ul className="session-list">
              {sessions.map((session) => (
                <li key={session._id} className="session-item">
                  <h3>{session.topic}</h3>
                  <p>Date: {new Date(session.date).toLocaleDateString()}</p>
                  <p>Status: {session.status}</p>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Resources Section */}
        <section className="resources-section">
          <h2>Recommended Resources</h2>
          {resources.length === 0 ? (
            <p>No resources available at the moment.</p>
          ) : (
            <ul className="resources-list">
              {resources.map((resource) => (
                <li key={resource._id} className="resource-item">
                  <a href={`/resource/${resource.slug}`}>{resource.title}</a>
                  <p>{resource.description}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </Layout>
  );
};

export default MyPage;