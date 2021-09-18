import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

import logo from '../logo.png';

function Navbar() {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const toggleMobileMenu = () => setClick(false);

  return (
    <>
      <nav className='navbar'>
        <Link to='/' className='navbar-logo' onClick={toggleMobileMenu}>
          <img src={logo} className='logo' alt='logo' />
        </Link>
        <div className='menu-icon' onClick={handleClick}>
          <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className='nav-item'>
            <Link to='/' className='nav-links' onClick={toggleMobileMenu}>
              Home
            </Link>
          </li>
          <li className='nav-item'>
            <Link
              to='/dashboard'
              className='nav-links'
              onClick={toggleMobileMenu}
            >
              Dashboard
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/trades' className='nav-links' onClick={toggleMobileMenu}>
              Trades
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/tags' className='nav-links' onClick={toggleMobileMenu}>
              Tags
            </Link>
          </li>
          <li className='nav-item'>
            <Link
              to='/importer'
              className='nav-links'
              onClick={toggleMobileMenu}
            >
              Importer
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
