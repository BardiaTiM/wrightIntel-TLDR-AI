const express = require('express');
const router = express.Router();
const joi = require('joi');
const bcrypt = require('bcrypt');


router.get('/login', (req, res) => {
  res.status(200).send('Login route');
});


module.exports = function(userCollection, expireTime) {
  router.post('/submitLogin', async (req, res) => {
    var email = req.body.email;
    var password = req.body.password;

    // Create a joi object to check both email and password
    const schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().max(20).required()
    });
    const validationResult = schema.validate({email, password});
    if (validationResult.error != null) {
        console.log(validationResult.error);
        res.status(400).json({ error: 'Invalid input' });
        return;
    }
    // Find user details in database from email
    const result = await userCollection.find({email: email}).project({username: 1, password: 1, _id: 1}).toArray();
    
    console.log(result);
    // User not found
    if (result.length != 1) {
      console.log("user not found");
      res.status(400).json({ error: 'User not found' });
      return;
    }
    // Check password
    if (await bcrypt.compare(password, result[0].password)) {
      console.log("correct password");
      req.session.authenticated = true;
      req.session.username = result[0].username;
      req.session.cookie.maxAge = expireTime;

      res.status(200).json({ authenticated: true, username: req.session.username });
      return;
    // Incorrect password
    } else {
      console.log("incorrect password");
      res.status(400).json({ error: 'Incorrect password' });
      return;
    }
  });

return router;
}
