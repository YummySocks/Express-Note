// importing in the needed files and methods
const express = require('express');
const path = require('path');
const api = require('./routes')
const PORT = process.env.PORT || 3001;

const app = express();
// middleware to streamline things
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api',api)
app.use(express.static('public'));
// starting page path
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);
// the next html of the app
app.get('/notes',(req,res) => 
  res.sendFile(path.join(__dirname, '/public/notes.html'))
)
// catchall for unrecognized paths
app.get('*', (req,res) => 
  res.sendFile(path.join(__dirname, '/public/index.html'))
)
// port listening for the server 
app.listen(PORT, () =>
  console.log(`${PORT} port deployed`)
);