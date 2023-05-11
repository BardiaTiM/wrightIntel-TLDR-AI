import React, { useEffect } from 'react';
import axiosInstance from '../services/axiosInstance';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();
  useEffect(() => {
    axiosInstance.post('/logout', {}, { withCredentials: true }).then(() => { // Add withCredentials: true here
      navigate('/');
    });
  }, [navigate]);

  return (
    <div>
      <h1>Logging out...</h1>
    </div>
  );
}

export default Logout;