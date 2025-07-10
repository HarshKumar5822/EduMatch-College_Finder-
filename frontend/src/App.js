import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import RegistrationForm from './components/register/register';
import LoginForm from './components/login/login';
import EamcetCollegeSuggestions from './components/college prdict/collegepredict';
import Navigation from './components/navigation/navigation';
import MyProfile from './components/myprofile/myprofile';
import Settings from './components/settings/settings';
import SavedColleges from './components/savedcolleges/savedcolleges';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in (you can implement your own logic here)
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="app">
        {isAuthenticated && <Navigation setIsAuthenticated={setIsAuthenticated} />}
        <Routes>
          <Route path='/predict' element={
            isAuthenticated ? <EamcetCollegeSuggestions /> : <Navigate to="/" />
          } />
          <Route path='/register' element={
            !isAuthenticated ? <RegistrationForm /> : <Navigate to="/predict" />
          } />
          <Route path='/profile' element={
            isAuthenticated ? <MyProfile /> : <Navigate to="/" />
          } />
          <Route path='/settings' element={
            isAuthenticated ? <Settings /> : <Navigate to="/" />
          } />
          <Route path='/saved-colleges' element={
            isAuthenticated ? <SavedColleges /> : <Navigate to="/" />
          } />
          <Route path='/' element={
            <LoginForm setIsAuthenticated={setIsAuthenticated} />
          } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;