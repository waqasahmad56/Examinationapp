
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faClock, faCircleExclamation, faEyeSlash, faBell, faAddressBook } from '@fortawesome/free-solid-svg-icons';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Result = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [resultData, setResultData] = useState(null);
  const [percentage, setPercentage] = useState(0);
  const [status, setStatus] = useState('');
  const [timeSpentPercentage, setTimeSpentPercentage] = useState(0);
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
    fetchLatestResult();
  }, []);

  const fetchLatestResult = async () => {
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
        console.log('Fetched result data:', data);

        if (Array.isArray(data) && data.length > 0) {
          const latestResult = data[0]; 
          const { totalQuestions, correctAnswers, totalTime, testStartTime, testEndTime } = latestResult;

        
          const percent = totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0;
          setPercentage(percent);
          setStatus(percent >= 50 ? 'Pass' : 'Fail');

          
          const maxTime = 3600; 
          const timeUsedPercentage = totalTime ? (totalTime / maxTime) * 100 : 0;
          setTimeSpentPercentage(timeUsedPercentage);

    
          setResultData({
            ...latestResult,
            testStartTime: new Date(testStartTime).toLocaleString(),
            testEndTime: new Date(testEndTime).toLocaleString(),
          });
        } else {
          console.error('No results found');
        }
      } catch (error) {
        console.error('Error fetching result data:', error);
      }
    } else {
      console.log('No token found');
    }
  };

  const handleBack = () => {
    navigate("/landing");
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (!resultData) {
    return <h1>Loading...</h1>;
  }

  const { totalTime, testStartTime, testEndTime } = resultData;
  const totalTimeFormatted = totalTime ? formatTime(totalTime) : 'N/A';

  return (
    <>
    {isAuthenticated && (
    <div className='main-container d-flex flex-column mt-5'>
      <div className='p-4 rounded-3 bg-white shadow-sm d-flex gap-3'>
        <div className=''>
          <FontAwesomeIcon icon={faBackward} onClick={handleBack} className='iconsizes'/> 
        </div>
        <h5>Example: History Test</h5>
      </div>
      <div className='border p-3 rounded bg-white shadow-sm'>
        <p><b>RESPONDENT</b></p>
        <div className='d-flex gap-2'>
          <FontAwesomeIcon icon={faAddressBook} className='iconsize' />
          <p><b>Waqas Ahmad</b></p>
        </div>
      </div>

      <div className='border p-3 rounded bg-white shadow-sm'>
        <p><b>SUMMARY</b></p>
        <div className='d-flex gap-2'>
          <FontAwesomeIcon icon={faBell} className='iconsize' />
          <p>Dziękuję za rozwiązanie testu Niestety Twój wynik okazał się niewystarczający, aby zaliczyć test...! {status === 'Fail' && 'Niestety Twój wynik okazał się niewystarczający, aby zaliczyć test...'}</p>
        </div>
      </div>

      <div className="d-flex justify-content-between gap-3">
        <div className="border rounded-3 bg-white p-5 shadow-sm formContent">
          <p className='fw-bold'>RESULT</p>
          <h6>Your result is Available</h6>
          <p className='fw-bold text-success mx-0 status '>{status === 'Pass' ? 'Test Passed' : 'Test Failed'}</p>
          <div className='circle'>
            <CircularProgressbar
              value={percentage}
              text={`${Math.round(percentage)}%`}
              styles={buildStyles({
                pathColor: percentage >= 50 ? 'green' : 'red',
                textColor: percentage >= 50 ? 'green' : 'red',
              })}
            />
          </div>
        </div>

        <div className="border rounded-3 bg-white p-5 w-100 shadow-sm">
          <p className='fw-bold'>TIMER</p>
          <div className="tick d-flex align-items-center gap-2">
            <FontAwesomeIcon icon={faClock} className='iconsize' />
            <h5 className='fw-bold '>Total Time</h5>
          </div>
          <p className='mt-3'><b className='text-xxl'>{totalTimeFormatted}</b> / 01:00:00</p>

          <div>
            <div
              className="text-secondary progressbar"
              style={{
                height: '20px',
                width: '100%',
                backgroundColor: '#e0e0e0',
                position: 'relative',
                borderRadius: '5px',
                overflow: 'hidden'
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: `${timeSpentPercentage}%`,
                  backgroundColor: 'black',
                  transition: 'width 0.5s'
                }}
              />
            </div>
          </div>
          <div className='d-flex gap-5 mt-3'>
            <p>Start Time: {testStartTime}</p>
            <p>End Time: {testEndTime}</p>
          </div>
          <p>Date: {new Date(testStartTime).toLocaleDateString()}</p>
        </div>
      </div>

      <div className='border p-3 rounded bg-white shadow-sm'>
        <p><b>QUESTIONS</b></p>
        <div className='d-flex gap-2'>
          <FontAwesomeIcon icon={faEyeSlash} className='iconsize text-light-emphasis' />
          <p className='text-light-emphasis'><b>Correct answers have been hidden by the test owner</b></p>
        </div>
      </div>

      <div className='border p-3 rounded bg-white shadow-sm'>
        <p><b>SUMMARY</b></p>
        <div className='d-flex gap-2'>
          <FontAwesomeIcon icon={faCircleExclamation} className='iconsize text-light-emphasis' />
          <p>FOR FURTHER DETAILS, CONTACT THE TEST OWNER</p>
        </div>
      </div>
    </div>
  )}
  </>
  );
};

export default Result;










