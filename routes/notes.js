const notes = require('express').Router()
const {v4: uuidv4 } = require('uuid')
const {
    readFromFile,
    readAndAppend,
    writeToFile,
  } = require('../helpers/fsUtils');

notes.get('/', (req,res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
})
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
notes.post('/', (req,res) => {
  console.log(req.body)
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