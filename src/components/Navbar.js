import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

import logo from '../logo.png';

function Navbar() {
  const [click, setClick] = useState(false);
  // const [dropdown, setDropdown] = useState(false);
  // const [dropdown1, setDropdown1] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  // const onMouseEnter = () => {
  //   if (window.innerWidth < 960) {
  //     setDropdown(false);
  //   } else {
  //     setDropdown(true);
  //   }
  // };

  // const onMouseLeave = () => {
  //   if (window.innerWidth < 960) {
  //     setDropdown(false);
  //   } else {
  //     setDropdown(false);
  //   }
  // };

  // const onMouseEnter1 = () => {
  //   if (window.innerWidth < 960) {
  //     setDropdown1(false);
  //   } else {
  //     setDropdown1(true);
  //   }
  // };

  // const onMouseLeave1 = () => {
  //   if (window.innerWidth < 960) {
  //     setDropdown1(false);
  //   } else {
  //     setDropdown1(false);
  //   }
  // };

  return (
    <>
      <nav className='navbar'>
        <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
          <img src={logo} className='logo' alt='logo' />
        </Link>
        <div className='menu-icon' onClick={handleClick}>
          <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className='nav-item'>
            <Link to='/' className='nav-links' onClick={closeMobileMenu}>
              Home
            </Link>
          </li>
          <li className='nav-item'>
            <Link
              to='/dashboard'
              className='nav-links'
              onClick={closeMobileMenu}
            >
              Dashboard
            </Link>
          </li>
          <li
            className='nav-item'
            // onMouseEnter={onMouseEnter}
            // onMouseLeave={onMouseLeave}
          >
            <Link to='/trades' className='nav-links' onClick={closeMobileMenu}>
              Trades
              {/* <i className='fas fa-caret-down' /> */}
            </Link>
            {/* {dropdown && <TradesDropdown />} */}
          </li>
          <li
            className='nav-item'
            // onMouseEnter={onMouseEnter1}
            // onMouseLeave={onMouseLeave1}
          >
            <Link to='/tags' className='nav-links' onClick={closeMobileMenu}>
              Tags
              {/* <i className='fas fa-caret-down' /> */}
            </Link>
            {/* {dropdown1 && <TagsDropdown />} */}
          </li>
          <li className='nav-item'>
            <Link
              to='/importer'
              className='nav-links'
              onClick={closeMobileMenu}
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
