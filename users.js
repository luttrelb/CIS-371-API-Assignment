/**
 * Functions for the note routes.
 * 
 * @author Quinton Kulak, David Borowicz, Brennan Luttrel
 * @version Fall 2021
 */

// Pull in the mongoose library.
const { Router } = require('express');
const mongoose = require('mongoose');

// Grab the Schema object.
const { Schema } = mongoose;

// Make a new Schema for what we wish a Note
// to look like.
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

// "Compile" the Schema into a model.
//const User = mongoose.model('User', userSchema);

// Create the function for getting ALL the notes.
// export it so we can use it in app.js.
exports.getAll = async function(req, res) {
	const users = await User.find({
	});
	res.json(users);
}

//delete one function searches for an Id and deletes that object
//export it so we can use it in app.js
exports.deleteOne = async function(req, res){
	console.log("Found the ID of " + req.params.username);
	
	try {
		let user = await Note.deleteOne({_id: req.params.username });
		// console.log(note);
		if(!user){
			console.log("No user was returned");
		}
		else {
			return res.sendStatus(200);
		}
	}
	catch (err){
		console.log(err);
		res.sendStatus(500);
	}
}

//The putone function takes the request body and changes the object's fields
//export it so we can use it in app.js

exports.putOne = async function(req, res){
	try {
			
		let user = await User.putOne({_id: req.params.username }, req.body);
				
		if (!user) {
			console.log("could not fufill request")
		}
		else {

			return res.send(await User.findOne({_id: req.params.username }));
				
		}
	}
	catch(err){
		console.log(err);
		res.sendStatus(500);
	}
}


//updateOne function takes the request body and updates the designated fields.
//export it so we can use it in app.js
exports.updateOne = async function (req, res) {
	console.log("Replaced the field with the ID " + req.params.username + "to ")
	
	const user = new User({
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
	
	try {
		let user = await User.updateOne({ _id: req.params.username }, req.body) 
			if (!user) {
				console.log("No note was returned");
			}
			else {
				return res.sendStatus(200);
			}
		
	}
	catch (err) {
		console.log(err);
		res.sendStatus(500);
	}

}

// Create the getOne function.
// export it so we can use it in app.js.
exports.getOne = async function(req, res){
	// The getOne function searches the note field in
	// all of our notes for a search term.  It returns
	// all the notes that match.
	// We are using a regex to search.
	const users = await User.find({ 
		users: { 
			$regex: req.params.searchTerm 
		}
	});
	
	// If there are none that match, send a 404.
	if(notes.length == 0){
		res.sendStatus(404);
		return;
	}

	// Else, send the results back as json.
	res.json(notes);
}

// Create the function for creating a new note.
// export is so we can use it in app.js.
exports.postOne = async function(req, res){
	const user = new User({
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

	let error = note.validateSync();
	if(error){
		res.sendStatus(400);
		console.log(error);
		return;
	}
	note.save();
	res.sendStatus(200);
	return;
}
//const User = mongoose.model('User', noteSchema);

// Create the function for getting ALL the notes.
// export it so we can use it in app.js.
exports.getAll = async function(req, res) {
	const users = await User.find({
	});
	res.json(users);
}

//delete one function searches for an Id and deletes that object
//export it so we can use it in app.js
exports.deleteOne = async function(req, res){
	console.log("Found the ID of " + req.params.username);
	
	try {
		let user = await Note.deleteOne({_id: req.params.username });
		// console.log(note);
		if(!user){
			console.log("No user was returned");
		}
		else {
			return res.sendStatus(200);
		}
	}
	catch (err){
		console.log(err);
		res.sendStatus(500);
	}
}

//The putone function takes the request body and changes the object's fields
//export it so we can use it in app.js

exports.putOne = async function(req, res){
	try {
			
		let user = await User.putOne({_id: req.params.username }, req.body);
				
		if (!user) {
			console.log("could not fufill request")
		}
		else {

			return res.send(await User.findOne({_id: req.params.username }));
				
		}
	}
	catch(err){
		console.log(err);
		res.sendStatus(500);
	}
}


//updateOne function takes the request body and updates the designated fields.
//export it so we can use it in app.js
exports.updateOne = async function (req, res) {
	console.log("Replaced the field with the ID " + req.params.username + "to ")
	
	const user = new User({
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
	
	try {
		let user = await User.updateOne({ _id: req.params.username }, req.body) 
			if (!user) {
				console.log("No note was returned");
			}
			else {
				return res.sendStatus(200);
			}
		
	}
	catch (err) {
		console.log(err);
		res.sendStatus(500);
	}

}

// Create the getOne function.
// export it so we can use it in app.js.
exports.getOne = async function(req, res){
	// The getOne function searches the note field in
	// all of our notes for a search term.  It returns
	// all the notes that match.
	// We are using a regex to search.
	const users = await User.find({ 
		users: { 
			$regex: req.params.searchTerm 
		}
	});
	
	// If there are none that match, send a 404.
	if(notes.length == 0){
		res.sendStatus(404);
		return;
	}

	// Else, send the results back as json.
	res.json(notes);
}

// Create the function for creating a new note.
// export is so we can use it in app.js.
exports.postOne = async function(req, res){
	const user = new User({
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

	let error = note.validateSync();
	if(error){
		res.sendStatus(400);
		console.log(error);
		return;
	}
	note.save();
	res.sendStatus(200);
	return;
}
