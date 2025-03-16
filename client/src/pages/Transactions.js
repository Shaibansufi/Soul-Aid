import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import { Table, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useAuth } from '../context/auth';
import './Transactions.css'; // Optional: for custom styles

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);
  const [auth] = useAuth();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('/api/v1/transaction/user', {
          headers: { Authorization: `Bearer ${auth.token}` },
        });
        setTransactions(response.data.transactions);
      } catch (err) {
        setError('Failed to fetch transactions. Please try again later.');
        console.error(err);
      }
    };

    fetchTransactions();
  }, [auth.token]);

  return (
    <Layout title={'Transactions - Skill Barter'}>
      <div className='container-fluid m-3 p-3'>
        <h1>Transactions</h1>
        {error && <Alert variant="danger">{error}</Alert>}
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>From User</th>
              <th>To User</th>
              <th>Post</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length > 0 ? (
              transactions.map(transaction => (
                <tr key={transaction._id}>
                  <td>{transaction.fromUser.name}</td>
                  <td>{transaction.toUser.name}</td>
                  <td>{transaction.post.title}</td>
                  <td>${transaction.amount}</td>
                  <td>{transaction.status}</td>
                  <td>{new Date(transaction.timestamp).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">No transactions found.</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </Layout>
  );
};

export default Transactions;