const notes = require('express').Router();
const path = require('path');

// Helper functions for reading and writing to the JSON file
const { readDb, writeDb } = require('../helpers/fs');
const uuid = require('../helpers/uuid');

// Specify the path to the JSON file
const filePath = path.join(__dirname, '..', '/db/db.json');

// This API route is a GET Route for retrieving notes from db.json
notes.get('/', (req, res) => {
    readDb(filePath)
    .then(parsedData => res.json(parsedData))
    .catch(error => console.error('Error:', error));
});
  
// This API route is to post a note to database
notes.post('/', (req, res) => {
    readDb(filePath)
    .then(parsedData => {        
        // create new entry with unique id
        const newNote = {
            id: uuid(),
            title: req.body.title,
            text: req.body.text
        }
        // push to bottom of current  
        parsedData.push(newNote);
        // call write to file async function
        writeDb(filePath, parsedData)
        .then(() => res.status(201).send('File Created'));
    })
    .catch(error => console.error('Error:', error));
});

// delete route
notes.delete('/:id', (req, res) => {
    const noteIdToDelete = req.params.id;

    // Read the content of the JSON file
    readDb(filePath)
    .then(parsedData => {
        // Find the index of the note with the specified ID
        const noteIndex = parsedData.findIndex(note => note.id === noteIdToDelete);

        if (noteIndex === -1) {
            // Note not found
            return res.status(404).send('Note not found');
        }
        // Remove the note from the array
        parsedData.splice(noteIndex, 1);
        
        writeDb(filePath, parsedData)
        .then(() => res.status(204).send('Deleted'));
    })
    .catch(error => console.error('Error:', error));

});

module.exports = notes;