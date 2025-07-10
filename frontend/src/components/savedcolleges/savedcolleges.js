import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './savedcolleges.css';

const SavedColleges = () => {
  const [savedColleges, setSavedColleges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedColleges = async () => {
      const username = localStorage.getItem('username');
      if (!username) {
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(`http://localhost:5000/api/user/saved-colleges/${username}`);
        setSavedColleges(response.data.savedColleges);
      } catch (error) {
        console.error('Failed to fetch saved colleges', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedColleges();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="saved-colleges-container">
      <h1>Saved Colleges</h1>
      {savedColleges.length > 0 ? (
        <ul className="colleges-list">
          {savedColleges.map(college => (
            <li key={college._id} className="college-item">
              <h2>{college.name}</h2>
              <p>{college.location}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>You haven't saved any colleges yet.</p>
      )}
    </div>
  );
};

export default SavedColleges; 