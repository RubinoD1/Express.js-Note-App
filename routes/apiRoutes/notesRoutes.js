const router = require("express").Router();
const { notes } = require('../../data/notes');
const { createNote, deleteNote } = require('../../lib/notes');


router.get('/notes', (req, res) => {
    let results = notes;
    //tells client to interpret the data response as JSON data
    res.json(results);
});

/*route that accepts data to be used or stored server-side
post requests represent the action of the client requesting the server to accept data.  */
router.post('/notes', (req, res) => {
    req.body.id = notes.length.toString();
    let note = createNote(req.body, notes);
    res.json(note);
});

router.delete('/notes/:id', (req, res) => {
    deleteNote(notes, req.params.id);
    res.json(notes);
});


module.exports = router;