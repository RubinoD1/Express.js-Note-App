const express = require('express');

//route front-end can requeest data from
const { notes } = require('./data/notes.json');

const app = express();

app.listen(3001, () => {
    console.log(`API server now on port 3001!`);
  });


//route to notes.json 
/*the .get method requires two arguments
1) a string that describes the route the client will have to fetch from.
2) a callback function that will execute every time that route is accessed with the GET request. */
app.get('/api/notes', (req, res) => {
  res.json(notes);
});

