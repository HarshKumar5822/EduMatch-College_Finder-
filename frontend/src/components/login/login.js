import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './login.css'; // Ensure your CSS is linked correctly

function LoginForm({ setIsAuthenticated }) {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState('');

  // Add refs for the inputs
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  // Sync autofilled values on mount
  useEffect(() => {
    const username = usernameRef.current?.value || '';
    const password = passwordRef.current?.value || '';
    if (username || password) {
      setFormData({ username, password });
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    if (errorMessage) {
      setErrorMessage('');
    }
  };

  const handleFocus = (fieldName) => {
    setFocusedField(fieldName);
  };

  const handleBlur = () => {
    setFocusedField('');
  };

  const validateForm = () => {
    if (!formData.username.trim()) {
      setErrorMessage('Username is required');
      return false;
    }
    if (!formData.password.trim()) {
      setErrorMessage('Password is required');
      return false;
    }
    if (formData.password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      const response = await axios.get('http://localhost:5000/login', {
        params: { username: formData.username, password: formData.password },
      });

      if (response.data.success) {
        // Show success message before redirecting
        setErrorMessage('Login successful! Redirecting...');

        // Store authentication token
        localStorage.setItem('authToken', 'dummy-token');
        localStorage.setItem('username', formData.username);

        // Update authentication state
        setIsAuthenticated(true);

        setTimeout(() => {
          window.location.href = '/predict';
        }, 1000);
      } else {
        setErrorMessage('Invalid username or password');
      }
    } catch (error) {
      console.error('Login failed', error);
      setErrorMessage('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="centered-page">
      <div className="center">
        <div className="login-header">
          <h1>Welcome Back!</h1>
          <p>Sign in to access your college predictions</p>
        </div>

        <form onSubmit={handleSubmit} autoComplete="off">
          <div
            className={`txt_field ${
              focusedField === 'username' ? 'focused' : ''
            } ${formData.username ? 'has-value' : ''}`}
          >
            <input
              ref={usernameRef}
              type="text"
              name="username"
              required
              value={formData.username}
              onChange={handleChange}
              onFocus={() => handleFocus('username')}
              onBlur={handleBlur}
              disabled={loading}
              autoComplete="off"
            />
            <span></span>
            <label>Username</label>
            <div className="field-icon">User</div>
          </div>

          <div
            className={`txt_field ${
              focusedField === 'password' ? 'focused' : ''
            } ${formData.password ? 'has-value' : ''}`}
          >
            <input
              ref={passwordRef}
              type={showPassword ? 'text' : 'password'}
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              onFocus={() => handleFocus('password')}
              onBlur={handleBlur}
              disabled={loading}
              autoComplete="new-password"
            />
            <span></span>
            <label>Password</label>
            <button
              type="button"
              className="password-toggle"
              onClick={togglePasswordVisibility}
              disabled={loading}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>

          <div className="pass">
            <span>Forgot Password?</span>
          </div>

          <button
            type="submit"
            className={`submit-btn ${loading ? 'loading' : ''}`}
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="spinner"></div>
                Signing In...
              </>
            ) : (
              'Sign In'
            )}
          </button>

          {errorMessage && (
            <div
              className={`message ${
                errorMessage.includes('successful') ? 'success' : 'error'
              }`}
            >
              <span className="message-icon">
                {errorMessage.includes('successful') ? 'Success:' : 'Warning:'}
              </span>
              {errorMessage}
            </div>
          )}

          <div className="signup_link">
            <span>Don't have an account?</span>
            <a href="/register" className="register-link">
              Create Account
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
