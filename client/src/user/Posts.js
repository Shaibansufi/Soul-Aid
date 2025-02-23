import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import UserMenu from '../components/Layout/UserMenu';
import { useAuth } from '../context/auth';
import { Form, Button, Alert, Card } from 'react-bootstrap';
import axios from 'axios';

const Posts = () => {
    const [auth] = useAuth();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [posts, setPosts] = useState([]);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

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
        try {
            const response = await axios.post('/api/v1/post/create', {
                title,
                content
            }, {
                headers: { Authorization: `Bearer ${auth.token}` }
            });
            setPosts([...posts, response.data.post]);
            setTitle('');
            setContent('');
            setMessage('Post created successfully!');
        } catch (err) {
            setError('Failed to create post. Please try again later.');
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
        </Layout>
    );
};

export default Posts;