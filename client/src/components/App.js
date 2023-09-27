import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import FreelancerProfile from './FreelancerProfile';
import ProjectListing from './ProjectListing';
import ProjectDetails from './ProjectDetails';
import Login from './Login';
import CreateProject from './CreateProject';
import './styles/App.css';
import React, { useState } from 'react';

function App() {
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')));

  return (
    <Router>
      <Navbar user={currentUser} />
      <div className="container">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/freelancers/:id" component={FreelancerProfile} />
          <Route path="/projects" exact component={ProjectListing} />
          <Route path="/projects/:id" component={ProjectDetails} />
          <Route path="/login" render={(props) => <Login {...props} user={currentUser} onUserChange={setCurrentUser} />} />
          <Route path="/create-project" component={CreateProject} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;