import React, { useState, useEffect } from 'react';
import UserMenu from '../components/Layout/UserMenu';
import Layout from '../components/Layout/Layout';
import { Table, Button, Alert, Form, Modal } from 'react-bootstrap';
import { useAuth } from '../context/auth';

const Posts = () => {
  const [auth] = useAuth();
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);

  useEffect(() => {
    // Fetch user posts logic here
    const fetchPosts = async () => {
      // Replace with actual API call
      const userPosts = [
        { id: 1, title: 'Website Design', status: 'Active', visibility: 'public' },
        { id: 2, title: 'Data Analysis', status: 'Completed', visibility: 'private' },
      ];
      setPosts(userPosts);
    };

    fetchPosts();
  }, []);

  const handleDelete = (postId) => {
    // Delete post logic here
    setMessage('Post deleted successfully!');
    setPosts(posts.filter(post => post.id !== postId));
  };

  const handleEdit = (post) => {
    setCurrentPost(post);
    setShowModal(true);
  };

  const handleSave = () => {
    // Save post logic here
    setMessage('Post updated successfully!');
    setShowModal(false);
  };

  return (
    <Layout title={'My Posts - Skill Barter'}>
      <div className='container-fluid m-3 p-3'>
        <div className='row'>
          <div className='col-md-3'>
            <UserMenu />
          </div>
          <div className='col-md-9'>
            <h1>My Posts</h1>
            {message && <Alert variant="success">{message}</Alert>}
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Status</th>
                  <th>Visibility</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.length > 0 ? (
                  posts.map(post => (
                    <tr key={post.id}>
                      <td>{post.title}</td>
                      <td>{post.status}</td>
                      <td>{post.visibility}</td>
                      <td>
                        <Button variant="warning" size="sm" className="me-1" onClick={() => handleEdit(post)}>Edit</Button>
                        <Button variant="danger" size="sm" onClick={() => handleDelete(post.id)}>Delete</Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center">No posts found</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </div>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentPost && (
            <Form>
              <Form.Group className="mb-3" controlId="formTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter post title"
                  value={currentPost.title}
                  onChange={(e) => setCurrentPost({ ...currentPost, title: e.target.value })}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formStatus">
                <Form.Label>Status</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter post status"
                  value={currentPost.status}
                  onChange={(e) => setCurrentPost({ ...currentPost, status: e.target.value })}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formVisibility">
                <Form.Label>Visibility</Form.Label>
                <Form.Control
                  as="select"
                  value={currentPost.visibility}
                  onChange={(e) => setCurrentPost({ ...currentPost, visibility: e.target.value })}
                  required
                >
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                </Form.Control>
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Layout>
  );
};

export default Posts;