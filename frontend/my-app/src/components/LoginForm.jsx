import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/exam/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
  

      if (response.ok) {
        // console.log("data token",data.)
        localStorage.setItem('token', data.token);
        setEmail("");
        navigate('/landing');
      } else {
        setError(data.message || 'An error occurred.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center rounded-3 bg">
        <div className="col-md-8 col-lg-6">
          <div className="card p-4 mt-5 shadow">
            <h3 className="card-title text-center mb-4 text-danger">Login</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-3">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete='off'
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="off" 

                  required
                />
              </div>
              <div className='d-flex justify-content-center'>
              <button type="submit" className="btn btn-primary w-10 mt-3">Login</button>
              </div>
              {error && <p className="text-danger mt-3">{error}</p>}
              <p className="text-center mt-3">
               Don't have an account? <a href="/signup">signup</a>
              </p>
            </form>
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
