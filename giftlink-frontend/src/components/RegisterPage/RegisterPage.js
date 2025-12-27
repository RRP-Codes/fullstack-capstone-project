import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Task 3
import { useAppContext } from '../../context/AuthContext'; // Task 2
import { urlConfig } from '../../config'; // Task 1

import './RegisterPage.css';

function RegisterPage() {
    // Form states
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Task 4: State for error message
    const [showerr, setShowerr] = useState('');

    // Task 5: Local variables
    const navigate = useNavigate();
    const { setIsLoggedIn } = useAppContext();

    // Task 6–8: handle registration
    const handleRegister = async () => {
        try {
            const response = await fetch(`${urlConfig.backendUrl}/api/auth/register`, {
                method: 'POST', // Task 6
                headers: {     // Task 7
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ // Task 8
                    firstName,
                    lastName,
                    email,
                    password,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setShowerr(errorData.message || 'Registration failed');
                return;
            }

            // Successful registration
            setIsLoggedIn(true);
            navigate('/app/dashboard'); // Redirect after success
        } catch (e) {
            console.log("Error fetching details: " + e.message);
            setShowerr('Network error, please try again');
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <div className="register-card p-4 border rounded">
                        <h2 className="text-center mb-4 font-weight-bold">Register</h2>

                        {showerr && (
                            <div className="alert alert-danger">{showerr}</div>
                        )}

                        <div className="mb-3">
                            <label htmlFor="firstName" className="form-label">FirstName</label>
                            <input
                                id="firstName"
                                type="text"
                                className="form-control"
                                placeholder="Enter your firstName"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="lastName" className="form-label">LastName</label>
                            <input
                                id="lastName"
                                type="text"
                                className="form-control"
                                placeholder="Enter your lastName"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                id="email"
                                type="text"
                                className="form-control"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                id="password"
                                type="password"
                                className="form-control"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button
                            className="btn btn-primary w-100 mb-3"
                            onClick={handleRegister}
                        >
                            Register
                        </button>

                        <p className="mt-4 text-center">
                            Already a member? <a href="/app/login" className="text-primary">Login</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;
