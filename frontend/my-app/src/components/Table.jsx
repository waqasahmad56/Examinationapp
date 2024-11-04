import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTable, faClock, faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

import '../App.css';

const Table = () => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [token, navigate]); 


  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await fetch('http://localhost:3000/exam/getResult', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Fetched results:', data); 
        setResults(data);
      } catch (error) {
        console.error('Error fetching results:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    } else {
      console.log('No token found');
      setIsLoading(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Error: {error}</h1>;
  }

  return (
    <>
    {isAuthenticated && (
    <div className='container mt-5'>
      <div className='d-flex justify-content-between align-items-center mb-3'>
        <h2>
          <FontAwesomeIcon icon={faTable} /> Results Table
        </h2>
      </div>
      <table className='table table-striped'>
        <thead>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Total Questions</th>
            <th scope='col'>Correct Answers</th>
            <th scope='col'>Total Time</th>
            <th scope='col'>Status</th>
            <th scope='col'>Start Time</th>
            <th scope='col'>End Time</th>
          </tr>
        </thead>
        <tbody>
          {results.length > 0 ? (
            results.map((result, index) => (
              <tr key={result._id}>
                <th scope='row'>{index + 1}</th>
                <td>{result.totalQuestions}</td>
                <td>{result.correctAnswers}</td>
                <td>{formatTime(result.totalTime)}</td>
                <td>
                  {result.correctAnswers / result.totalQuestions >= 0.5 ? (
                    <span className='text-success'>
                      <FontAwesomeIcon icon={faCheckCircle} /> Pass
                    </span>
                  ) : (
                    <span className='text-danger'>
                      <FontAwesomeIcon icon={faTimesCircle} /> Fail
                    </span>
                  )}
                </td>
                <td>{new Date(result.testStartTime).toLocaleString()}</td>
                <td>{new Date(result.testEndTime).toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan='7' className='text-center'>No results found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    )}
    </>
  );
};

export default Table;




























































































