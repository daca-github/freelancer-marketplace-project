import React from 'react';
import './styles/ProjectListing.css';

function ProjectListing() {
  // Static data for now. This will be fetched from the backend later.
  const projects = [
    { id: 1, title: "Build a Website" },
    { id: 2, title: "Design a Logo" }
  ];

  return (
    <div className="project-listing-container">
      <h2>Available Projects</h2>
      <div className="projects-grid">
        {projects.map(project => (
          <div key={project.id} className="project-card">
            <a href={`/projects/${project.id}`}>{project.title}</a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProjectListing;
