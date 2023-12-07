// import modules
const fs = require('fs');
const util = require('util');

// create promise versions of fs methods
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

// reads from db.json returns promise
const readDb = async (dbLocation) => {
    try {
        const data = await readFileAsync(dbLocation, 'utf8');
        return JSON.parse(data) || [];
    } catch (error) {
        console.error('Error reading/parsing file:', error);
        throw error;
    }
};

// writes to json.db returns promise
const writeDb = async (dbLocation, newNoteData) => {
    try {
      await writeFileAsync(dbLocation, JSON.stringify(newNoteData))
      return console.info(`\nData written to ${dbLocation}`)
    } catch (error) {
        console.error('Error writing file file:', error);
        throw error;
    }        
}

module.exports = { readDb, writeDb };