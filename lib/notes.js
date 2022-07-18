const fs = require("fs");
const path = require("path");

//create note function 
function createNote(body, notesArray) {
    const note = body;
    notesArray.push(note);

    fs.writeFileSync(
    /*path.join is used to join the value of __dirname which represents the directory of the file we execute the code in,
    with the path to the notes.json file */
        path.join(__dirname, '../data/notes.json'),
        //we need to save the JS data as JSON, so we use JSON.stringfy() to convert it. 
        // The null argument means we don't want to edit any of our existing data; if we did, we could pass something in there.
        // The 2 indicates we want to create white space between our values to make it more readable.
        JSON.stringify({ notes: notesArray }, null, 2)
    );
    return note;
};

// delete note function
function deleteNote(notesArray, id) {
    let deleteID = parseInt(id);
    notesArray.splice(deleteID, 1);

    for (let i = deleteID; i < notesArray.length; i++) {
        notesArray[i].id = i.toString();
    };

    fs.writeFileSync(
        path.join(__dirname, '../data/notes.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
    )};


module.exports = {
    createNote,
    deleteNote
};