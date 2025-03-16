import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import UserMenu from '../components/Layout/UserMenu';
import { useAuth } from '../context/auth';
import { Form, Button, Alert, Card, Modal, Table, Collapse } from 'react-bootstrap';
import axios from 'axios';

const Projects = () => {
  const [auth] = useAuth();
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [showBidModal, setShowBidModal] = useState(false);
  const [selectedBid, setSelectedBid] = useState(null);
  const [expandedPostId, setExpandedPostId] = useState(null); // Track which post is expanded
  const [bidAmount, setBidAmount] = useState('');
  const [bidTimeSlot, setBidTimeSlot] = useState('');
  const [bidMessage, setBidMessage] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  // Fetch all posts on component mount
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('/api/v1/post/', {
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

  // Handle bid submission
  const handleAddBid = async (postId) => {
    try {
      const response = await axios.post(
        '/api/v1/post/add-bid',
        {
          postId,
          amount: bidAmount,
          timeSlot: bidTimeSlot,
          message: bidMessage,
        },
        {
          headers: { Authorization: `Bearer ${auth.token}` },
        }
      );
      setPosts(posts.map((post) => (post._id === postId ? response.data.post : post)));
      setBidAmount('');
      setBidTimeSlot('');
      setBidMessage('');
      setMessage('Bid added successfully!');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add bid. Please try again later.');
      console.error(err);
    }
  };

  // Handle rating submission
  const handleAddRating = async (postId) => {
    try {
      const response = await axios.post(
        '/api/v1/post/add-rating',
        {
          postId,
          rating,
        },
        {
          headers: { Authorization: `Bearer ${auth.token}` },
        }
      );
      setPosts(posts.map((post) => (post._id === postId ? response.data.post : post)));
      setRating(0);
      setMessage('Rating added successfully!');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add rating. Please try again later.');
      console.error(err);
    }
  };

  // Handle like submission
  const handleAddLike = async (postId) => {
    try {
      const response = await axios.post(
        '/api/v1/post/add-like',
        {
          postId,
        },
        {
          headers: { Authorization: `Bearer ${auth.token}` },
        }
      );
      setPosts(posts.map((post) => (post._id === postId ? response.data.post : post)));
      setMessage('Like added successfully!');
    } catch (err) {
      setError('Failed to add like. Please try again later.');
      console.error(err);
    }
  };

  // Handle comment submission
  const handleAddComment = async (postId) => {
    try {
      const response = await axios.post(
        '/api/v1/post/add-comment',
        {
          postId,
          comment,
        },
        {
          headers: { Authorization: `Bearer ${auth.token}` },
        }
      );
      setPosts(posts.map((post) => (post._id === postId ? response.data.post : post)));
      setComment('');
      setMessage('Comment added successfully!');
    } catch (err) {
      setError('Failed to add comment. Please try again later.');
      console.error(err);
    }
  };

  // Toggle post details visibility
  const togglePostDetails = (postId) => {
    setExpandedPostId(expandedPostId === postId ? null : postId);
  };

  return (
    <Layout title={'All Posts - Skill Barter'}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1>All Posts</h1>
            {message && <Alert variant="success">{message}</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}

            {/* Display All Posts */}
            <div className="mt-4">
              {posts.length > 0 ? (
                posts.map((post) => (
                  <Card key={post._id} className="mb-3">
                    <Card.Body>
                      {/* Initial View: Post Author, Status, Description, Rating, and Likes */}
                      <div onClick={() => togglePostDetails(post._id)} style={{ cursor: 'pointer' }}>
                        <Card.Title>
                          {post.user?.name || 'Anonymous'} - Status: {post.status}
                        </Card.Title>
                        <Card.Text>{post.content}</Card.Text>
                        <div className="d-flex justify-content-between">
                          <div>
                            <strong>Rating:</strong>{' '}
                            {post.ratings?.length > 0
                              ? (post.ratings.reduce((acc, curr) => acc + curr.rating, 0) / post.ratings.length).toFixed(1)
                              : 'No ratings yet'}
                          </div>
                          <div>
                            <strong>Likes:</strong> {post.likes?.length || 0}
                          </div>
                        </div>
                      </div>

                      {/* Collapsible Post Details */}
                      <Collapse in={expandedPostId === post._id}>
                        <div>
                          {/* Post Photo */}
                          {post.photo && post.photo.data && (
                            <div className="mt-3">
                              <h5>Photo</h5>
                              <img
                                src={`data:${post.photo.contentType};base64,${post.photo.data}`}
                                alt="Post"
                                style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
                              />
                            </div>
                          )}

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
                                  </tr>
                                </thead>
                                <tbody>
                                  {post.bids.map((bid) => (
                                    <tr key={bid._id}>
                                      <td>{bid.user?.name || 'Anonymous'}</td>
                                      <td>${bid.amount}</td>
                                      <td>{bid.timeSlot}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </Table>
                            ) : (
                              <Alert variant="info">No bids available for this post.</Alert>
                            )}
                          </div>

                          {/* Add Bid Section (for other users) */}
                          {auth.user._id !== post.user._id && (
                            <div className="mt-3">
                              <h5>Add Bid</h5>
                              <Form>
                                <Form.Group className="mb-3" controlId="formBidAmount">
                                  <Form.Label>Amount</Form.Label>
                                  <Form.Control
                                    type="number"
                                    placeholder="Enter bid amount"
                                    value={bidAmount}
                                    onChange={(e) => setBidAmount(e.target.value)}
                                    required
                                  />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBidTimeSlot">
                                  <Form.Label>Time Slot</Form.Label>
                                  <Form.Control
                                    type="text"
                                    placeholder="Enter time slot"
                                    value={bidTimeSlot}
                                    onChange={(e) => setBidTimeSlot(e.target.value)}
                                    required
                                  />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBidMessage">
                                  <Form.Label>Message</Form.Label>
                                  <Form.Control
                                    as="textarea"
                                    rows={3}
                                    placeholder="Enter bid message"
                                    value={bidMessage}
                                    onChange={(e) => setBidMessage(e.target.value)}
                                    required
                                  />
                                </Form.Group>

                                <Button
                                  variant="primary"
                                  onClick={() => handleAddBid(post._id)}
                                >
                                  Submit Bid
                                </Button>
                              </Form>
                            </div>
                          )}

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

                          {/* Add Comment Section (for other users) */}
                          {auth.user._id !== post.user._id && (
                            <div className="mt-3">
                              <h5>Add Comment</h5>
                              <Form>
                                <Form.Group className="mb-3" controlId="formComment">
                                  <Form.Label>Comment</Form.Label>
                                  <Form.Control
                                    as="textarea"
                                    rows={3}
                                    placeholder="Enter your comment"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    required
                                  />
                                </Form.Group>

                                <Button
                                  variant="primary"
                                  onClick={() => handleAddComment(post._id)}
                                >
                                  Submit Comment
                                </Button>
                              </Form>
                            </div>
                          )}

                          {/* Add Rating Section (for other users) */}
                          {auth.user._id !== post.user._id && (
                            <div className="mt-3">
                              <h5>Add Rating</h5>
                              <Form>
                                <Form.Group className="mb-3" controlId="formRating">
                                  <Form.Label>Rating (1-5)</Form.Label>
                                  <Form.Control
                                    type="number"
                                    min="1"
                                    max="5"
                                    placeholder="Enter rating"
                                    value={rating}
                                    onChange={(e) => setRating(e.target.value)}
                                    required
                                  />
                                </Form.Group>

                                <Button
                                  variant="primary"
                                  onClick={() => handleAddRating(post._id)}
                                >
                                  Submit Rating
                                </Button>
                              </Form>
                            </div>
                          )}

                          {/* Add Like Section (for other users) */}
                          {auth.user._id !== post.user._id && (
                            <div className="mt-3">
                              <h5>Like</h5>
                              <Button
                                variant="primary"
                                onClick={() => handleAddLike(post._id)}
                              >
                                Like
                              </Button>
                            </div>
                          )}
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

export default Projects;