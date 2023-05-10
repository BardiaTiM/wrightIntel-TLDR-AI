import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Members() {
  const [authenticated, setAuthenticated] = useState(true);
  const [username, setUsername] = useState('');
  const [imageURL, setImageURL] = useState('');
  const images = ['image1.jpg', 'image2.jpg', 'image3.jpg'];
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/members').then(response => {
      setAuthenticated(response.data.authenticated);
      setUsername(response.data.username);

      if(!response.data.authenticated) {
        navigate('/login');
      }
    })
  }, [navigate]);

  
  useEffect(() => {
    // generate random image URL and set to imageURL state
    const randomImage = images[Math.floor(Math.random() * images.length)];
    setImageURL(randomImage);
  }, []);

  if (!authenticated) {
    return null;
  } else {
    return (
      <div>
        <h1>Members only</h1>
        <h2>Hello, {username}</h2>
        <img src={imageURL} alt="random image" />
        <button onClick={() => { window.location.href='/profile' }}>Profile</button>
        <button onClick={() => { window.location.href='/logout' }}>Logout</button>
        <h2>Chat with TLDR</h2>
        <form id='chatbotForm'>
          <input type='text' id='airlineInput' placeholder='Enter airline name...' />
          <input type='text' id='userInput' placeholder='Ask a question...' />
          <input type='submit' value='Ask' />
        </form>
        <div id='chatbotOutput'></div>
        {/* Removed the script tag as it is not needed in a React component */}
      </div>
    );
  }
}

export default Members;
