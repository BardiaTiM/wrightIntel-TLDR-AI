import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const response = await axios.post('/submitLogin', { email, password });
      if (response.data.authenticated) {
        Navigate('/members');
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.error);
      }
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <br />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <br />
        <button onClick={() => (window.location.href = '/members')}>Submit</button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
);
}

export default Login;
