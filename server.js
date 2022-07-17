const fs = require('fs');
const path = require('path');
const express = require('express');
const indexRoutes = require('./routes/apiRoutes/indexRoutes');

//process.env.PORT is need by Heroku 
const PORT = process.env.PORT || 3001;

const app = express();

// '/' route points to the root route of the server. This is the route used to create the homepage for the server.
app.get('/', (req, res) => {
  // responds with an HTML page to display in the browser
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

//The * acts as a wildcard, any route that hasn't been defined will fall under this request and will go to the homepage. 
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

/* app.use()
middleware that mounts a function to the server that the server request pass through 
before getting to the intended endpoint. */

//middleware that instructs the server to make certain files readily available and to not gate it behind a server endpoint.
//express.static providees a file path to a location in our app and make these files static resources. 
app.use(express.static('public'));

// takes incoming POST data and coverts it to key/value pairing that can be accessed in the req.body object.
//extended: true option set inside the method call informs the server that there may be a sub-array data nested 
// in it as well, so it needs to look as deep into the POST data as possible to parse all of the data correctly.
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());



app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});






/*  No array function made yet*** - CHECK animalsArray in module
//create new note 
function createNewNote(body, notesArray) {
  const note = body;
  notesArray.push(note);
  //writting to notes.json 
  //path.join() is used to join the value of __dirname which represents the directory of the file we execute the code in,
  // with the path to the notes.json file
   fs.writeFileSync(
    path.join(__dirname, './data/notes.json'),
    //we need to save the JS data as JSON, so we use JSON.stringfy() to convert it. 
    // The null argument means we don't want to edit any of our existing data; if we did, we could pass something in there.
    // The 2 indicates we want to create white space between our values to make it more readable.
    JSON.stringify({ notes: notesArray }, null, 2)
  );

  //return finished code to post route for response
  return note;
};
*/