import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import { Table, Alert, Button, Form, Modal } from 'react-bootstrap';
import axios from 'axios';
import { useAuth } from '../context/auth';
import './Reports.css'; // Optional: for custom styles

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newReport, setNewReport] = useState({ reportedUser: '', reason: '' });
  const [auth] = useAuth();

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get('/api/user/reports', {
          headers: { Authorization: `Bearer ${auth.token}` },
        });
        setReports(response.data.reports);
      } catch (err) {
        setError('Failed to fetch reports. Please try again later.');
        console.error(err);
      }
    };

    fetchReports();
  }, [auth.token]);

  const handleReportSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/user/reports', newReport, {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      setReports([...reports, response.data.report]);
      setShowModal(false);
      setNewReport({ reportedUser: '', reason: '' });
    } catch (err) {
      setError('Failed to submit report. Please try again later.');
      console.error(err);
    }
  };

  return (
    <Layout title={'Reports - Skill Barter'}>
      <div className='container-fluid m-3 p-3'>
        <h1>Reports</h1>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          Submit New Report
        </Button>
        {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
              <th>Reported By</th>
              <th>Reported User</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {reports.length > 0 ? (
              reports.map(report => (
                <tr key={report._id}>
                  <td>{report.reportedBy.name}</td>
                  <td>{report.reportedUser.name}</td>
                  <td>{report.reason}</td>
                  <td>{report.status}</td>
                  <td>{new Date(report.timestamp).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">No reports found.</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Submit New Report</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleReportSubmit}>
            <Form.Group className="mb-3" controlId="formReportedUser">
              <Form.Label>Reported User</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter reported user's name"
                value={newReport.reportedUser}
                onChange={(e) => setNewReport({ ...newReport, reportedUser: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formReason">
              <Form.Label>Reason</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter reason for reporting"
                value={newReport.reason}
                onChange={(e) => setNewReport({ ...newReport, reason: e.target.value })}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit Report
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Layout>
  );
};

export default Reports;
