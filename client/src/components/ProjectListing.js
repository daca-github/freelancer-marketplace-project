import React, { useState, useEffect } from 'react';
import './styles/ProjectListing.css'

function ProjectListing() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        // Fetch projects from the backend
        fetch('http://localhost:5555/projects')
            .then(response => response.json())
            .then(data => setProjects(data))
            .catch(error => console.error('Error fetching projects:', error));
    }, []);

    return (
        <div className="project-listing-container">
            <h2>Available Projects</h2>
            <div className="projects-grid">
                {projects.map(project => (
                    <div key={project.id} className="project-card">
                        <a href={`/projects/${project.id}`}>
                            <div className="project-image-container">
                                <img className="project-image" src={project.image} alt={project.title} />
                            </div>
                            <h3>{project.title}</h3>
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProjectListing;
