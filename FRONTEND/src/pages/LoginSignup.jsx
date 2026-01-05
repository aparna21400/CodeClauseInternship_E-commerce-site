import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../components/Context/ShopContext';
import './loginSignup.css';

const LoginSignup = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { setToken } = useContext(ShopContext);
    const navigate = useNavigate();

    // Step 1: Form data state
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [signupData, setSignupData] = useState({ name: '', email: '', password: '' });

    const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

    useEffect(() => {
        const loginText = document.querySelector(".title-text .login");
        const loginForm = document.querySelector("form.login");
        const loginBtn = document.querySelector("label.login");
        const signupBtn = document.querySelector("label.signup");
        const signupLink = document.querySelector("form .signup-link a");

        const handleSignupClick = () => {
            loginForm.style.marginLeft = "-50%";
            loginText.style.marginLeft = "-50%";
            setIsLogin(false);
        };

        const handleLoginClick = () => {
            loginForm.style.marginLeft = "0%";
            loginText.style.marginLeft = "0%";
            setIsLogin(true);
        };

        const handleSignupLinkClick = (e) => {
            e.preventDefault();
            signupBtn.click();
            return false;
        };

        signupBtn.onclick = handleSignupClick;
        loginBtn.onclick = handleLoginClick;
        signupLink.onclick = handleSignupLinkClick;

        return () => {
            signupBtn.onclick = null;
            loginBtn.onclick = null;
            signupLink.onclick = null;
        };
    }, []);

    // Step 2: Handle Login Submit
    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        console.log('🔐 Login attempt:', loginData.email);

        try {
            const response = await axios.post(
                `${backendUrl}/api/user/login`,
                loginData
            );

            console.log('📩 Login response:', response.data);

            if (response.data.success) {
                // ✅ Store token
                localStorage.setItem('token', response.data.token);
                setToken(response.data.token);
                
                alert('✅ Login successful!');
                navigate('/'); // Redirect to home
            } else {
                setError(response.data.message || 'Login failed');
            }
        } catch (error) {
            console.error('❌ Login error:', error);
            setError(error.response?.data?.message || 'Server error!');
        } finally {
            setLoading(false);
        }
    };

    // Step 3: Handle Signup Submit
    const handleSignupSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        console.log('📝 Signup attempt:', signupData.email);

        try {
            const response = await axios.post(
                `${backendUrl}/api/user/register`,
                signupData
            );

            console.log('📩 Signup response:', response.data);

            if (response.data.success) {
                // ✅ Store token
                localStorage.setItem('token', response.data.token);
                setToken(response.data.token);
                
                alert('✅ Account created successfully!');
                navigate('/'); // Redirect to home
            } else {
                setError(response.data.message || 'Signup failed');
            }
        } catch (error) {
            console.error('❌ Signup error:', error);
            setError(error.response?.data?.message || 'Server error!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="loginSignup">
            <div className="loginsignup-container">
                <div className="form-wrapper">
                    <div className="wrapper">
                        <div className="title-text">
                            <div className="title login">Login</div>
                            <div className="title signup">Signup</div>
                        </div>

                        <div className="form-container">
                            <div className="slide-controls">
                                <input type="radio" name="slide" id="login" defaultChecked />
                                <input type="radio" name="slide" id="signup" />
                                <label htmlFor="login" className="slide login">Login</label>
                                <label htmlFor="signup" className="slide signup">Signup</label>
                                <div className="slider-tab"></div>
                            </div>

                            {error && (
                                <div style={{ 
                                    color: 'red', 
                                    padding: '10px', 
                                    marginTop: '10px',
                                    background: '#ffe6e6',
                                    borderRadius: '5px',
                                    textAlign: 'center'
                                }}>
                                    {error}
                                </div>
                            )}

                            <div className="form-inner">
                                {/* LOGIN FORM */}
                                <form className="login loginsignup-fields" onSubmit={handleLoginSubmit}>
                                    <div className="field">
                                        <input 
                                            type="email" 
                                            placeholder="Email Address" 
                                            value={loginData.email}
                                            onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                                            required 
                                        />
                                    </div>
                                    <div className="field">
                                        <input 
                                            type="password" 
                                            placeholder="Password"
                                            value={loginData.password}
                                            onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                                            required 
                                        />
                                    </div>
                                    <div className="pass-link">Forgot password?</div>
                                    <div className="field btn">
                                        <div className="btn-layer"></div>
                                        <input 
                                            type="submit" 
                                            value={loading ? "Logging in..." : "Login"} 
                                            disabled={loading}
                                        />
                                    </div>
                                    <div className="signup-link loginsignup-login">
                                        Not a member? <a href="">Signup now</a>
                                    </div>
                                </form>

                                {/* SIGNUP FORM */}
                                <form className="signup loginsignup-fields" onSubmit={handleSignupSubmit}>
                                    <div className="field">
                                        <input 
                                            type="text" 
                                            placeholder="Full Name"
                                            value={signupData.name}
                                            onChange={(e) => setSignupData({...signupData, name: e.target.value})}
                                            required 
                                        />
                                    </div>
                                    <div className="field">
                                        <input 
                                            type="email" 
                                            placeholder="Email Address"
                                            value={signupData.email}
                                            onChange={(e) => setSignupData({...signupData, email: e.target.value})}
                                            required 
                                        />
                                    </div>
                                    <div className="field">
                                        <input 
                                            type="password" 
                                            placeholder="Password"
                                            value={signupData.password}
                                            onChange={(e) => setSignupData({...signupData, password: e.target.value})}
                                            required 
                                        />
                                    </div>
                                    <div className="field btn">
                                        <div className="btn-layer"></div>
                                        <input 
                                            type="submit" 
                                            value={loading ? "Signing up..." : "Signup"} 
                                            disabled={loading}
                                        />
                                    </div>
                                    <div className="loginsignup-login">
                                        Already have account? <a href="">Login now</a>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginSignup;