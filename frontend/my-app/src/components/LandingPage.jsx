
import React,{useEffect,useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCircleCheck} from '@fortawesome/free-solid-svg-icons'
import Form from './Form'
import { useNavigate } from 'react-router-dom'; 
import '../App.css';

const LandingPage = () => {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      // setIsAuthenticated(true);
    }
  }, [token, navigate]); 
  const handlesubmit=()=>{
    navigate("/table");
    
  }
    
  return (

    <>
    {/* {isAuthenticated && ( */}

    <div className='main-container  d-flex flex-column mt-5'>
      <div className='p-4 border d-flex rounded-3 bg-white shadow-sm saveResult'>
        <h5>Example:History test</h5>
       
        <button type="button" onClick={handlesubmit} className="btn btn-outline-success">CheckRecord</button> 
      </div>
      <div className='border p-3 rounded bg-white shadow-sm'>
        <p><b>INSTRUCTIONS</b></p>
        <p>Hello!</p>
        <p>This test consists of 6 questions. You have 60 minutes to solve it.</p>
        <p>Make sure you have enough time and then start the test.</p>
      </div>
      <div className=" d-flex justify-content-between" >
        <div className="border rounded-3 bg-white p-5 shadow-sm" >
           <p><b>Honest Respondent Technology</b>...</p>
       
            <div className=" tick d-flex align-items-center ">
            <FontAwesomeIcon icon={faCircleCheck} className='iconsize'/>
            <h5>Focus on your test only!</h5>
            </div>
            <p>The test is secured with <b>Honest Respondent<br/> Technology</b>. Don't click outside the test tab area. Every<br/> browser tab movement is recorded.</p>
            <p>We recommend disabling background programs, chats<br/> and system notifications before the test, as they can<br/> trigger a test block.</p>
        </div>
        <Form/>

      </div>
    </div>

    {/* )} */}
    </>
  )
}

export default LandingPage
