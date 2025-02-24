import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import UserMenu from '../components/Layout/UserMenu';
import { useAuth } from '../context/auth';
import { Form, Button, Alert, Card, Modal } from 'react-bootstrap';
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
    const [bidPostId, setBidPostId] = useState('');
    const [bidAmount, setBidAmount] = useState('');
    const [bidTimeSlot, setBidTimeSlot] = useState('');
    const [bidMessage, setBidMessage] = useState('');

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('/api/v1/post/user', {
                    headers: { Authorization: `Bearer ${auth.token}` }
                });
                setPosts(response.data.posts);
            } catch (err) {
                setError('Failed to fetch posts. Please try again later.');
                console.error(err);
            }
        };

        fetchPosts();
    }, [auth.token]);

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
                    'Authorization': `Bearer ${auth.token}`,
                    'Content-Type': 'multipart/form-data'
                }
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
        } catch (err) {
            setError(err.response.data.message || 'Failed to create post. Please try again later.');
            console.error(err);
        }
    };

    const handleAddBid = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/v1/post/add-bid', {
                postId: bidPostId,
                amount: bidAmount,
                timeSlot: bidTimeSlot,
                message: bidMessage
            }, {
                headers: { Authorization: `Bearer ${auth.token}` }
            });
            setPosts(posts.map(post => post._id === bidPostId ? response.data.post : post));
            setShowBidModal(false);
            setBidPostId('');
            setBidAmount('');
            setBidTimeSlot('');
            setBidMessage('');
            setMessage('Bid added successfully!');
        } catch (err) {
            setError('Failed to add bid. Please try again later.');
            console.error(err);
        }
    };

    return (
        <Layout title={'User Posts - Skill Barter'}>
            <div className='container-fluid m-3 p-3'>
                <div className='row'>
                    <div className='col-md-3'>
                        <UserMenu />
                    </div>
                    <div className='col-md-9'>
                        <h1>User Posts</h1>
                        {message && <Alert variant="success">{message}</Alert>}
                        {error && <Alert variant="danger">{error}</Alert>}
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
                                    placeholder="Enter post category"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formSkills">
                                <Form.Label>Skills</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter skills (comma separated)"
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
                                    placeholder="Enter experience"
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
                                    type="number"
                                    placeholder="Enter expected money"
                                    value={expectedMoney}
                                    onChange={(e) => setExpectedMoney(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formVisibility">
                                <Form.Label>Visibility</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={visibility}
                                    onChange={(e) => setVisibility(e.target.value)}
                                    required
                                >
                                    <option value="public">Public</option>
                                    <option value="private">Private</option>
                                </Form.Control>
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
                        <div className="mt-4">
                            {posts.length > 0 ? (
                                posts.map(post => (
                                    <Card key={post._id} className="mb-3">
                                        <Card.Body>
                                            <Card.Title>{post.title}</Card.Title>
                                            <Card.Text>{post.content}</Card.Text>
                                            <Card.Text><strong>Category:</strong> {post.category}</Card.Text>
                                            <Card.Text><strong>Skills:</strong> {post.skills.join(', ')}</Card.Text>
                                            <Card.Text><strong>Location:</strong> {post.location}</Card.Text>
                                            <Card.Text><strong>Availability:</strong> {post.availability}</Card.Text>
                                            <Card.Text><strong>Experience:</strong> {post.experience}</Card.Text>
                                            <Card.Text><strong>Contact:</strong> {post.contact}</Card.Text>
                                            <Card.Text><strong>Expected Money:</strong> {post.expectedMoney}</Card.Text>
                                            <Card.Text><strong>Visibility:</strong> {post.visibility}</Card.Text>
                                            {post.photo && (
                                                <Card.Img variant="top" src={`/api/v1/post/post-photo/${post._id}`} style={{ maxHeight: '60px', maxWidth:'100'}} />
                                            )}
                                            <Button variant="primary" onClick={() => {
                                                setBidPostId(post._id);
                                                setShowBidModal(true);
                                            }}>Add Bid</Button>
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
            <Modal show={showBidModal} onHide={() => setShowBidModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Bid</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleAddBid}>
                        <Form.Group className="mb-3" controlId="formBidAmount">
                            <Form.Label>Bid Amount</Form.Label>
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
                                placeholder="Enter message"
                                value={bidMessage}
                                onChange={(e) => setBidMessage(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit Bid
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Layout>
    );
};

export default Posts;