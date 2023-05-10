const express = require('express');
const router = express.Router();

router.get('/logout', (req,res) => {
	req.session.destroy();
    res.status(200).send('Logged out successfully');
});

module.exports = router;
