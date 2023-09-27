import React from 'react';
import './styles/ProjectListing.css'

function ProjectDetails() {
  // Static data for now. This will be fetched based on project ID later.
  const project = {
    title: "Build a Website",
    description: "Need a responsive website for my cafe.",
    budget: "$500"
  };

  return (
    <div>
      <h2>{project.title}</h2>
      <p>{project.description}</p>
      <p>Budget: {project.budget}</p>
    </div>
  );
}

export default ProjectDetails;
