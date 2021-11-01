/**
 * Functions for the note routes.
 *
 */

// Pull in the mongoose library.
const { Router } = require('express');
const mongoose = require('mongoose');

// Grab the Schema object.
const { Schema } = mongoose;

// Make a new Schema for what we wish a Note
// to look like.
const noteSchema = new Schema({
	userId: mongoose.ObjectId,
	subject: String,
	course: Number,
	date: { type: Date, default: Date.now },
	note: String
});

// "Compile" the Schema into a model.
const Note = mongoose.model('Note', noteSchema);

// Create the function for getting ALL the notes.
// export it so we can use it in app.js.
exports.getAll = async function(req, res) {
	const notes = await Note.find({
	});
	res.json(notes);
}

//create the deleteOne function
//export it so we can use it in app.js
exports.deleteOne = async function(req, res){
	console.log("Found the ID of " + req.params.useId);
	
	try {
		let note = await Note.deleteOne({_id: req.params.userId });
		// console.log(note);
		if(!note){
			console.log("No note was returned");
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

//create the putOne function
//export it so we can use it in app.js

exports.putOne = async function(req, res){
	try {
			
		let note = await Note.putOne({_id: req.params.userId }, req.body);
				
		if (!note) {
			console.log("could not fufill request")
		}
		else {

			return res.send(await Note.findOne({_id: req.params.userId }));
				
		}
	}
	catch(err){
		console.log(err);
		res.sendStatus(500);
	}
}


//create the putOne function
//export it so we can use it in app.js
exports.updateOne = async function (req, res) {
	console.log("Replaced the field with the ID " + req.params.userId + "to ")
	
	const note = new Note({
		subject: req.body.subject,
		course: req.body.course,
		note: req.body.note
	});
	
	try {
		let note = await Note.updateOne({ _id: req.params.userId }, req.body) 
			if (!note) {
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
	const notes = await Note.find({ 
		note: { 
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
	const note = new Note({
		subject: req.body.subject,
		course: req.body.course,
		note: req.body.note
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
