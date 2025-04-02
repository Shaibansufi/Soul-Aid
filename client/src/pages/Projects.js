import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import UserMenu from '../components/Layout/UserMenu';
import { useAuth } from '../context/auth';
import { Form, Button, Alert, Card, Collapse, Table } from 'react-bootstrap';
import axios from 'axios';

const Projects = () => {
  const [auth] = useAuth();
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [expandedPostId, setExpandedPostId] = useState(null); // Track which post is expanded
  const [loading, setLoading] = useState(false); // Loading state for fetching posts

  // Fetch clustered posts on component mount
  useEffect(() => {
    const fetchClusteredPosts = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/api/v1/post/clustered-posts', {
          headers: { Authorization: `Bearer ${auth.token}` },
        });
        setPosts(response.data.posts);
        setMessage('Posts fetched and prioritized based on your interests!');
      } catch (err) {
        if (err.response?.status === 400) {
          setError(err.response.data.message || 'Not enough posts to perform clustering.');
        } else {
          setError('Failed to fetch posts. Please try again later.');
        }
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchClusteredPosts();
  }, [auth.token]);

  // Toggle post details visibility
  const togglePostDetails = (postId) => {
    setExpandedPostId(expandedPostId === postId ? null : postId);
  };

  return (
    <Layout title={'Clustered Posts - Skill Barter'}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1>Posts Based on Your Interests</h1>
            {message && <Alert variant="success">{message}</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}
            {loading && <Alert variant="info">Loading posts...</Alert>}

            {/* Display Clustered Posts */}
            <div className="mt-4">
              {posts.length > 0 ? (
                posts.map((post) => (
                  <Card key={post._id} className="mb-3">
                    <Card.Body>
                      <div onClick={() => togglePostDetails(post._id)} style={{ cursor: 'pointer' }}>
                        <Card.Title>
                          {post.title} - Status: {post.status}
                        </Card.Title>
                        <Card.Text>{post.content}</Card.Text>
                      </div>

                      {/* Collapsible Post Details */}
                      <Collapse in={expandedPostId === post._id}>
                        <div>
                          <div className="mt-3">
                            <h5>Skills Required</h5>
                            <p>{post.skills.join(', ')}</p>
                          </div>
                          <div className="mt-3">
                            <h5>Location</h5>
                            <p>{post.location}</p>
                          </div>
                          <div className="mt-3">
                            <h5>Expected Money</h5>
                            <p>${post.expectedMoney}</p>
                          </div>
                        </div>
                      </Collapse>
                    </Card.Body>
                  </Card>
                ))
              ) : (
                <Alert variant="info">No posts found based on your interests.</Alert>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Projects;