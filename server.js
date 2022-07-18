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
  notes = JSON.parse(fs.readFileSync('/api/notes', 'utf-8'))
  //tells client to interpret the data response as JSON data
  res.json(notes);
});

app.get('/api/notes', (req, res) => {
  notes = JSON.parse(fs.readFileSync('./data/notes.json', 'utf-8'))

  res.json(notes);

});

app.post('/api/notes', (req, res) => {
  let newNote = { // most basic form of a model
    id: Math.floor(Math.random() * 1000),
    title: req.body.title,
    text: req.body.text
  }

  // most basic form of a controller
  notes.push(newNote);
  fs.writeFileSync('./data/notes.json', JSON.stringify(notes), (err, res) => {
    if(err) throw err;
  });

  res.json(notes);

})

app.delete('/api/notes:id', (req, res) => {
  let notes = require('./data/notes.json');
  
  let notesToKeep = [];

  for(let i = 0; i < notes.length; i++) {
    console.log(req.params.id)
    console.log(notes[i].id)

    if (parseInt(notes[i].id) !== parseInt(req.params.id)) {
      notesToKeep.push(notes[i]);
    }
  }

  console.log(notesToKeep);

  notes = notesToKeep;
  fs.writeFileSync('/api/notes', JSON.stringify(notes), (err, res) => {
    if(err) throw err;
  });

  res.json(notes);

});


app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});



//    '/api/notes'