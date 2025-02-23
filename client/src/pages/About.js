import React from 'react';
import Layout from '../components/Layout/Layout';
import './About.css'; // CSS for styling

const About = () => {
  return (
    <Layout title={'About Us - Skill Barter'}>
      <div className="about-container">
        {/* Hero Section */}
        <div className="about-hero">
          <h1>About Skill Barter</h1>
          <p className="intro-text">
            Skill Barter is a revolutionary platform designed to empower freelancers by enabling them to exchange skills and services. Our mission is to create a collaborative community where professionals can grow together.
          </p>
        </div>

        {/* Mission Section */}
        <div className="mission-section">
          <h2>Our Mission</h2>
          <p>
            At Skill Barter, we aim to connect freelancers with opportunities to trade their skills, build their portfolios, and expand their professional networks. We are committed to providing a seamless and secure platform for skill exchange.
          </p>
        </div>

        {/* Vision Section */}
        <div className="vision-section">
          <h2>Our Vision</h2>
          <p>
            We envision a world where freelancers can effortlessly find and exchange services, fostering a supportive and innovative community that drives professional growth and success.
          </p>
        </div>

        {/* Team Section */}
        <div className="team-section">
          <h2>Meet Our Team</h2>
          <div className="team-grid">
            <div className="team-member">
              <img src="/images/john-doe.jpg" alt="John Doe" className="team-member-image" />
              <h3>John Doe</h3>
              <p className="team-member-role">Co-Founder & CEO</p>
              <p className="team-member-bio">
                John has over a decade of experience in freelancing and is passionate about helping professionals achieve their goals.
              </p>
            </div>
            <div className="team-member">
              <img src="/images/jane-smith.jpg" alt="Jane Smith" className="team-member-image" />
              <h3>Jane Smith</h3>
              <p className="team-member-role">Co-Founder & CTO</p>
              <p className="team-member-bio">
                Jane is an expert in software development and is committed to building innovative solutions for freelancers.
              </p>
            </div>
            <div className="team-member">
              <img src="/images/emily-johnson.jpg" alt="Emily Johnson" className="team-member-image" />
              <h3>Emily Johnson</h3>
              <p className="team-member-role">Head of Community</p>
              <p className="team-member-bio">
                Emily specializes in creating engaging and supportive communities for professionals.
              </p>
            </div>
          </div>
        </div>

        {/* Call-to-Action Section */}
        <div className="cta-section">
          <h2>Join the Skill Barter Community</h2>
          <p>Ready to exchange skills and grow your career? Sign up today and become part of our thriving community.</p>
          <a href="/signup" className="cta-button">Sign Up Now</a>
        </div>
      </div>
    </Layout>
  );
};

export default About;