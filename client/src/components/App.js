import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import FreelancerProfile from './FreelancerProfile';
import ProjectListing from './ProjectListing';
import ProjectDetails from './ProjectDetails';
import Login from './Login';
import Register from './Register';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/freelancers/:id" component={FreelancerProfile} />
        <Route path="/projects" exact component={ProjectListing} />
        <Route path="/projects/:id" component={ProjectDetails} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
    </Router>
  );
}

export default App;
