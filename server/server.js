const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const userController = require('./userController');

const PORT = 3000;

mongoose.connect('mongodb://localhost/mongodb-orm', function() {
  mongoose.connection.db.dropDatabase();
});
mongoose.connection.once('open', () => {
  console.log('Connected to Database');
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../client')));

app.get('/', (req, res) => {
  mongoose.connection.db.dropDatabase();
  res.sendFile(path.join(__dirname, '../host.html'));
});

// check the database
app.get('/check', userController.getAllUsers);

// generate link with username on client side to save and retrieve data later
app.get('/host/:host', (req, res) => {
  res.sendFile(path.join(__dirname, '../host.html'));
});

app.get('/viewer/:user', (req, res) => {
  res.sendFile(path.join(__dirname, '../user.html'));
});

// click event creates user from req.body (obj)
app.post('/start', userController.createUser);

// client side grabs username from url to generate this link to reach this route
app.get('/notes/:user', userController.getUser);

app.put('/notes/:user', userController.updateUser);

// // Delete a user from the database
// // localhost://3000/user/"name"
// app.delete('/:name', userController.deleteUser);




app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
