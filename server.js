// import modules
const express = require('express');
const path = require('path');
const api = require('./routes/index');

// set port for Heroku or local dev
const PORT = process.env.PORT || 3001;

// set up express
const app = express();

// Middleware for parsing JSON, urlencoded form data, and public folder use
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Send all the requests that begin with /api to the index.js in the routes folder
app.use('/api', api);

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// GET wild card handling
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// server start
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
