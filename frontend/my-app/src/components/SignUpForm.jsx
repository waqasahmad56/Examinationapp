import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'; 

const SignUpForm = () => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null); 
    const navigate = useNavigate();
    

    const handleSubmit = async (e) => {
        
        e.preventDefault();
        setError(null); 

        try {
            const response = await fetch('http://localhost:3000/exam/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ firstname, lastname, email, password }),
            });
        
            if (response.ok) {
                alert("created")
                navigate('/login'); 
            } else {
                setError(response.message || 'An error occurred.');
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
                        <h3 className="card-title text-center mb-4 text-danger">Sign Up</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group mb-3">
                                <label htmlFor="firstname">Firstname</label>
                                <input
                                    type="text"
                                    id="firstname"
                                    className="form-control"
                                    value={firstname}
                                    onChange={(e) => setFirstname(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="lastname">Lastname</label>
                                <input
                                    type="text"
                                    id="lastname"
                                    className="form-control"
                                    value={lastname}
                                    onChange={(e) => setLastname(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    className="form-control"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    autoComplete="off" 
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
                                    autoComplete='off'
                                    required
                                />
                            </div>
                            <div className='d-flex justify-content-center'>
                                <button type="submit" className="btn btn-primary w-10 mt-3">Sign Up</button>
                            </div>
                            {error && <p className="text-danger mt-3">{error}</p>} {/* Display error messages */}
                            <p className="text-center mt-3">
                               Already have an account? <a href="/login">Login</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    
    );
};

export default SignUpForm;
