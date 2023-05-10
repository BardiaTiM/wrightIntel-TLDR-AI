import React, { useEffect } from 'react';
import axios from 'axios';

function Logout() {
  useEffect(() => {
    axios.get('/logout').then(() => {
      window.location.href = '/';
    });
  }, []);

  return (
    <div>
      <h1>Logging out...</h1>
    </div>
  );
}

export default Logout;