const path = require('path');
const router = require('express').Router();
    
// '/' route points to the root route of the server. This is the route used to create the homepage for the server.
router.get('/', (req, res) => {
    // responds with an HTML page to display in the browser
    res.sendFile(path.join(__dirname, '../../public/index.html'));
  });
  
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/notes.html'));
  });
      
   
 //The * acts as a wildcard, any route that hasn't been defined will fall under this request and will go to the homepage. 
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
  });

  module.exports = router;