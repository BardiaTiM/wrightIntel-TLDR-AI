/** Required modules. */
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const mongoDB = require('connect-mongo');
const bcrypt = require('bcrypt');
const joi = require('joi');
const nodemailer = require('nodemailer');

//Modules for React
const cors = require('cors');
const path = require('path');

/** End of required modules. */

const port = 4056;
var saltRounds = 12;
const images = ['marmot1.gif', 'marmot2.gif', 'marmot3.gif']
const expireTime = 60 * 60 * 1000;
const app = express();
app.use(cors()); //Added for React

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
app.use(express.json()); //Added for React

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

// Routes
const indexRoute = require('./routes/home');
const signupRoute = require('./routes/signup');
const loginRoute = require('./routes/login');
const membersRoute = require('./routes/members');
const logoutRoute = require('./routes/logout');
const forgotPasswordRoute = require('./routes/forgotPassword');
const resetPasswordRoute = require('./routes/resetPassword');

app.use('/', indexRoute);
app.use('/signup', signupRoute(userCollection, saltRounds));
app.use('/login', loginRoute(userCollection, expireTime));
app.use('/members', membersRoute);
app.use('/logout', logoutRoute);
app.use('/forgot-password', forgotPasswordRoute);
app.use('/reset-password', resetPasswordRoute);


// Serve React build files
app.use(express.static(path.join(__dirname, '..', 'frontend', 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'build', 'index.html'));
});

// Start server
app.listen(port, () => {
    console.log("Node application listening on port " + port);
});
