import React from 'react';

function FreelancerProfile() {
  // For now, we'll use static data. Later, this will be fetched from the backend.
  const freelancer = {
    name: "John Doe",
    skills: ["Web Development", "Graphic Design"],
    bio: "Experienced freelancer with a passion for design."
  };

  return (
    <div>
      <h2>{freelancer.name}</h2>
      <p>{freelancer.bio}</p>
      <ul>
        {freelancer.skills.map(skill => <li key={skill}>{skill}</li>)}
      </ul>
    </div>
  );
}

export default FreelancerProfile;
