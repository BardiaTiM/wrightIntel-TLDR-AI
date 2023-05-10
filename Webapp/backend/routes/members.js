const express = require('express');
const router = express.Router();

router.get('/members', (req, res) => {
  if (!req.session.authenticated) {
    res.status(401).json({ error: 'You are not authorized to view this page.' });
}
var image = images[Math.floor(Math.random() * images.length)];
var imageURL = image;
res.status(200).json({ message: `Hello, ${req.session.username}!`, image: `${imageURL}}`})
});

module.exports = router;

