import React from 'react';
import Layout from '../components/Layout/Layout';
import './About.css'; // CSS for styling

const About = () => {
  return (
    <Layout title={'About Us'}>
      <div className="about-container">
        <h1>About Internify</h1>
        <p className="intro-text">
          Internify is dedicated to empowering students by providing clear roadmaps for their academic and career journeys. Our goal is to bridge the gap between education and employment by offering comprehensive resources tailored to various academic streams.
        </p>

        <h2>Our Mission</h2>
        <p>
          Our mission is to equip students with the knowledge, skills, and resources they need to succeed in their chosen fields. We strive to be the go-to platform for students seeking guidance on their academic paths and career opportunities.
        </p>

        <h2>Our Vision</h2>
        <p>
          We envision a world where every student has access to personalized educational pathways that lead to successful careers, fostering innovation and growth in diverse industries.
        </p>

        <h2>Our Team</h2>
        <div className="team-container">
          <div className="team-member">
            <h3>John Doe</h3>
            <p>Co-Founder & CEO</p>
            <p>John has over a decade of experience in education technology and is passionate about helping students achieve their goals.</p>
          </div>
          <div className="team-member">
            <h3>Jane Smith</h3>
            <p>Co-Founder & CTO</p>
            <p>Jane is an expert in software development and is committed to building innovative solutions for students.</p>
          </div>
          <div className="team-member">
            <h3>Emily Johnson</h3>
            <p>Head of Content</p>
            <p>Emily specializes in creating educational resources that are both informative and engaging.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
