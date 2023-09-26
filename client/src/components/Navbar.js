import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faHome, faProjectDiagram, faRegistered, faUserGear } from '@fortawesome/free-solid-svg-icons';

function Navbar() {
  return (
    <nav>
      <Link to="/"><li>Home <FontAwesomeIcon icon={faHome} /></li></Link>
      <Link to="/projects"><li>Projects <FontAwesomeIcon icon={faProjectDiagram} /></li></Link>
      <Link to="/login"><li>Login <FontAwesomeIcon icon={faUserGear} /></li></Link>
      
    </nav>
  );
}

export default Navbar;
