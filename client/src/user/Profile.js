import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import UserMenu from '../components/Layout/UserMenu';
import { useAuth } from '../context/auth';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

const Profile = () => {
  const [auth, setAuth] = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [skills, setSkills] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (auth.user) {
      setName(auth.user.name);
      setEmail(auth.user.email);
      setPhone(auth.user.phone);
      setAddress(auth.user.address);
      setSkills(auth.user.skills ? auth.user.skills.join(', ') : '');
    }
  }, [auth.user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put('/api/v1/user/profile', {
        name,
        email,
        phone,
        address,
        skills: skills.split(',').map(skill => skill.trim())
      }, {
        headers: { Authorization: `Bearer ${auth.token}` }
      });
      setAuth({ ...auth, user: response.data.user });
      localStorage.setItem('auth', JSON.stringify({ ...auth, user: response.data.user }));
      setMessage('Profile updated successfully!');
    } catch (err) {
      setError('Failed to update profile. Please try again later.');
      console.error(err);
    }
  };

  return (
    <Layout title={'User Profile - Skill Barter'}>
      <div className='container-fluid m-3 p-3'>
        <div className='row'>
          <div className='col-md-3'>
            <UserMenu />
          </div>
          <div className='col-md-9'>
            <h1>User Profile</h1>
            {message && <Alert variant="success">{message}</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleUpdate}>
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formPhone">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formSkills">
                <Form.Label>Skills</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your skills (comma separated)"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Update Profile
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;