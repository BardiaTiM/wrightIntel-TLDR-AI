const express = require('express');
const router = express.Router();
const joi = require('joi');
const bcrypt = require('bcrypt');

router.get('/signup', (req, res) => {
  res.status(200).send('Signup route');

});

module.exports = function(userCollection, saltRounds) {
  router.post('/submitUser', async (req, res) => {
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    var html;
    // Check for missing fields
    if (!username) {
        res.status(400).json({ error: 'Please enter a username' });
        return;
    }
    if (!email) {
        res.status(400).json({ error: 'Please enter an email' });
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
      password: joi.string().max(20).required()
    });
  // Validate user input
  const validationResult = schema.validate({username, email, password});
  if (validationResult.error != null) {
      console.log(validationResult.error);
      res.status(400).json({ error: 'Potential NoSQL Injection detected.' });
      
        //res.send(`<h1 style='color:darkred;'>WARNING: NOSQL INJECTION ATTACK DETECTED!</h1>
            //<button onclick='window.location.href=\"/\"'>Home page</button>`);
    return;
  }
    // Bcrypt password
    var hashedPassword = await bcrypt.hash(password, saltRounds);
  // Insert user into database
  await userCollection.insertOne({username: username, email: email, password: hashedPassword});
  console.log("Inserted user");
  res.status(200).json({ success: true });
    // Go to members page
    //req.session.authenticated = true;
    //req.session.username = username;
    //req.session.cookie.maxAge = expireTime;
    //res.redirect("/");
  });
return router;
}
