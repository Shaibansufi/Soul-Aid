import React from 'react';
import Layout from '../components/Layout/Layout';
import './HomePage.css'; // CSS for styling

const Home = () => {
  return (
    <Layout title={'Welcome to Skill Barter'}>
      <div className="home-container">
        {/* Hero Section */}
        <div className="hero-section">
          <div className="hero-content">
            <h1>Exchange Skills, Grow Together</h1>
            <p className="hero-text">
              Join a global community of professionals and trade your skills without the need for money. 
              Whether you're a designer, developer, writer, or marketer, Skill Barter connects you with the right people.
            </p>
            <div className="cta-buttons">
              <a href="/register" className="cta-button primary">Get Started</a>
              <a href="/explore" className="cta-button secondary">Explore Skills</a>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="how-it-works">
          <h2>How It Works</h2>
          <div className="steps">
            <div className="step">
              <span className="step-icon">1</span>
              <h3>Create Your Profile</h3>
              <p>Sign up and showcase your skills, experience, and what you're looking for.</p>
            </div>
            <div className="step">
              <span className="step-icon">2</span>
              <h3>Find a Match</h3>
              <p>Browse through skilled professionals and find the perfect match for your needs.</p>
            </div>
            <div className="step">
              <span className="step-icon">3</span>
              <h3>Start Exchanging</h3>
              <p>Agree on terms, exchange skills, and grow your portfolio.</p>
            </div>
          </div>
        </div>

        {/* Skill Categories Section */}
        <div className="skill-categories">
          <h2>Explore Skill Categories</h2>
          <div className="categories-grid">
            <div className="category">
              <span className="category-icon">🎨</span>
              <h3>Design</h3>
              <p>Graphic design, UI/UX, and more.</p>
            </div>
            <div className="category">
              <span className="category-icon">💻</span>
              <h3>Development</h3>
              <p>Web, mobile, and software development.</p>
            </div>
            <div className="category">
              <span className="category-icon">📈</span>
              <h3>Marketing</h3>
              <p>Digital marketing, SEO, and social media.</p>
            </div>
            <div className="category">
              <span className="category-icon">✍️</span>
              <h3>Writing</h3>
              <p>Content writing, copywriting, and editing.</p>
            </div>
            <div className="category">
              <span className="category-icon">📊</span>
              <h3>Consulting</h3>
              <p>Business, finance, and career consulting.</p>
            </div>
            <div className="category">
              <span className="category-icon">🎓</span>
              <h3>Education</h3>
              <p>Tutoring, coaching, and online courses.</p>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="testimonials">
          <h2>What Our Users Say</h2>
          <div className="testimonials-grid">
            <div className="testimonial">
              <img src="/images/user1.jpg" alt="Alex Johnson" className="testimonial-image" />
              <p>"Skill Barter helped me find a designer for my project in no time. Highly recommended!"</p>
              <h4>- Alex Johnson</h4>
            </div>
            <div className="testimonial">
              <img src="/images/user2.jpg" alt="Maria Garcia" className="testimonial-image" />
              <p>"I exchanged my coding skills for marketing services. It's a win-win!"</p>
              <h4>- Maria Garcia</h4>
            </div>
            <div className="testimonial">
              <img src="/images/user3.jpg" alt="David Lee" className="testimonial-image" />
              <p>"The platform is easy to use, and the community is amazing."</p>
              <h4>- David Lee</h4>
            </div>
          </div>
        </div>

        {/* Call-to-Action Section */}
        <div className="cta-section">
          <h2>Ready to Exchange Skills?</h2>
          <p>Join Skill Barter today and start trading your skills with professionals worldwide.</p>
          <a href="/register" className="cta-button primary">Sign Up Now</a>
        </div>
      </div>
    </Layout>
  );
};

export default Home;