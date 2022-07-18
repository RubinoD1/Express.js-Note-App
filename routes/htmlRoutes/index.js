const path = require('path');
const router = require('express').Router();

/* The .get method requires two arguments
1) a string that describes the route the client will have to fetch from.
2) a callback function that will execute every time that route is accessed with the GET request. */
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/notes.html'));
});

// 'wildcard' route, if request is made to unknown path defaults to homepage of site.
router.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
})

module.exports = router;