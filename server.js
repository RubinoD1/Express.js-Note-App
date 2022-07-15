const express = require('express');

//route front-end can requeest data from
const { notes } = require('./data/notes.json'); 

const app = express();

app.listen(3001, () => {
    console.log(`API server now on port 3001!`);
  });


//route to notes.json 
app.get('/api/notes', (req, res) => {
  res.send('Hello!');
});

