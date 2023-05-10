const express = require('express');
const router = express.Router();
const joi = require('joi');
const bcrypt = require('bcrypt');

router.get('/signup', (req, res) => {
  var html = `
  <h1>Sign up</h1>
  <p>Create user</p>
  <form action='/submitUser' method='post'>
  <input name='username' type='text' placeholder='username'><br/>
  <input name='email' type='text' placeholder='email'><br/>
  <input name='password' type='password' placeholder='password'><br/>
  <button>Submit</button>
  </form>`;
res.send(html);
});

router.post('/submitUser', async (req, res) => {
  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password;
  var html;
  // Check for missing fields
  if (!username) {
      html = `<h1>Sign up error</h1><p>Missing username</p><a href='/signup'>Try again</a>`;
      res.send(html);
      return;
  }
  if (!email) {
      html = `<h1>Sign up error</h1><p>Missing email</p><a href='/signup'>Try again</a>`;
      res.send(html);
      return;
  }
  if (!password) {
      html = `<h1>Sign up error</h1><p>Missing password</p><a href='/signup'>Try again</a>`;
      res.send(html);
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
  // Go to members page
  req.session.authenticated = true;
  req.session.username = username;
  req.session.cookie.maxAge = expireTime;
  res.redirect("/members");
});

module.exports = router;
