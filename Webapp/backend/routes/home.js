const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  if (!req.session.authenticated) {
    res.json({ authenticated: false });
  } else {
    res.json({ authenticated: true, username: req.session.username });
  }
});

module.exports = router;
