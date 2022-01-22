const notes = require('express').Router();
const util = require('util');
const { v4: uuidv4 } = require('uuid');

// GET Route for retrieving all the notes
notes.get('/notes', (req, res) => {

});

// POST Route for a new note
notes.post('/notes', (req, res) => {
  const { title, text} = req.body;

  if (title && text) {
    const newNote = {
    title,
    text,
    note_id: uuidv4(),
    };

    readAndAppend(newNote, './db/db.json');
    res.json(`Note added successfully`);
  } else {
    res.error('Error in adding note');
  }
});

// Delete Route for a deleting a note
notes.delete('/notes/:id', (req, res) => {

  });

module.exports = notes;
