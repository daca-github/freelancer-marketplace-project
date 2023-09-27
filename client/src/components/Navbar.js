import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPlusSquare, faProjectDiagram, faUserGear } from '@fortawesome/free-solid-svg-icons';

function Navbar() {
  return (
    <nav>
      <Link to="/"><li>Home <FontAwesomeIcon icon={faHome} /></li></Link>
      <Link to="/projects"><li>Projects <FontAwesomeIcon icon={faProjectDiagram} /></li></Link>
      <Link to="/create-project"><li>Create Project <FontAwesomeIcon icon={faPlusSquare} /></li></Link>
      <Link to="/login"><li>Login <FontAwesomeIcon icon={faUserGear} /></li></Link>
      
    </nav>
  );
}

export default Navbar;
