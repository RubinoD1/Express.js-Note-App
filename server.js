const fs = require('fs');
const path = require('path');
const express = require('express');

//route front-end can request data from
const { notes } = require('./data/notes.json');

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




//route to notes.json 
/*the .get method requires two arguments
1) a string that describes the route the client will have to fetch from.
2) a callback function that will execute every time that route is accessed with the GET request. */
app.get('/api/notes', (req, res) => {
  //tells client to interpret the data response as JSON data
  res.json(notes);
});

//route that accepts data to be used or stored server-side
// post requests represent the action of the client requesting the server to accept data. 
app.post('/api/notes', (req, res) => {
  // req.body is where our incoming content will be 
  req.body.id = notes.length.toString();
  let note = createNewNote(req.body, notes);
  res.json(note);
});

app.delete("/api/notes/:id", function(req,res) {
  deleteNote(notes, req.params.id);
  res.json(notes);
})


app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});