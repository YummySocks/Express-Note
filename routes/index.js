const express = require('express')

// importing in the notes.js 
const notesRoute = require('./notes')

const app = express()
// middleware that sets up the paths for the api calls
app.use('/notes',notesRoute)
module.exports = app;