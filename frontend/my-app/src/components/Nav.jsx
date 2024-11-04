import React from 'react'
import { useLocation } from 'react-router-dom';
import '../App.css';

export default function Nav() {
  const location = useLocation();
  const isQuizPage = location.pathname === '/quiz';
 
  return (
    <>
    <div className='width-full p-3 bg-white d-flex gap-5' >
      <img className='logo' src="testportal-logo.svg" alt="waqs" />
      {isQuizPage && (
    
        <p className='mt-3 fw-bold'>Example: History Test</p>
    
       )}

    </div>
    </>
  )
}
