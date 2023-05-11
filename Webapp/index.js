/** Required modules. */
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const mongoDB = require('connect-mongo');
const bcrypt = require('bcrypt');
const joi = require('joi');
const nodemailer = require('nodemailer');
/** End of required modules. */

/** Important Info. */
const port = 4056;
var saltRounds = 12;
const images = ['marmot1.gif', 'marmot2.gif', 'marmot3.gif']
const expireTime = 60 * 60 * 1000;
const app = express();
app.set('view engine', 'ejs');
/** End of Important Info. */

/** Secret Info. */
const mongodb_host = process.env.MONGODB_HOST;
const mongodb_user = process.env.MONGODB_USER;
const mongodb_password = process.env.MONGODB_PASSWORD;
const mongodb_database = process.env.MONGODB_DATABASE;
const mongodb_secretSession = process.env.MONGODB_SESSION_SECRET;
const nodeSecretSession = process.env.NODE_SESSION_SECRET;
const email_user = process.env.EMAIL_USER;
const email_password = process.env.EMAIL_PASSWORD;
/** End of secret info. */

/** Database connection. */
var {database} = require('./databaseConnection.js');

const userCollection = database.db(mongodb_database).collection('users');

app.use(express.urlencoded({extended: false}));

var mongoStore = mongoDB.create({
	mongoUrl: `mongodb+srv://${mongodb_user}:${mongodb_password}@${mongodb_host}/Sessions`,
	crypto: {
		secret: mongodb_secretSession
	}
})
/** End of database connection. */

app.use(session({
    secret: nodeSecretSession,
	store: mongoStore,
	saveUninitialized: false,
	resave: true
}
))

/** Session Validation Functions. */
function isValidSession(req) {
  if (req.session.authenticated) {
      return true;
  }
  return false;
}

function sessionValidation(req,res,next) {
  if (isValidSession(req)) {
      next();
  }
  else {
      res.redirect('/login');
  }
}
/** End of session validation functions. */

/** Landing page. */
app.get('/', (req, res) => {
    if (!req.session.authenticated) {
      res.render('home', {req: req});
    } else {
      res.redirect('/members')
    }
})

/** Sign up page. */
app.get('/signup', (req, res) => {
  res.render('signup');
});


/** Sign up validation. */
app.post('/signupValidation', async (req,res) => {
    var username = req.body.username;
    var email = req.body.email;
    var phoneNum = req.body.phoneNumber;
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
    if (!phoneNum) {
        html = `<h1>Sign up error</h1><p>Missing phone number</p><a href='/signup'>Try again</a>`;
        res.send(html);
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
        res.status(400).json({ error: 'Potential NoSQL Injection detected.'});
	   return;
	}
    // Bcrypt password
    var hashedPassword = await bcrypt.hash(password, saltRounds);
	// Insert user into database
await userCollection.insertOne({username: username, email: email, password: hashedPassword, phoneNumber: phoneNum});

	console.log("Inserted user");

  // Go to members page
  req.session.authenticated = true;
  req.session.username = username;
  req.session.email = email;
  req.session.phoneNumber = phoneNum;
  req.session.cookie.maxAge = expireTime;
  res.redirect("/chatbot");
});

/** Login page. */
app.get('/login', (req, res) => {
  res.render('login');
});

/** Login validation. */
app.post('/loginValidation', async (req,res) => {
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
        res.status(400).json({ error: 'Potential NoSQL Injection detected.'});
	   return;
	}
    // Find user details in database from email
	const result = await userCollection.find({email: email}).project({username: 1, password: 1, phoneNumber: 1, _id: 1}).toArray();
    
	console.log(result);
    // User not found
	if (result.length != 1) {
		console.log("user not found");
		res.redirect("/login");
		return;
	}
    // Check password
	if (await bcrypt.compare(password, result[0].password)) {
		console.log("correct password");
    // Go to members page
    req.session.authenticated = true;
    req.session.username = result[0].username;
    req.session.email = email;
    req.session.phoneNumber = result[0].phoneNumber;
    req.session.cookie.maxAge = expireTime;
    res.redirect("/chatbot");
		return;
    // Incorrect password
	} else {
        console.log("incorrect password");
        html = `<h1>Login error</h1><p>Incorrect password</p><a href='/login'>Try again</a>`;
        res.send(html);
        return;
	}
});

