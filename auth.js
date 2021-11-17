#!/usr/bin/env node

const crypto = require('crypto');
const express = require('express');
const mongoose = require('mongoose');
const pbkdf2 = require('pbkdf2');
const passport = require('passport');
const Strategy = require('passport-http').BasicStrategy;
const { Schema } = mongoose;
const user = require('./users');
const app = express();
const port = 8080;

// Connect to the database
// CHANGE THIS TO YOUR DB CONNECTION UNLESS YOU ARE TESTING AGAINST MINE.
// const uri = 'mongodb+srv://mrwoodring:toomanysecrets@cluster0.tcppw.mongodb.net/test'
// try {
// 	mongoose.connect(uri);
// } catch (err){
// 	console.log(err);
// }




const userSchema = new Schema({
	username: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	salt: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		default: Date.now
	}
});
//#!/usr/bin/env node

const validPassword = function (password, salt, hash) {
	let key = pbkdf2.pbkdf2Sync(password, salt, 1, 32, 'sha512');
	if (key.toString('hex') != hash) {
		return false;
	}
	return true;
}

passport.use(new Strategy(
	function (username, password, done) {
		User.findOne({ username: username }, function (err, user) {
			// Can't connect to Db?  We're done.
			if (err) {
				return done(err);
			}
			// User doesn't exist?  We're done.
			if (!user) {
				console.log("No user found.");
				return done(null, false);
			}
			// Got this far?  Check the password.
			if (!validPassword(password, user.salt, user.password)) {
				console.log("Wrong password.");
				return done(null, false);
			}
			// Otherwise, let them in and store the user in req.
			return done(null, user);
		});
	}));

// BE SURE TO CHANGE THIS TO YOUR DESIRED PASSWORD.
let clearText = "BadPassword";
let salt = crypto.randomBytes(32).toString('hex');
let password = pbkdf2.pbkdf2Sync(clearText, salt, 1, 32, 'sha512').toString('hex');

// CHANGE 'MRW' TO THE USERNAME YOU WISH TO USE.
const User = mongoose.model('User', userSchema);
let add = new User({
	username: 'qbone',
	password: password,
	salt: salt
});

const checkAuth = passport.authenticate('basic', { session: false });

app.post('/users', checkAuth, async function (req, res) {
	const user = new User({
		username: req.body.username,
		password: req.body.password
	});
	user.save();
	res.sendStatus(200)
});

app.get('/', function (req, res) {
	res.send(`Simple note-taking app. Version ${VERSION}.`);
});
app.get('/users', passport.authenticate('basic', {session: false}), user.getAll);
app.get('/users', checkAuth, user.getAll);
app.post('/users', checkAuth, user.postOne);
app.delete('/users/:username', checkAuth, user.deleteOne);
add.save();

// Start it up!
// app.listen(port, () => {
// 	console.log(`Up and running on port ${port}.`);
// });
