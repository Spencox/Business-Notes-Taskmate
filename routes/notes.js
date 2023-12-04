const notes = require('express').Router();
const path = require('path');

// Helper functions for reading and writing to the JSON file
const fs = require('fs');

// Specify the path to the JSON file
const filePath = path.join(__dirname, '..', '/db/db.json');

// This API route is a GET Route for retrieving notes from db.json
notes.get('/', (req, res) => {
    console.log("GET REQUEST MADE")

    // Read the content of the JSON file
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the file:', err);
            return res.status(500).send('Internal Server Error');
        }
        // Parse the JSON data
        try {
            const jsonData = JSON.parse(data);
            //console.log('Data from db.json:', jsonData);
            res.json(jsonData);
        } catch (parseError) {
            console.error('Error parsing JSON:', parseError);
            res.status(500).send('Internal Server Error');
        }
    });
});
  
// This API route is a GET Route for retrieving all the tips
notes.post('/', (req, res) => {
    console.info(`${req.method} request received`);
    // Read the content of the JSON file
  
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the file:', err);
            return res.status(500).send('Internal Server Error');
        } 
        try {
            const parsedData = JSON.parse(data);
            parsedData.push(req.body);
            //writeToFile(file, parsedData);
            fs.writeFile(filePath, JSON.stringify(parsedData), (err) => err ? console.error(err) : console.info(`\nData written to ${filePath}`));
            res.status(201).send('File Created');
        } catch (writeError) {
            console.error('Error writing to db.JSON:', writeError);
            res.status(500).send('Internal Server Error');
        }
    });
});
  

module.exports = notes;