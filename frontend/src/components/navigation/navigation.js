import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './navigation.css';

const Navigation = ({ setIsAuthenticated }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    navigate('/');
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-brand">
          <h2>🎓 College Predictor</h2>
        </div>

        <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <div className="nav-item">
            <button 
              className={`nav-link ${isActive('/predict') ? 'active' : ''}`}
              onClick={() => navigate('/predict')}
            >
              <span className="nav-icon">🎯</span>
              Predict Colleges
            </button>
          </div>
          
          <div className="nav-item">
            <button 
              className={`nav-link ${isActive('/profile') ? 'active' : ''}`}
              onClick={() => navigate('/profile')}
            >
              <span className="nav-icon">📊</span>
              My Profile
            </button>
          </div>
          
          <div className="nav-item">
            <button 
              className={`nav-link ${isActive('/saved-colleges') ? 'active' : ''}`}
              onClick={() => navigate('/saved-colleges')}
            >
              <span className="nav-icon">📚</span>
              Saved Colleges
            </button>
          </div>
        </div>

        <div className="nav-actions">
          <div className="user-menu">
            <button className="user-avatar">
              <span>👤</span>
            </button>
            <div className="user-dropdown">
              <div className="dropdown-item" onClick={() => navigate('/profile')}>
                <span>👤</span>
                My Profile
              </div>
              <div className="dropdown-item" onClick={() => navigate('/settings')}>
                <span>⚙️</span>
                Settings
              </div>
              <div className="dropdown-divider"></div>
              <div className="dropdown-item" onClick={handleLogout}>
                <span>🚪</span>
                Logout
              </div>
            </div>
          </div>

          <button 
            className={`hamburger ${isMenuOpen ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 