import React, { useState } from 'react';
import Layout from '../components/Layout/Layout';
import './Ai.css';

const Ai = () => {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResponse('');

    try {
      const res = await fetch('https://your-api-endpoint.com/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
      });

      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await res.json();
      setResponse(data.answer); // Adjust based on your API response structure
    } catch (err) {
      setError('Failed to fetch response. Please try again.');
    } finally {
      setLoading(false);
      setQuestion(''); // Clear the input after submitting
    }
  };

  return (
    <Layout title={'Ask-AI-Us SB'}>
      <div className="ai-container">
        <h1>Ask AI for Help</h1>
        <form onSubmit={handleSubmit} className="ai-form">
          <label htmlFor="question">What do you want to ask?</label>
          <textarea
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Type your question here..."
            required
          />
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Asking...' : 'Ask AI'}
          </button>
        </form>
        {error && <div className="error-message">{error}</div>}
        {response && (
          <div className="ai-response">
            <h2>Response from AI:</h2>
            <p>{response}</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Ai;
