/**
 * Simple Note-Taking App.
 * 
 * @author Quinton Kulak, David Borowicz, Brennan Luttrel
 * @version Fall 2021
 * 
 * VERY basic code to illustrate creating basic routes
 * and handlers.
 *
 */

// Set constants
const VERSION = "1.0.0";

// Import the libraries we need
const express = require('express');
const mongoose = require('mongoose');
const note = require('./note');
const user = require('./user');
const auth = require('./auth');
const passport = require('passport');
const Strategy = require('passport-http').BasicStrategy;


// For hashing passwords.
const pbkdf2 = require('pbkdf2')

// Connect to the database
const uri = 'mongodb+srv://mrwoodring:toomanysecrets@cluster0.tcppw.mongodb.net/test'
try {
	mongoose.connect(uri);
} catch (err){
	console.log(err);
}

const checkAuth = passport.authenticate('basic', { session: false });

// Create the app instance
const app = express();
const port = 8080;

app.use(passport.initialize());

module.exports = { app, mongoose };

// Export any data we will need in other files
module.exports = { app, mongoose };

// Tell express to use the json body parser middleware
app.use(express.json());

// Set routes

app.get('/blah', user.createOne);

app.delete('/', function(req, res){
	res.sendStatus(200);
});

app.put('/', function(req, res){
	res.sendStatus(200);
});

app.patch('/', function(req, res){
	res.sendStatus(200);
});



// Set routes
app.get('/', function(req, res){
res.send(`Simple note-taking app. Version ${VERSION}.`);});

app.get('/notes', checkAuth, note.getAll);

app.get('/notes/:searchTerm', checkAuth, note.getOne);

app.post('/notes', checkAuth, note.postOne)
app.delete('/notes/:userId', note.deleteOne);
app.put('/notes/:userId', note.putOne);
app.patch('/notes/:userId', note.updateOne);

// Start it up!
app.listen(port, () => {
	console.log(`Up and running on port ${port}.`);
});
