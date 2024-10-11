// import React from 'react'
// import Layout from '../../components/Layout/Layout'
// import AdminMenu from './../../components/Layout/AdminMenu';



// const CreatePost = () => {
//   return (
//     <Layout title='Create-Post - SB'>
//         <div className='container-fluid m-3 p-3'>
//         <div className='row'>
//           <div className='col-md-3'>
//             <AdminMenu/>
//             </div>  
//           <div className='col-md-9'>
//             <h1>CreatePost</h1>
//             </div>  
//         </div>
//         </div>
//     </Layout>
//   )
// }

// export default CreatePost



// //////////////////////////
import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import AdminMenu from './../../components/Layout/AdminMenu';
import { Card, Button, Form, Alert } from 'react-bootstrap';
import './CreatePost.css'; // Assuming you have custom CSS

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('General');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simulate a post submission
    if (!title || !content) {
      setError('Title and content are required.');
      return;
    }

    setMessage('Post created successfully!');
    setTitle('');
    setContent('');
    setCategory('General');
    setImage(null);
    setError('');
  };

  return (
    <Layout title='Create-Post - SB'>
      <div className='container-fluid m-3 p-3'>
        <div className='row'>
          <div className='col-md-3'>
            <AdminMenu />
          </div>
          <div className='col-md-9'>
            <Card className='p-4 shadow'>
              <h1>Create Post</h1>
              {message && <Alert variant="success">{message}</Alert>}
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formTitle">
                  <Form.Label>Post Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter post title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formContent" className="mt-3">
                  <Form.Label>Content</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    placeholder="Write your post content here..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formCategory" className="mt-3">
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    as="select"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option>General</option>
                    <option>Technology</option>
                    <option>Health</option>
                    <option>Lifestyle</option>
                    <option>Education</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="formImage" className="mt-3">
                  <Form.Label>Upload Image</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="mt-4">
                  Create Post
                </Button>
              </Form>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreatePost;
