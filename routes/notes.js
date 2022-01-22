const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const util = require('util');
const fs = require('fs');

//helper variables
const readFromFile = util.promisify(fs.readFile);
const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );
const readAndAppend = (content, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        const parsedData = JSON.parse(data);
        parsedData.push(content);
        writeToFile(file, parsedData);
      }
    });
};


// GET Route for retrieving all the notes
notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST Route for a new note
notes.post('/', (req, res) => {
  const { title, text} = req.body;

  if (title && text) {
    const newNote = {
    title,
    text,
    note_id: uuidv4(),
    };

    //update DB with note
    readAndAppend(newNote, './db/db.json');
    res.json(`Note added successfully`);
  } else {
    res.error('Error in adding note');
  }
});

// Delete Route for a deleting a note
notes.delete('/:id', (req, res) => {

  });

module.exports = notes;
