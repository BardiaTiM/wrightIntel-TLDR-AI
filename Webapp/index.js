/** Required modules. */
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const mongoDB = require('connect-mongo');
const bcrypt = require('bcrypt');
const joi = require('joi');
/** End of required modules. */

const port = 4056;
var saltRounds = 12;
const images = ['marmot1.gif', 'marmot2.gif', 'marmot3.gif']
const expireTime = 60 * 60 * 1000;
const app = express();

/** Secret Info. */
const mongodb_host = process.env.MONGODB_HOST;
const mongodb_user = process.env.MONGODB_USER;
const mongodb_password = process.env.MONGODB_PASSWORD;
const mongodb_database = process.env.MONGODB_DATABASE;
const mongodb_secretSession = process.env.MONGODB_SESSION_SECRET;
const nodeSecretSession = process.env.NODE_SESSION_SECRET;
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

/** Landing page. */
app.get('/', (req, res) => {
    var html;
    if (!req.session.authenticated) {
        html = `
        <h1>Welcome</h1>
        <button onclick="window.location.href='/login'">Login</button><br/>
        <button onclick="window.location.href='/signup'">Sign up</button>`;
    res.send(html);
    } else {
        html = `
        <h1>Welcome</h1>
        <p>Hello, ${req.session.username}!</p>
        <button onclick="window.location.href='/members'">Go to Members Area</button><br/>
        <button onclick="window.location.href='/logout'">Logout</button>`;
    res.send(html);
    }
})

/** Sign up page. */
app.get('/signup', (req, res) => {
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


/** Sign up validation. */
app.post('/submitUser', async (req,res) => {
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
        res.send(`<h1 style='color:darkred;'>WARNING: NOSQL INJECTION ATTACK DETECTED!</h1>
            <button onclick='window.location.href=\"/\"'>Home page</button>`);
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

/** Login page. */
app.get('/login', (req, res) => {
    var html = `
        <h1>Login</h1>
        <p>Enter username and password</p>
        <form action='/submitLogin' method='post'>
        <input name='email' type='text' placeholder='email'><br/>
        <input name='password' type='password' placeholder='password'><br/>
        <button>Submit</button>
        </form>`;
    res.send(html);
});

/** Login validation. */
app.post('/submitLogin', async (req,res) => {
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
        res.send(`<h1 style='color:darkred;'>WARNING: NOSQL INJECTION ATTACK DETECTED!</h1>
            <button onclick='window.location.href=\"/\"'>Home page</button>`);
	   return;
	}
    // Find user details in database from email
	const result = await userCollection.find({email: email}).project({username: 1, password: 1, _id: 1}).toArray();
    
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
		req.session.authenticated = true;
		req.session.username = result[0].username;
		req.session.cookie.maxAge = expireTime;

		res.redirect('/members');
		return;
    // Incorrect password
	} else {
        console.log("incorrect password");
        html = `<h1>Login error</h1><p>Incorrect password</p><a href='/login'>Try again</a>`;
        res.send(html);
        return;
	}
});

/** Members page. */
app.get('/members', (req, res) => {
    if (!req.session.authenticated) {
        res.redirect('/login');
    }
    var image = images[Math.floor(Math.random() * images.length)];
    var imageURL = image;
    var html = `
    <h1>Members only</h1>
    <h2>Hello, ${req.session.username}</h2>
    <img src="${imageURL}" alt="random image">
    <button onclick="window.location.href='/logout'">Logout</button>
    `;
    res.send(html);
});

/** Logout page. */
app.get('/logout', (req,res) => {
	req.session.destroy();
    var html = `
    <h1>Logout</h1>
    <p>You are logged out.</p>
    <button onclick="window.location.href='/'">Home page</button>
    `;
    res.send(html);
});

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