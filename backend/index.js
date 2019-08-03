const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const options = {
  user: "root",
  pass: "example",
  dbName: "easynotes",
  useNewUrlParser: true
};

mongoose.connect('mongodb://mongodb-container', options);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// usando proxy no container para requisicao

app.get('/api', (req, res) => {
    res.json({"api": "Supergeeks"});
});

require('./routes/note.routes.js')(app);
app.listen(3000);
