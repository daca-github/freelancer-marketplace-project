import React from 'react';
import './styles/ProjectListing.css';

function ProjectListing() {
  // Static data for now. This will be fetched from the backend later.
  const projects = [
    { id: 1, title: "Build a Website", imageUrl: "https://entrepreneurhandbook.co.uk/wp-content/uploads/2019/10/Website-builder.jpg.webp" },
    { id: 2, title: "Design a Logo", imageUrl: "https://res.cloudinary.com/zenbusiness/image/upload/v1670445040/logaster/logaster-2019-04-2.-a-by-nick-matey.jpg" }
  ];
  

  return (
    <div className="project-listing-container">
      <h2>Available Projects</h2>
      <div className="projects-grid">
        {projects.map(project => (
          <div key={project.id} className="project-card">
            <img src={project.imageUrl} alt={project.title} className="project-image" />
            <a href={`/projects/${project.id}`}>{project.title}</a>
          </div>
        ))}
      </div>
    </div>
  );
  
}

export default ProjectListing;
