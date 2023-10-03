import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/CreateProject.css';

function CreateProject() {
    const [projects, setProjects] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const currentUser = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = () => {
        axios.get('http://localhost:5555/projects')
            .then(response => {
                setProjects(response.data);
            })
            .catch(error => {
                console.error("Error fetching projects!", error);
            });
    };

    const handlePostProject = (e) => {
        e.preventDefault();
        if (!currentUser || !currentUser.id) {
            console.error("User is not logged in or missing ID!");
            return;
        }

        axios.post('http://localhost:5555/projects', {
            title: title,
            description: description,
            image: image,
            freelancer_id: currentUser.id
        })
        .then(response => {
            console.log(response.data);
            fetchProjects();
            setTitle('');
            setDescription('');
            setImage('');
        })
        .catch(error => {
            console.error("Error posting project!", error);
        });
    };

    const handleDeleteProject = (projectId) => {
        axios.delete(`http://localhost:5555/projects/${projectId}`)
            .then(response => {
                console.log(response.data);
                fetchProjects();
            })
            .catch(error => {
                console.error("Error deleting project!", error);
            });
    };

    return (
        <div>
            <h2>Create a New Project</h2>
            <form onSubmit={handlePostProject}>
                <input 
                    type="text" 
                    placeholder="Project Title" 
                    value={title} 
                    onChange={e => setTitle(e.target.value)} 
                    required 
                />
                <textarea 
                    placeholder="Project Description" 
                    value={description} 
                    onChange={e => setDescription(e.target.value)} 
                    required
                />
                <input 
                    type="text" 
                    placeholder="Image URL" 
                    value={image} 
                    onChange={e => setImage(e.target.value)} 
                    required 
                />
                <button type="submit">Create Project</button>
            </form>
            <h3>Your Projects</h3>
            <ul>
                {projects.map(project => (
                    <li key={project.id}>
                        {project.title} - {project.description}
                        {currentUser && project.freelancer_id === currentUser.id && (
                            <button onClick={() => handleDeleteProject(project.id)}>Delete</button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CreateProject;
