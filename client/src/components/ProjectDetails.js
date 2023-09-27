import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './styles/ProjectDetails.css';

function ProjectDetails() {
    const [project, setProject] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        fetch(`http://localhost:5555/projects/${id}`)
            .then(response => response.json())
            .then(data => setProject(data))
            .catch(error => console.error('Error fetching project details:', error));
    }, [id]);

    if (!project) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="project-detail-container">
            <h2 className="project-title">{project.title}</h2>
            <div className="project-image-container">
            <img src={project.image} alt={project.title} className="project-image"/>
            </div>
            <p className="project-description">{project.description}</p>
            <p className="project-budget">Budget: {project.budget}</p>
        </div>
    );
}

export default ProjectDetails;
