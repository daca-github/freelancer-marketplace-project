import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="home-container fade-in">
            <h1>Welcome to Freelancer Marketplace</h1>
            <p>Find projects that match your skills, or find the perfect freelancer for your next project.</p>
            <div>
                <Link to="/projects" className="button">Explore Projects</Link>
                <Link to="/login" className="button">Join as a Freelancer</Link>
            </div>
        </div>
    );
}

export default Home;
