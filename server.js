const fs = require('fs');
const path = require('path');
const express = require('express');

const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

//process.env.PORT is need by Heroku 
const PORT = process.env.PORT || 3001;

const app = express();

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

app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});





