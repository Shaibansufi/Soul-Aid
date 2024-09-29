import React from 'react';
import Layout from '../components/Layout/Layout';
import { useAuth } from '../context/auth';
import '../styles/HomePage.css';
// Assuming you will create a CSS file for styling

const HomePage = () => {
  const [auth, setAuth] = useAuth();

  return (
    <Layout title={'Welcome to Soul Aid'}>
      <header className="hero">
        <h1>Soul Aid</h1>
        <p>Your resource for mental health support, education, and community.</p>
      </header>

      <section className="resources">
        <h2>Explore Resources</h2>
        <ul>
          <li><a href="/educational-materials">Educational Materials</a></li>
          <li><a href="/wellness-tools">Interactive Wellness Tools</a></li>
          <li><a href="/community-forum">Supportive Community Forum</a></li>
        </ul>
      </section>

      <section className="community">
        <h2>Join Our Community</h2>
        <p>Connect with others, share your experiences, and find support.</p>
        <button onClick={() => alert('Join the Community!')}>Get Involved</button>
      </section>

      <section className="auth-info">
        <h2>User Information</h2>
        <pre>{JSON.stringify(auth, null, 4)}</pre>
      </section>
    </Layout>
  ); 
};

export default HomePage;
