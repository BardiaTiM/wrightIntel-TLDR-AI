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

// Start server
app.listen(port, () => {
    console.log("Node application listening on port " + port);
})