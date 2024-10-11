import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import './MyPage.css'; // CSS for styling

const MyPage = () => {
  const [internships, setInternships] = useState([]);
  const [counselingSessions, setCounselingSessions] = useState([]);

  // Fetch internship data (mock function)
  useEffect(() => {
    const fetchInternships = async () => {
      // Replace with API call to fetch user-specific internships
      const userInternships = [
        { id: 1, title: 'Software Intern', company: 'Tech Corp', status: 'Applied' },
        { id: 2, title: 'Data Analyst Intern', company: 'Data Solutions', status: 'Interview Scheduled' },
      ];
      setInternships(userInternships);
    };

    const fetchCounselingSessions = async () => {
      // Replace with API call to fetch user-specific counseling sessions
      const userCounseling = [
        { id: 1, date: '2024-10-01', topic: 'Resume Building', status: 'Completed' },
        { id: 2, date: '2024-10-15', topic: 'Interview Preparation', status: 'Upcoming' },
      ];
      setCounselingSessions(userCounseling);
    };

    fetchInternships();
    fetchCounselingSessions();
  }, []);

  return (
    <Layout title={'My Page'}>
      <div className="my-page-container">
        <h1>My Page</h1>

        <section className="internships-section">
          <h2>My Internships</h2>
          {internships.length === 0 ? (
            <p>No internships found.</p>
          ) : (
            <ul className="internship-list">
              {internships.map((internship) => (
                <li key={internship.id} className="internship-item">
                  <h3>{internship.title}</h3>
                  <p>Company: {internship.company}</p>
                  <p>Status: {internship.status}</p>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="counseling-section">
          <h2>My Career Counseling Sessions</h2>
          {counselingSessions.length === 0 ? (
            <p>No counseling sessions found.</p>
          ) : (
            <ul className="counseling-list">
              {counselingSessions.map((session) => (
                <li key={session.id} className="counseling-item">
                  <h3>{session.topic}</h3>
                  <p>Date: {session.date}</p>
                  <p>Status: {session.status}</p>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="resources-section">
          <h2>Recommended Resources</h2>
          <p>Check out these resources to help you with your career journey!</p>
          <ul className="resources-list">
            <li>
              <a href="/resource/resume-guide">Resume Writing Guide</a>
            </li>
            <li>
              <a href="/resource/interview-tips">Interview Preparation Tips</a>
            </li>
            <li>
              <a href="/resource/skill-development">Skill Development Courses</a>
            </li>
          </ul>
        </section>
      </div>
    </Layout>
  );
};

export default MyPage;
    