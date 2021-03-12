const express = require('express');
const path = require("path");
const fs = require("fs");
const app = express();
const PORT = process.env.PORT || 3333;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
    const notes = fs.readFileSync(path.join(__dirname,"./db/db.json"),"utf8");
    res.json(JSON.parse(notes));
  });
  
  app.post('/api/notes', (req, res) => {
    const notes = fs.readFileSync(path.join(__dirname,"./db/db.json"),"utf8");
    const parseNotes = JSON.parse(notes);
    parseNotes.push(req.body)
    fs.writeFileSync(path.join(__dirname,"./db/db.json"),JSON.stringify(parseNotes));
    res.json(req.body)
  });

  
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
  });
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
  });
  


app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
