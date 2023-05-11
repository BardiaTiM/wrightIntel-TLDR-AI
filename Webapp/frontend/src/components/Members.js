import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../services/axiosInstance';

function Members() {
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [imageURL, setImageURL] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axiosInstance.get('/members/authenticate', { withCredentials: true });
        if (response.data.authenticated) {
          setAuthenticated(true);
          setUsername(response.data.username);
        } else {
          navigate('/login');
        }
      } catch (error) {
        console.error(error);
        navigate('/login');
      }
    };

    checkAuth();
  }, [navigate]);

  useEffect(() => {
    const images = ['image1.jpg', 'image2.jpg', 'image3.jpg'];
    const randomImage = images[Math.floor(Math.random() * images.length)];
    setImageURL(randomImage);
  }, []);
  

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleLogoutClick = () => {
    // send to Logout.js
    navigate('/logout');
    
  };
  
  

  const handleChatSubmit = (event) => {
    event.preventDefault();
  };

  const handleChatbotClick = async () => {
    const airlineInput = document.getElementById('airlineInput').value;
    const userInput = document.getElementById('userInput').value;
    
    fetch('http://localhost:5001/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        airline_name: airlineInput,
        input_text: userInput
      })
    })
    .then(response => response.json())
    .then(data => {
      document.getElementById('chatbotOutput').innerText = data.response;
    })
    .catch(error => console.log('Error:', error));
  };

  return (
    <div>
      {authenticated ? (
        <div>
          <h1>Members only</h1>
          <h2>Hello, {username}</h2>
          <img src={imageURL} alt="" />
          <button onClick={handleProfileClick}>Profile</button>
          <button onClick={handleLogoutClick}>Logout</button>
          <h2>Chat with TLDR</h2>
          <form id='chatbotForm' onSubmit={handleChatSubmit}>
            <input type='text' id='airlineInput' placeholder='Enter airline name...' />
            <input type='text' id='userInput' placeholder='Ask a question...' />
            <input type='button' value='Ask' onClick={handleChatbotClick} />
          </form>
          <div id='chatbotOutput'></div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Members;
