import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <nav style={{
      background: '#222',
      color: '#fff',
      height: '100vh',
      width: '250px',
      padding: '1rem',
      boxSizing: 'border-box',
    }}>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li>
          <NavLink
            to="/"
            style={({ isActive }) => ({
              color: isActive ? '#00f' : '#fff',
              textDecoration: 'none',
              display: 'block',
              padding: '0.5rem 0'
            })}
          >
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/other"
            style={({ isActive }) => ({
              color: isActive ? '#00f' : '#fff',
              textDecoration: 'none',
              display: 'block',
              padding: '0.5rem 0'
            })}
          >
            Other Page
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
