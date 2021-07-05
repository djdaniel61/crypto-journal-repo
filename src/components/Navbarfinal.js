import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { linksArray } from './data';
import { FaBars } from 'react-icons/fa';
import logo from '../logo.png';

const Navbarfinal = () => {
  const [showLinks, setShowLinks] = useState(false);
  const linksContainerRef = useRef(null);
  const linksRef = useRef(null);
  const toggleMenu = () => {
    setShowLinks(!showLinks);
  };
  useEffect(() => {
    const linksHeight = linksRef.current.getBoundingClientRect().height;
    if (showLinks) {
      linksContainerRef.current.style.height = `${linksHeight}px`;
    } else {
      linksContainerRef.current.style.height = '0px';
    }
  }, [showLinks]);
  return (
    <nav>
      <div className='navbar'>
        <div className='navbar-header'>
          <img src={logo} className='logo' alt='logo' />
          <button className='nav-toggle' onClick={toggleMenu}>
            <FaBars />
          </button>
        </div>
        <div className='links-container' ref={linksContainerRef}>
          <ul className='links' ref={linksRef}>
            {linksArray.map((link) => {
              const { id, destination, linkName } = link;
              return (
                <li key={id}>
                  <Link to={destination}>{linkName}</Link>
                </li>
              );
            })}
            <li>
              <Link className='signup' to='/signup'>
                Sign Up
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbarfinal;
