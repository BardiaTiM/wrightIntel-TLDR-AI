import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Home() {
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    axios.get('/').then(response => {
      setAuthenticated(response.data.authenticated);
      setUsername(response.data.username);
    });
  }, []);
  

  if (!authenticated) {
    return (
      <div>
        <h1>Welcome Mfs</h1>
        <button onClick={() => (window.location.href = '/login')}>Login</button>
        <br />
        <button onClick={() => (window.location.href = '/signup')}>Sign up</button>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Welcome</h1>
        <p>Hello, {username}!</p>
        <button onClick={() => (window.location.href = '/members')}>Go to Members Area</button>
        <br />
        <button onClick={() => (window.location.href = '/logout')}>Logout</button>
      </div>
    );
  }
}

export default Home;
