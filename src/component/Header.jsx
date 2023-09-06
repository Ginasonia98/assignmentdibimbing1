import React, { useState } from 'react';
import axios from 'axios';

const Header = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [activity, setActivity] = useState('');

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  const handleRegisterClick = () => {
    setShowRegisterModal(true);
  };

  const handleModalClose = () => {
    setShowLoginModal(false);
    setShowRegisterModal(false);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleActivityChange = (e) => {
    setActivity(e.target.value);
  };

  const handleLogin = () => {
    // Lakukan validasi email dan password di sini
    // Contoh: if (email === 'user' && password === 'password') { setShowLoginModal(false); }
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:8000/auth/register', {
        name,
        email,
        password,
        activity,
      });

      console.log('Registrasi berhasil:', response.data);

      // Setelah registrasi berhasil, tutup modal
      handleModalClose();
    } catch (error) {
      // Penanganan kesalahan jika registrasi gagal
      console.error('Registrasi gagal:', error);
    }
  };

  return (
    <header className="bg-gray-500 p-4 flex justify-between items-center">
      <div className="text-white text-xl font-bold">Note</div>
      <div className="flex items-center">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2" onClick={handleRegisterClick}>
          Register
        </button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2" onClick={handleLoginClick}>
          Log In
        </button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Log Out</button>
      </div>

      {showLoginModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
          <div className="bg-white p-6 rounded-lg shadow-lg z-10 w-96">
            <h2 className="text-2xl font-semibold mb-4">Log In</h2>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-600">Email:</label>
              <input type="text" id="email" value={email} onChange={handleEmailChange} className="w-full px-4 py-2 border rounded-md" />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-600">Password:</label>
              <input type="password" id="password" value={password} onChange={handlePasswordChange} className="w-full px-4 py-2 border rounded-md" />
            </div>
            <div className="text-right">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={handleLogin}>Login</button>
              <button className="text-gray-500 ml-2" onClick={handleModalClose}>Close</button>
            </div>
          </div>
        </div>
      )}

      {showRegisterModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
          <div className="bg-white p-6 rounded-lg shadow-lg z-10 w-96">
            <h2 className="text-2xl font-semibold mb-4">Register</h2>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-600">Nama:</label>
              <input type="text" id="name" value={name} onChange={handleNameChange} className="w-full px-4 py-2 border rounded-md" />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-600">Email:</label>
              <input type="text" id="email" value={email} onChange={handleEmailChange} className="w-full px-4 py-2 border rounded-md" />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-600">Password:</label>
              <input type="password" id="password" value={password} onChange={handlePasswordChange} className="w-full px-4 py-2 border rounded-md" />
            </div>
            <div className="mb-4">
              <label htmlFor="activity" className="block text-gray-600">Aktivitas:</label>
              <input type="text" id="activity" value={activity} onChange={handleActivityChange} className="w-full px-4 py-2 border rounded-md" />
            </div>
            <div className="text-right">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={handleRegister}>Register</button>
              <button className="text-gray-500 ml-2" onClick={handleModalClose}>Close</button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;




