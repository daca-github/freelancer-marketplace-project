import React from 'react';

function ProjectListing() {
  // Static data for now. This will be fetched from the backend later.
  const projects = [
    { id: 1, title: "Build a Website" },
    { id: 2, title: "Design a Logo" }
  ];

  return (
    <div>
      <h2>Available Projects</h2>
      <ul>
        {projects.map(project => (
          <li key={project.id}>
            <a href={`/projects/${project.id}`}>{project.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProjectListing;
