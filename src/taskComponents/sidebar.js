import React, { useState } from 'react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <button onClick={toggleMenu}>Toggle Menu</button>
      <ul>
        <li>Home</li>
        <li>Data</li>
        <li>Add New Data</li>
      </ul>
    </div>
  );
};

export default Sidebar;
