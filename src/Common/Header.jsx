import React from 'react';

const Header = () => {
  return (
    <header style={{
      background: '#444',
      color: '#fff',
      padding: '1rem',
      textAlign: 'center',
    }}>
      <h1>My App Header</h1>
    </header>
  );
};

export default React.memo(Header);
