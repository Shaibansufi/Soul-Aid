import React, { useState } from 'react';
import Layout from '../components/Layout/Layout';
import './Contact.css'; // Assuming you'll have a CSS file for styles

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResponse('');

    try {
      const res = await fetch('https://your-api-endpoint.com/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await res.json();
      setResponse(data.message); // Adjust based on your API response structure
    } catch (err) {
      setError('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
      setName('');
      setEmail('');
      setMessage('');
    }
  };

  return (
    <Layout title={'Contact Us'}>
      <div className="contact-container">
        <h1>Contact Us</h1>
        <form onSubmit={handleSubmit} className="contact-form">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here..."
            required
          />
          
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
        
        {error && <div className="error-message">{error}</div>}
        {response && (
          <div className="success-message">
            <h2>Success!</h2>
            <p>{response}</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Contact;
