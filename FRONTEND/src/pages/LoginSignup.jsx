import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './loginSignup.css';

const LoginSignup = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const loginText = document.querySelector(".title-text .login");
        const loginForm = document.querySelector("form.login");
        const loginBtn = document.querySelector("label.login");
        const signupBtn = document.querySelector("label.signup");
        const signupLink = document.querySelector("form .signup-link a");

        const handleSignupClick = () => {
            loginForm.style.marginLeft = "-50%";
            loginText.style.marginLeft = "-50%";
        };

        const handleLoginClick = () => {
            loginForm.style.marginLeft = "0%";
            loginText.style.marginLeft = "0%";
        };

        const handleSignupLinkClick = () => {
            signupBtn.click();
            return false;
        };

        signupBtn.onclick = handleSignupClick;
        loginBtn.onclick = handleLoginClick;
        signupLink.onclick = handleSignupLinkClick;

        // Cleanup
        return () => {
            signupBtn.onclick = null;
            loginBtn.onclick = null;
            signupLink.onclick = null;
        };
    }, []);

const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const formData = new FormData(e.target);
      const data = Object.fromEntries(formData);

      const payload = isLogin 
        ? { email: data.email, password: data.password }
        : { 
            name: data.name || 'User',
            email: data.email, 
            password: data.password 
          };

      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      
      const response = await axios.post(endpoint, payload);
      
      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        alert('✅ ' + response.data.message);
        window.location.href = '/';
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Server Error!');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

    return (
        <div className="loginSignup">
            <div className="loginsignup-container">
                <div className="form-wrapper"> {/* NEW: Controls form width */}
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

                            <div className="form-inner">
                                <form className="login loginsignup-fields">
                                    <div className="field">
                                        <input type="email" placeholder="Email Address" required />
                                    </div>
                                    <div className="field">
                                        <input type="password" placeholder="Password" required />
                                    </div>
                                    <div className="pass-link">Forgot password?</div>
                                    <div className="field btn">
                                        <div className="btn-layer"></div>
                                        <input type="submit" value="Login" />
                                    </div>
                                    <div className="signup-link loginsignup-login">
                                        Not a member? <a href="">Signup now</a>
                                    </div>
                                </form>

                                <form className="signup loginsignup-fields">
                                    <div className="field">
                                        <input type="email" placeholder="Email Address" required />
                                    </div>
                                    <div className="field">
                                        <input type="password" placeholder="Password" required />
                                    </div>
                                    <div className="field">
                                        <input type="password" placeholder="Confirm password" required />
                                    </div>
                                    <div className="field btn">
                                        <div className="btn-layer"></div>
                                        <input type="submit" value="Signup" />
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
