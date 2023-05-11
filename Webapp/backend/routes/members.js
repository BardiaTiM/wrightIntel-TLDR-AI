const express = require('express');
const router = express.Router();

// Define the images array
const images = ['image1.jpg', 'image2.jpg', 'image3.jpg'];

router.get('/authenticate', (req, res) => {
  if (!req.session.authenticated) {
    res.status(401).json({ error: 'You are not authorized to view this page.' });
  } else {
    var image = images[Math.floor(Math.random() * images.length)];
    var imageURL = image;
    res.status(200).json({ message: `Hello, ${req.session.username}!`, image: `${imageURL}}`, authenticated: true});
  }
});

module.exports = router;
