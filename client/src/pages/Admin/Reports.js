import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import { Card, Table, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useAuth } from '../../context/auth';
import './Reports.css'; // Optional: for custom styles

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [error, setError] = useState(null);
  const [auth] = useAuth();

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get('/api/v1/report/all', {
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

  const handleResolve = async (reportId) => {
    try {
      await axios.put(`/api/v1/report/update/${reportId}`, { status: 'resolved' }, {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      setReports(reports.map(report => report._id === reportId ? { ...report, status: 'resolved' } : report));
    } catch (err) {
      setError('Failed to resolve report. Please try again later.');
      console.error(err);
    }
  };

  return (
    <Layout title={'Manage Reports - Skill Barter'}>
      <div className='container-fluid m-3 p-3'>
        <div className='row'>
          <div className='col-md-3'>
            <AdminMenu />
          </div>
          <div className='col-md-9'>
            <Card className='shadow p-4'>
              <Card.Title>Manage Reports</Card.Title>
              {error && <Alert variant="danger">{error}</Alert>}
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Reported By</th>
                    <th>Reported User</th>
                    <th>Reason</th>
                    <th>Status</th>
                    <th>Actions</th>
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
                        <td>
                          <Button variant="success" size="sm" onClick={() => handleResolve(report._id)}>Resolve</Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center">No reports found</td>
                    </tr>
                  )}
                </tbody>
              </Table>
              {reports.length === 0 && (
                <Alert variant="info">
                  No reports available.
                </Alert>
              )}
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Reports;
