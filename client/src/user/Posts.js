import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import UserMenu from '../components/Layout/UserMenu';
import { useAuth } from '../context/auth';
import { Form, Button, Alert, Card, Modal, Table, Collapse } from 'react-bootstrap';
import axios from 'axios';

const Posts = () => {
  const [auth] = useAuth();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [skills, setSkills] = useState('');
  const [location, setLocation] = useState('');
  const [availability, setAvailability] = useState('');
  const [experience, setExperience] = useState('');
  const [contact, setContact] = useState('');
  const [expectedMoney, setExpectedMoney] = useState('');
  const [visibility, setVisibility] = useState('public');
  const [photo, setPhoto] = useState(null);
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [showBidModal, setShowBidModal] = useState(false);
  const [selectedBid, setSelectedBid] = useState(null);
  const [showCreatePostModal, setShowCreatePostModal] = useState(false); // For post creation modal
  const [editPostStatus, setEditPostStatus] = useState('');
  const [expandedPostId, setExpandedPostId] = useState(null); // Track which post is expanded

  // Fetch posts on component mount
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('/api/v1/post/user', {
          headers: { Authorization: `Bearer ${auth.token}` },
        });
        setPosts(response.data.posts);
      } catch (err) {
        setError('Failed to fetch posts. Please try again later.');
        console.error(err);
      }
    };

    fetchPosts();
  }, [auth.token]);

  // Handle post creation
  const handleCreatePost = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('category', category);
    formData.append('skills', skills);
    formData.append('location', location);
    formData.append('availability', availability);
    formData.append('experience', experience);
    formData.append('contact', contact);
    formData.append('expectedMoney', expectedMoney);
    formData.append('visibility', visibility);
    if (photo) {
      formData.append('photo', photo);
    }

    try {
      const response = await axios.post('/api/v1/post/create', formData, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setPosts([...posts, response.data.post]);
      setTitle('');
      setContent('');
      setCategory('');
      setSkills('');
      setLocation('');
      setAvailability('');
      setExperience('');
      setContact('');
      setExpectedMoney('');
      setVisibility('public');
      setPhoto(null);
      setMessage('Post created successfully!');
      setError('');
      setShowCreatePostModal(false); // Close the modal after submission
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create post. Please try again later.');
      setMessage('');
      console.error(err);
    }
  };

  // Handle bid actions (accept, reject, hold)
  const handleBidAction = async (action, postId, bidId) => {
    try {
      const endpoint = `/api/v1/post/${action}-bid`;
      const response = await axios.post(
        endpoint,
        { postId, bidId },
        { headers: { Authorization: `Bearer ${auth.token}` } }
      );
      setPosts(posts.map((post) => (post._id === postId ? response.data.post : post)));
      setMessage(`Bid ${action}ed successfully!`);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || `Failed to ${action} bid. Please try again later.`);
      console.error('Error in bid action:', err);
    }
  };

  // Handle post status update
  const handleUpdateStatus = async (postId, status) => {
    try {
      const response = await axios.put(
        `/api/v1/post/update-post/${postId}`,
        { status },
        { headers: { Authorization: `Bearer ${auth.token}` } }
      );
      setPosts(posts.map((post) => (post._id === postId ? response.data.post : post)));
      setMessage('Post status updated successfully!');
    } catch (err) {
      setError('Failed to update post status. Please try again later.');
      console.error(err);
    }
  };

  // Show bid details in a modal
  const handleShowBidDetails = (bid) => {
    setSelectedBid(bid);
    setShowBidModal(true);
  };

  // Toggle post details visibility
  const togglePostDetails = (postId) => {
    setExpandedPostId(expandedPostId === postId ? null : postId);
  };

  return (
    <Layout title={'User Posts - Skill Barter'}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1>User Posts</h1>
            {message && <Alert variant="success">{message}</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}

            {/* Button to Open Post Creation Modal */}
            <Button variant="primary" onClick={() => setShowCreatePostModal(true)}>
              Create New Post
            </Button>

            {/* Post Creation Modal */}
            <Modal show={showCreatePostModal} onHide={() => setShowCreatePostModal(false)} size="lg">
              <Modal.Header closeButton>
                <Modal.Title>Create New Post</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={handleCreatePost}>
                  <Form.Group className="mb-3" controlId="formTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter post title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formContent">
                    <Form.Label>Content</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Enter post content"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formCategory">
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formSkills">
                    <Form.Label>Skills</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter required skills (comma-separated)"
                      value={skills}
                      onChange={(e) => setSkills(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formLocation">
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formAvailability">
                    <Form.Label>Availability</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter availability"
                      value={availability}
                      onChange={(e) => setAvailability(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formExperience">
                    <Form.Label>Experience</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter required experience"
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formContact">
                    <Form.Label>Contact</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter contact information"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formExpectedMoney">
                    <Form.Label>Expected Money</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter expected money"
                      value={expectedMoney}
                      onChange={(e) => setExpectedMoney(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formVisibility">
                    <Form.Label>Visibility</Form.Label>
                    <Form.Select
                      value={visibility}
                      onChange={(e) => setVisibility(e.target.value)}
                      required
                    >
                      <option value="public">Public</option>
                      <option value="private">Private</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formPhoto">
                    <Form.Label>Photo</Form.Label>
                    <Form.Control
                      type="file"
                      onChange={(e) => setPhoto(e.target.files[0])}
                    />
                  </Form.Group>

                  <Button variant="primary" type="submit">
                    Create Post
                  </Button>
                </Form>
              </Modal.Body>
            </Modal>

            {/* Display Existing Posts */}
            <div className="mt-4">
              {posts.length > 0 ? (
                posts.map((post) => (
                  <Card key={post._id} className="mb-3">
                    <Card.Body>
                      <Card.Title onClick={() => togglePostDetails(post._id)} style={{ cursor: 'pointer' }}>
                        {post.title} - Status: {post.status} - Expected Money: ${post.expectedMoney}
                      </Card.Title>

                      {/* Collapsible Post Details */}
                      <Collapse in={expandedPostId === post._id}>
                        <div>
                          <Card.Text>{post.content}</Card.Text>

                          {/* Bid Management Section */}
                          <div className="mt-3">
                            <h5>Bids</h5>
                            {post.bids && post.bids.length > 0 ? (
                              <Table striped bordered hover>
                                <thead>
                                  <tr>
                                    <th>Bidder</th>
                                    <th>Amount</th>
                                    <th>Time Slot</th>
                                    <th>Actions</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {post.bids.map((bid) => (
                                    <tr key={bid._id}>
                                      <td>{bid.user?.name || 'Anonymous'}</td>
                                      <td>${bid.amount}</td>
                                      <td>{bid.timeSlot}</td>
                                      <td>
                                        <Button
                                          variant="link"
                                          onClick={() => handleShowBidDetails(bid)}
                                        >
                                          View Details
                                        </Button>
                                        <Button
                                          variant="success"
                                          size="sm"
                                          onClick={() => handleBidAction('accept', post._id, bid._id)}
                                          className="me-2"
                                        >
                                          Accept
                                        </Button>
                                        <Button
                                          variant="danger"
                                          size="sm"
                                          onClick={() => handleBidAction('reject', post._id, bid._id)}
                                          className="me-2"
                                        >
                                          Reject
                                        </Button>
                                        <Button
                                          variant="warning"
                                          size="sm"
                                          onClick={() => handleBidAction('hold', post._id, bid._id)}
                                        >
                                          Hold
                                        </Button>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </Table>
                            ) : (
                              <Alert variant="info">No bids available for this post.</Alert>
                            )}
                          </div>

                          {/* Comments Section */}
                          <div className="mt-3">
                            <h5>Comments</h5>
                            {post.comments && post.comments.length > 0 ? (
                              post.comments.map((comment) => (
                                <Card key={comment._id} className="mb-2">
                                  <Card.Body>
                                    <Card.Text>
                                      <strong>{comment.user?.name || 'Anonymous'}:</strong> {comment.comment}
                                    </Card.Text>
                                  </Card.Body>
                                </Card>
                              ))
                            ) : (
                              <Alert variant="info">No comments available for this post.</Alert>
                            )}
                          </div>

                          {/* Update Status Section */}
                          <div className="mt-3">
                            <h5>Update Post Status</h5>
                            <Form>
                              <Form.Select
                                value={editPostStatus}
                                onChange={(e) => setEditPostStatus(e.target.value)}
                              >
                                <option value="open">Open</option>
                                <option value="active">Active</option>
                                <option value="closed">Closed</option>
                              </Form.Select>
                              <Button
                                variant="primary"
                                size="sm"
                                onClick={() => handleUpdateStatus(post._id, editPostStatus)}
                                className="mt-2"
                              >
                                Update Status
                              </Button>
                            </Form>
                          </div>
                        </div>
                      </Collapse>
                    </Card.Body>
                  </Card>
                ))
              ) : (
                <Alert variant="info">No posts found.</Alert>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bid Details Modal */}
      <Modal show={showBidModal} onHide={() => setShowBidModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Bid Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedBid && (
            <>
              <p><strong>Bidder:</strong> {selectedBid.user?.name || 'Anonymous'}</p>
              <p><strong>Amount:</strong> ${selectedBid.amount}</p>
              <p><strong>Time Slot:</strong> {selectedBid.timeSlot}</p>
              <p><strong>Message:</strong> {selectedBid.message}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowBidModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Layout>
  );
};

export default Posts;