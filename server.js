const fs = require('fs');
const path = require('path');
const express = require('express');

//route front-end can request data from
const { notes } = require('./data/notes.json');

const app = express();

/* app.use()
middleware that mounts a function to the server that the server request pass through 
before getting to the intended endpoint.
*/

// takes incoming POST data and coverts it to key/value pairing that can be accessed in the req.body object.
//extended: true option set inside the method call informs the server that there may be a sub-array data nested 
// in it as well, so it needs to look as deep into the POST data as possible to parse all of the data correctly.
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());

app.listen(3001, () => {
    console.log(`API server now on port 3001!`);
  });


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
  console.log(req.body);
  //The req.body property is where we can access the post request data and do something with it. 
  res.json(req.body);
});


/* No array function made yet
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