/** Chatbot page. */
app.get('/chatbot', (req, res) => {
    const marmot1 = "/marmot1.gif";
    const marmot2 = "/marmot2.gif";
    const marmot3 = "/marmot3.gif";
    res.render('chatbot', {req: req, res: res, username: req.session.username, pic1: marmot1, pic2: marmot2, pic3: marmot3});
});

/** Logout page. */
app.get('/logout', (req,res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
     } else {
      res.redirect('/');
    }
  });
});

/** Personal profile page. */
app.get('/profile', (req, res) => {
  if (!req.session.authenticated) {
      res.redirect('/login');
  }
  res.render('profile', {req: req, res: res, username: req.session.username, email: req.session.email, phoneNumber: req.session.phoneNumber});
});


/** Forgot password page. */
app.get('/forgot-password', (req, res) => {
    res.send(`
      <h1>Forgot Password</h1>
      <form method="post" action="/forgot-password">
        <label for="email">Email:</label>
        <input type="email" id="email" name="email">
        <button type="submit">Submit</button>
      </form>
    `);
  });

  
  /* ALL BELOW IMPORTANT FOR PASSWORD REST */


  // Handle forgot password form submission
  app.post('/forgot-password', async (req, res) => {

    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // use SSL
        auth: {
            user: email_user,
            pass: email_password


        }
    });
    
    const { email } = req.body;
  
    // Generate a unique token for the user
    const token = await bcrypt.hash(email + Date.now(), saltRounds);
  
    // Store the token in the database along with the user's email and a timestamp
    await userCollection.updateOne(
      { email },
      { $set: { passwordResetToken: token, passwordResetExpires: Date.now() + 3600000 } }
    );
  
    // Send an email to the user with a link to the password reset page
    const resetUrl = `http://localhost:4056/reset-password?token=${token}`;
    const mailOptions = {
      from: email_user,
      to: email,
      subject: 'Reset your password',
      html: `Click <a href="${resetUrl}">here</a> to reset your password.`
    };
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error(err);
        res.status(500).send('Failed to send email');
      } else {
        res.status(200).send('Email sent');
      }
    });
  });

  // Handle password reset form submission
app.post('/reset-password', async (req, res) => {
    const { token, password } = req.body;
  
    // Find the user with the given token and ensure that the token hasn't expired
    const user = await userCollection.findOne({
      passwordResetToken: token,
      passwordResetExpires: { $gt: Date.now() }
    });
  
    if (!user) {
      return res.status(400).send('Invalid or expired token');
    }
  
    // Update the user's password
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    await userCollection.updateOne(
      { email: user.email },
      { $set: { password: hashedPassword } }
    );
  
    // Remove the password reset token and expiration time from the user's record
    await userCollection.updateOne(
      { email: user.email },
      { $unset: { passwordResetToken: 1, passwordResetExpires: 1 } }
    );
  
    res.status(200).send('Password reset successfully');
  });
  
  // Password reset page
  app.get('/reset-password', async (req, res) => {
    const { token } = req.query;
  
    // Find the user with the given token and ensure that the token hasn't expired
    const user = await userCollection.findOne({
      passwordResetToken: token,
      passwordResetExpires: { $gt: Date.now() }
    });
  
    if (!user) {
      return res.status(400).send('Invalid or expired token');
    }
  
    res.send(`
      <h1>Reset Password</h1>
      <form method="post" action="/reset-password">
        <input type="hidden" name="token" value="${token}">
        <label for="password">New password:</label>
        <input type="password" id="password" name="password">
        <button type="submit">Submit</button>
      </form>
    `);
  });

    /* ALL ABOVE IMPORTANT FOR PASSWORD REST */

app.use(express.static(__dirname + '/public'));

// 404 page
app.get("*", (req,res) => {
	res.status(404);
	res.send("Page not found - 404");
})

// Start server
app.listen(port, () => {
    console.log("Node application listening on port " + port);
})