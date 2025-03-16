import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import { useAuth } from '../context/auth';
import { Alert, Button, ListGroup } from 'react-bootstrap';
import axios from 'axios';

const Dashboard = () => {
  const [auth] = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('/api/v1/post/notifications', {
          headers: { Authorization: `Bearer ${auth.token}` },
        });
        setNotifications(response.data.notifications);
      } catch (err) {
        setError('Failed to fetch notifications. Please try again later.');
        console.error(err);
      }
    };

    fetchNotifications();
  }, [auth.token]);

  const markNotificationsAsRead = async () => {
    try {
      await axios.put('/api/v1/post/notifications/mark-as-read', {}, {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      setNotifications(notifications.map(notification => ({ ...notification, read: true })));
    } catch (err) {
      setError('Failed to mark notifications as read. Please try again later.');
      console.error(err);
    }
  };

  return (
    <Layout title={'Dashboard - Skill Barter'}>
      <div className='container-fluid m-3 p-3'>
        <h1>Dashboard</h1>
        {error && <Alert variant="danger">{error}</Alert>}
        <h2>Notifications</h2>
        <ListGroup>
          {notifications.length > 0 ? (
            notifications.map((notification, index) => (
              <ListGroup.Item key={index} variant={notification.read ? 'light' : 'warning'}>
                {notification.message}
              </ListGroup.Item>
            ))
          ) : (
            <Alert variant="info">No notifications found.</Alert>
          )}
        </ListGroup>
        <Button variant="primary" onClick={markNotificationsAsRead} className="mt-3">
          Mark All as Read
        </Button>
      </div>
    </Layout>
  );
};

export default Dashboard;
