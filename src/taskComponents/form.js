import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Modal from './Modal';
import DataDisplay from './DataDisplay';

const Dashboard = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [theme, setTheme] = useState('light');

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`dashboard ${theme}`}>
      <Header toggleTheme={toggleTheme} />
      <Sidebar />
      <main>
        <button onClick={toggleModal}>Add New Data</button>
        <DataDisplay />
        <Modal isOpen={isModalOpen} onClose={toggleModal} />
      </main>
    </div>
  );
};

export default Dashboard;
