import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import FreelancerProfile from './FreelancerProfile';
import ProjectListing from './ProjectListing';
import ProjectDetails from './ProjectDetails';
import Login from './Login';
import CreateProject from './CreateProject';
import './styles/App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/freelancers/:id" component={FreelancerProfile} />
          <Route path="/projects" exact component={ProjectListing} />
          <Route path="/projects/:id" component={ProjectDetails} />
          <Route path="/login" component={Login} />
          <Route path="/create-project" component={CreateProject} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
