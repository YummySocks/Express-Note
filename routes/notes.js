// routing for the notes 
const notes = require('express').Router()
// random string generator fo the id's
const {v4: uuidv4 } = require('uuid')
// helper functions for the fs file methods
const {
    readFromFile,
    readAndAppend,
    writeToFile,
  } = require('../helpers/fsUtils');
// get method that just returns parsed data
notes.get('/', (req,res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
})
// removes note object based on id by reading through it, removing it, and re-writing it back in
notes.delete('/:id', (req,res) => {
  const noteId = req.params.id;
  readFromFile('./db/db.json')
  .then((data) => JSON.parse(data))
  .then((json) => {
    const final = json.filter((note) => note.id !== noteId);

    writeToFile('./db/db.json', final)

    res.json('Bye bye')
  })
})

// post method to add a new object of the note with title,text and id into the array
notes.post('/', (req,res) => {
  const { title , text } = req.body

  if(req.body) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };

    readAndAppend(newNote, './db/db.json');
    res.json("new note made!")
  }
})

module.exports = notes