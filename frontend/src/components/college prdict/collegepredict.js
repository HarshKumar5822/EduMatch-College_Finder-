import React, { useState } from "react";
import axios from "axios";
import "./collegepredict.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt, faBookmark } from '@fortawesome/free-solid-svg-icons';

const EamcetCollegeSuggestions = () => {
    const [rank, setRank] = useState("");
    const [caste, setCaste] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showResults, setShowResults] = useState(false);
    const [progress, setProgress] = useState(0);

    // Enhanced college data with official links
    const collegeData = {
        "IIT": { 
            _id: "60c72b2f9b1d8c001f8e4c1a",
            name: "Indian Institute of Technology", 
            location: "Various Locations", 
            rating: 5, 
            acceptance: "Very High", 
            fees: "₹2-3 Lakhs/year",
            website: "https://www.iit.ac.in",
            description: "Premier engineering institution with world-class facilities and research opportunities."
        },
        "NIT": { 
            _id: "60c72b2f9b1d8c001f8e4c1b",
            name: "National Institute of Technology", 
            location: "Various Locations", 
            rating: 4.5, 
            acceptance: "High", 
            fees: "₹1.5-2.5 Lakhs/year",
            website: "https://www.nit.ac.in",
            description: "Excellence in technical education with strong industry connections."
        },
        "OU": { 
            _id: "60c72b2f9b1d8c001f8e4c1c",
            name: "Osmania University", 
            location: "Hyderabad", 
            rating: 4, 
            acceptance: "High", 
            fees: "₹50K-1 Lakh/year",
            website: "https://www.osmania.ac.in",
            description: "Historic university with comprehensive engineering programs."
        },
        "CBIT": { 
            _id: "60c72b2f9b1d8c001f8e4c1d",
            name: "Chaitanya Bharathi Institute of Technology", 
            location: "Hyderabad", 
            rating: 4.2, 
            acceptance: "Medium", 
            fees: "₹1-1.5 Lakhs/year",
            website: "https://www.cbit.ac.in",
            description: "Private engineering college with modern infrastructure and industry focus."
        },
        "JNTUH": { 
            _id: "60c72b2f9b1d8c001f8e4c1e",
            name: "JNTU Hyderabad", 
            location: "Hyderabad", 
            rating: 4.1, 
            acceptance: "Medium", 
            fees: "₹80K-1.2 Lakhs/year",
            website: "https://www.jntuh.ac.in",
            description: "State university known for quality technical education."
        },
        "GITAM": { 
            _id: "60c72b2f9b1d8c001f8e4c1f",
            name: "GITAM University", 
            location: "Visakhapatnam", 
            rating: 3.8, 
            acceptance: "Medium", 
            fees: "₹1.2-1.8 Lakhs/year",
            website: "https://www.gitam.edu",
            description: "Deemed university with comprehensive engineering programs."
        },
        "HITAM": { 
            _id: "60c72b2f9b1d8c001f8e4c20",
            name: "HITAM College", 
            location: "Hyderabad", 
            rating: 3.5, 
            acceptance: "Medium", 
            fees: "₹1-1.5 Lakhs/year",
            website: "https://www.hitam.org",
            description: "Private engineering college with focus on practical learning."
        },
        "VNR": { 
            _id: "60c72b2f9b1d8c001f8e4c21",
            name: "VNR Vignana Jyothi Institute", 
            location: "Hyderabad", 
            rating: 3.9, 
            acceptance: "Medium", 
            fees: "₹1.3-1.7 Lakhs/year",
            website: "https://www.vnrvjiet.ac.in",
            description: "Autonomous institution with strong academic reputation."
        },
        "GRRR": { 
            _id: "60c72b2f9b1d8c001f8e4c22",
            name: "GRIET", 
            location: "Hyderabad", 
            rating: 3.7, 
            acceptance: "Medium", 
            fees: "₹1.1-1.6 Lakhs/year",
            website: "https://www.griet.ac.in",
            description: "Private engineering college with modern facilities."
        },
        "MRUH": { 
            _id: "60c72b2f9b1d8c001f8e4c23",
            name: "MRU University", 
            location: "Hyderabad", 
            rating: 3.4, 
            acceptance: "Medium", 
            fees: "₹90K-1.4 Lakhs/year",
            website: "https://www.mru.edu.in",
            description: "Private university with diverse engineering programs."
        },
        "VASAVI": { 
            _id: "60c72b2f9b1d8c001f8e4c24",
            name: "Vasavi College", 
            location: "Hyderabad", 
            rating: 3.6, 
            acceptance: "Medium", 
            fees: "₹1-1.5 Lakhs/year",
            website: "https://www.vasavi.ac.in",
            description: "Established engineering college with strong alumni network."
        },
        "BVRIT": { 
            _id: "60c72b2f9b1d8c001f8e4c25",
            name: "BVRIT", 
            location: "Hyderabad", 
            rating: 3.3, 
            acceptance: "Medium", 
            fees: "₹80K-1.3 Lakhs/year",
            website: "https://www.bvrit.ac.in",
            description: "Private engineering college with industry-oriented curriculum."
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setProgress(0);
        setShowResults(false);

        if (!rank || !caste) {
            setError("Please fill in all required fields.");
            setLoading(false);
            return;
        }

        // Simulate progress
        const progressInterval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 90) {
                    clearInterval(progressInterval);
                    return 90;
                }
                return prev + 10;
            });
        }, 100);

        try {
            // Post data to the backend and get suggestions
            const response = await axios.post(
                "http://localhost:5000/college-suggestions/college-suggestions", 
                { rank, caste },
                { headers: { 'Content-Type': 'application/json' } }
            );
            setSuggestions(response.data.suggestions);
            setProgress(100);
            setTimeout(() => {
                setShowResults(true);
                setLoading(false);
            }, 500);
        } catch (error) {
            console.error("Error submitting data:", error);
            setError("An error occurred. Please try again later.");
            setLoading(false);
        }
    };

    const getRankCategory = (rank) => {
        if (rank <= 100) return "Excellent";
        if (rank <= 1000) return "Very Good";
        if (rank <= 5000) return "Good";
        if (rank <= 15000) return "Average";
        return "Below Average";
    };

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span key={i} className={`star ${i <= rating ? 'filled' : ''}`}>
                    {'*'}
                </span>
            );
        }
        return stars;
    };

    const handleVisitWebsite = (website) => {
        window.open(website, '_blank', 'noopener,noreferrer');
    };

    const handleApplyNow = (collegeName) => {
        // This could open an application form or redirect to application portal
        alert(`Application portal for ${collegeName} will open in a new window.`);
    };

    const handleSaveCollege = async (collegeId) => {
        const username = localStorage.getItem('username');
        if (!username) {
            alert('You must be logged in to save colleges.');
            return;
        }
        try {
            await axios.post('http://localhost:5000/api/user/save-college', { username, collegeId });
            alert('College saved successfully!');
        } catch (error) {
            console.error('Failed to save college', error);
            alert('Failed to save college. It might already be in your saved list.');
        }
    };

    const renderCollegeCards = () => {
        return suggestions.map((college, index) => (
            <div key={index} className="college-card" style={{animationDelay: `${index * 0.1}s`}}>
                {collegeData[college] ? (
                    <>
                        <div className="college-header">
                            <h3>{collegeData[college].name}</h3>
                            <div className="rating">
                                {renderStars(collegeData[college].rating)}
                                <span className="rating-text">{collegeData[college].rating}/5</span>
                            </div>
                        </div>
                        <div className="college-details">
                            <p><strong>Location:</strong> {collegeData[college].location}</p>
                            <p><strong>Acceptance Rate:</strong> {collegeData[college].acceptance}</p>
                            <p><strong>Fees:</strong> {collegeData[college].fees}</p>
                            <p className="college-description">{collegeData[college].description}</p>
                        </div>
                        <div className="college-actions">
                            <button 
                                className="btn-primary"
                                onClick={() => handleApplyNow(collegeData[college].name)}
                            >
                                Apply Now
                            </button>
                            <button 
                                className="btn-secondary"
                                onClick={() => handleVisitWebsite(collegeData[college].website)}
                            >
                                <FontAwesomeIcon icon={faExternalLinkAlt} /> Visit Website
                            </button>
                            <button className="btn-secondary" onClick={() => handleSaveCollege(collegeData[college]._id)}>
                                <FontAwesomeIcon icon={faBookmark} /> Save
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="college-header">
                            <h3>{college}</h3>
                        </div>
                        <div className="college-details">
                            <p>Additional college option based on your category</p>
                        </div>
                        <div className="college-actions">
                            <button className="btn-primary">Apply Now</button>
                            <button className="btn-secondary">Learn More</button>
                        </div>
                    </>
                )}
            </div>
        ));
    };

    return (
        <div className="centered-page">
            <div className="form-card">
                <h1>EAMCET College Predictor</h1>
                <p>Get personalized college suggestions based on your rank and category</p>
                <h2>Enter Your Details</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="rank">EAMCET Rank</label>
                        <input
                            type="number"
                            id="rank"
                            min="1"
                            max="400000"
                            required
                            value={rank}
                            onChange={(e) => setRank(e.target.value)}
                            placeholder="Enter your rank (1-400000)"
                        />
                        {rank && (
                            <div className="rank-info">
                                <span className={`rank-category ${getRankCategory(parseInt(rank)).toLowerCase().replace(' ', '-')}`}>{getRankCategory(parseInt(rank))}</span>
                            </div>
                        )}
                    </div>
                    <div className="input-group">
                        <label htmlFor="caste">Category</label>
                        <select
                            id="caste"
                            required
                            value={caste}
                            onChange={(e) => setCaste(e.target.value)}
                        >
                            <option value="">--Select Category--</option>
                            <option value="General">General</option>
                            <option value="OBC">OBC</option>
                            <option value="SC">SC</option>
                            <option value="ST">ST</option>
                        </select>
                    </div>
                    <button type="submit" disabled={loading} className="submit-btn">
                        {loading ? (
                            <>
                                <div className="spinner"></div>
                                Analyzing...
                            </>
                        ) : (
                            'Get College Suggestions'
                        )}
                    </button>
                </form>
                {loading && (
                    <div className="progress-container">
                        <div className="progress-bar">
                            <div className="progress-fill" style={{width: `${progress}%`}}></div>
                        </div>
                        <p>Analyzing colleges... {progress}%</p>
                    </div>
                )}
                {error && (
                    <div className="error-message">
                        <span>Warning:</span> {error}
                    </div>
                )}
            </div>
            {showResults && suggestions.length > 0 && (
                <div className="results-section">
                    <div className="results-header">
                        <h2>Recommended Colleges</h2>
                        <p>Based on your rank {rank} and {caste} category</p>
                    </div>
                    <div className="colleges-grid">
                        {renderCollegeCards()}
                    </div>
                    <div className="stats-section">
                        <div className="stat-card">
                            <h3>Your Chances</h3>
                            <p>Based on historical data, you have a <strong>{getRankCategory(parseInt(rank))}</strong> chance of getting admission.</p>
                        </div>
                        <div className="stat-card">
                            <h3>Recommendations</h3>
                            <p>We've analyzed {suggestions.length} colleges that match your profile.</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EamcetCollegeSuggestions;