import axios from 'axios'
import React, { useState } from 'react'
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Login = ({ setToken }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Try regular auth login first (returns user object with role)
            console.log('Auth attempt: POST', backendUrl + '/api/auth/login');
            const response = await axios.post(backendUrl + '/api/auth/login', { email, password });
            console.log('Auth login response:', response.status, response.data?.message || 'ok');

            if (response.data?.success && response.data.user?.role === 'admin') {
                console.log('Logged in as admin via /api/auth/login');
                setToken(response.data.token);
                return;
            }

            // Fallback to legacy admin login
            console.log('Falling back to admin login: POST', backendUrl + '/api/user/admin');
            const legacy = await axios.post(backendUrl + '/api/user/admin', { email, password });
            console.log('Admin login response:', legacy.status, legacy.data?.message || 'ok');

            if (legacy.data.success) {
                setToken(legacy.data.token)
            } else {
                toast.error(legacy.data.message)
            }

        } catch (error) {
            console.log('Login error:', error?.response?.status, error?.response?.data || error.message);
            // try legacy admin login if auth failed with network/401
            try {
                const legacy = await axios.post(backendUrl + '/api/user/admin', { email, password });
                if (legacy.data.success) {
                    setToken(legacy.data.token)
                } else {
                    toast.error(legacy.data.message || 'Login failed')
                }
            } catch (err2) {
                console.log('Legacy admin login error:', err2?.response?.status, err2?.response?.data || err2.message);
                toast.error(err2?.response?.data?.message || err2.message || 'Login failed')
            }
        }
    }; 
    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f9fafb'
        }}>
            <div style={{
                backgroundColor: 'white',
                padding: '2rem',
                borderRadius: '12px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                width: '100%',
                maxWidth: '400px',
                border: '1px solid #e5e7eb'
            }}>
                <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>
                    Admin Panel
                </h1>

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '16px' }}>
                        <label style={{
                            display: 'block',
                            fontSize: '14px',
                            fontWeight: '600',
                            marginBottom: '8px',
                            color: '#374151'
                        }}>
                            Email Address
                        </label>
                        <input
                            style={{
                                width: '100%',
                                padding: '10px 12px',
                                border: '2px solid #d1d5db',
                                borderRadius: '8px',
                                outline: 'none',
                                fontSize: '14px'
                            }}
                            type="email"
                            placeholder='your@email.com'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                            onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                            required
                        />
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{
                            display: 'block',
                            fontSize: '14px',
                            fontWeight: '600',
                            marginBottom: '8px',
                            color: '#374151'
                        }}>
                            Password
                        </label>
                        <input
                            style={{
                                width: '100%',
                                padding: '10px 12px',
                                border: '2px solid #d1d5db',
                                borderRadius: '8px',
                                outline: 'none',
                                fontSize: '14px'
                            }}
                            type="password"
                            placeholder='Enter your password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                            onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                            required
                        />
                    </div>

                    <button
                        type='submit'
                        style={{
                            width: '100%',
                            padding: '12px',
                            backgroundColor: '#3b82f6',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '16px',
                            fontWeight: '600',
                            cursor: 'pointer'
                        }}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#2563eb'}
                        onMouseOut={(e) => e.target.style.backgroundColor = '#3b82f6'}
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login