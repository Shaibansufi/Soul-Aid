// import React from 'react';
// import Layout from '../components/Layout/Layout';
// import { useAuth } from '../context/auth';
// import '../styles/HomePage.css';
// // Assuming you will create a CSS file for styling

// const HomePage = () => {
//   const [auth, setAuth] = useAuth();

//   return (
//     <Layout title={'Welcome to Soul Aid'}>
//       <header className="hero">
//         <h1>Soul Aid</h1>
//         <p>Your resource for mental health support, education, and community.</p>
//       </header>

//       <section className="resources">
//         <h2>Explore Resources</h2>
//         <ul>
//           <li><a href="/educational-materials">Educational Materials</a></li>
//           <li><a href="/wellness-tools">Interactive Wellness Tools</a></li>
//           <li><a href="/community-forum">Supportive Community Forum</a></li>
//         </ul>
//       </section>

//       <section className="community">
//         <h2>Join Our Community</h2>
//         <p>Connect with others, share your experiences, and find support.</p>
//         <button onClick={() => alert('Join the Community!')}>Get Involved</button>
//       </section>

//       <section className="auth-info">
//         <h2>User Information</h2>
//         <pre>{JSON.stringify(auth, null, 4)}</pre>
//       </section>
//     </Layout>
//   ); 
// };

// export default HomePage;


// ////////////////////////////////////////////////////import React from 'react';

import React from 'react';
import Layout from '../components/Layout/Layout';
import './HomePage.css'; // CSS for styling

const Home = () => {
  return (
    <Layout title={'Welcome to SkillBarter'}>
      <div className="home-container">
        <h1>Welcome to SkillBarter</h1>
        <p className="intro-text">
          Your gateway to a successful career with tailored roadmaps for various academic streams.
        </p>

        <div className="home-features">
          <h2>What We Offer</h2>
          <div className="features-list">
            <div className="feature-item">
              <span role="img" aria-label="rocket">🚀</span>
              <h3>Customized Roadmaps</h3>
              <p>Navigate your academic journey with confidence.</p>
            </div>
            <div className="feature-item">
              <span role="img" aria-label="books">📚</span>
              <h3>Resource Recommendations</h3>
              <p>Access curated courses and materials tailored to your needs.</p>
            </div>
            <div className="feature-item">
              <span role="img" aria-label="briefcase">💼</span>
              <h3>Career Insights</h3>
              <p>Explore potential careers and required skills for each path.</p>
            </div>
          </div>
        </div>

        <div className="home-streams">
          <h2>Explore Streams</h2>
          <div className="stream-links">
            <a href="/streams/science" className="stream-link">Science</a>
            <a href="/streams/commerce" className="stream-link">Commerce</a>
            <a href="/streams/arts" className="stream-link">Arts</a>
            <a href="/streams/engineering" className="stream-link">Engineering</a>
          </div>
        </div>

        <div className="home-explore">
          <h2>Quick Links</h2>
          <div className="quick-links">
            <a href="/internships" className="quick-link">Internships</a>
            <a href="/courses" className="quick-link">Courses</a>
            <a href="/blog" className="quick-link">Blog</a>
            <a href="/career-guidance" className="quick-link">Career Guidance</a>
            <a href="/testimonials" className="quick-link">Testimonials</a>
            <a href="/about" className="quick-link">About Us</a>
            <a href="/contact" className="quick-link">Contact Us</a>
            <a href="/faq" className="quick-link">FAQ</a>
          </div>
        </div>

        <div className="home-contact">
          <h2>Have Questions?</h2>
          <p>If you need assistance navigating your career path, feel free to <a href="/contact" className="contact-link">contact us</a>.</p>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
