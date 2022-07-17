const router = require('express').Router();

//route front-end can request data from
const { notes } = require('../data/notes.json');


    //route to notes.json 
/*the .get method requires two arguments
1) a string that describes the route the client will have to fetch from.
2) a callback function that will execute every time that route is accessed with the GET request. */
router.get('/api/notes', (req, res) => {
    //tells client to interpret the data response as JSON data
    res.json(notes);
  });

  //route that accepts data to be used or stored server-side
// post requests represent the action of the client requesting the server to accept data. 
router.post('/api/notes', (req, res) => {
    // req.body is where our incoming content will be 
    console.log(req.body);
    //The req.body property is where we can access the post request data and do something with it. 
    res.json(req.body);
  });



module.exports  = router;