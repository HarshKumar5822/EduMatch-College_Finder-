import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './myprofile.css';

const MyProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const username = localStorage.getItem('username');
      if (!username) {
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(`http://localhost:5000/api/user/profile/${username}`);
        setUser(response.data.user);
      } catch (error) {
        console.error('Failed to fetch user data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User not found.</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img src="https://via.placeholder.com/150" alt="Profile" className="profile-picture" />
        <h1>{user.fullName}</h1>
        <p>{user.email}</p>
      </div>
      <div className="profile-content">
        <h2>About Me</h2>
        <p>Username: {user.username}</p>
        <p>Phone Number: {user.phoneNumber}</p>
        <p>Gender: {user.gender}</p>
      </div>
    </div>
  );
};

export default MyProfile; 