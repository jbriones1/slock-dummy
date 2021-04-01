const express = require('express');
const { Socket } = require('phoenix-channels');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 8000;

app.use(express.static(path.join(__dirname, 'public')));
const publicpath = path.join(__dirname, 'public');

app.get('/lobby', (req, res) => {
  res.sendFile(publicpath + '/html/lobby.html');
});

app.get('/room/', (req, res) => {
  res.redirect('/lobby');
});

app.get('/room/:roomId', (req, res) => {
  res.sendFile(publicpath + '/html/room.html');
});

// Redirect all invalid requests to lobby
app.all('/*', (req, res) => {
  res.sendFile(publicpath + '/html/lobby.html');
});

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));