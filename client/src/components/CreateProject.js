import React from 'react';

function CreateProject() {
    return (
        <div>
            <h2>Create a New Project</h2>
            <form>
                <input type="text" placeholder="Project Title" required />
                <textarea placeholder="Project Description" required></textarea>
                <button type="submit">Create Project</button>
            </form>
        </div>
    );
}

export default CreateProject;
