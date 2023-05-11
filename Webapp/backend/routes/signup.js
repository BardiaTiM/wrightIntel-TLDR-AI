const express = require('express');
const router = express.Router();
const joi = require('joi');
const bcrypt = require('bcrypt');

router.get('/signup', (req, res) => {
  res.status(200).send('Signup route');

});

module.exports = function(userCollection, saltRounds, expireTime) {
  router.post('/submitUser', async (req, res) => {
    var username = req.body.username;
    var email = req.body.email;
    var phoneNum = req.body.phoneNumber;
    var password = req.body.password;
    // Check for missing fields
    if (!username) {
        res.status(400).json({ error: 'Please enter a username' });
        return;
    }
    if (!email) {
        res.status(400).json({ error: 'Please enter an email' });
        return;
    }
    if (!phoneNum) {
      res.status(400).json({ error: 'Please enter a phone number' });
      return;
  }
    if (!password) {
        res.status(400).json({ error: 'Please enter a password' });
        return;
    }

    //Check for duplicate emails
    const existingUser = await userCollection.findOne({email: email});
    if (existingUser) {
      res.status(400).json({ error: 'An account with this email already exists'});
      return;
    }

    
    // Check for noSQL injection attacks
  const schema = joi.object(
    {
      username: joi.string().alphanum().max(20).required(),
      email: joi.string().email().required(),
      phoneNum: joi.string().max(12).required(),
      password: joi.string().max(20).required()
    });
  // Validate user input
  const validationResult = schema.validate({username, email, phoneNum, password});
  if (validationResult.error != null) {
      console.log(validationResult.error);
      res.status(400).json({ error: 'Potential NoSQL Injection detected.' });
    return;
  }
    // Bcrypt password
    var hashedPassword = await bcrypt.hash(password, saltRounds);
  // Insert user into database
  await userCollection.insertOne({username: username, email: email, phoneNumber: phoneNum, password: hashedPassword});
  console.log("Inserted user");
  // Go to members page
  req.session.authenticated = true;
  req.session.username = username;
  req.session.cookie.maxAge = expireTime;
  res.status(200).json({ success: true, authenticated: true });
  });
return router;
}
