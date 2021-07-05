import React, { useState, useEffect } from 'react';
import { FaBookOpen, FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { links } from './data';
import './Navbar.css';

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  return (
    <>
      <nav>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo'>
            Journal Champions <FaBookOpen />
          </Link>

          <ul className='nav-menu'>
            {links.map((link) => {
              const { id, destination, name } = link;
              return (
                <li key={id} className='nav-item'>
                  <Link to={destination} className='nav-links'>
                    {name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
