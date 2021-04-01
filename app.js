const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 8000;

app.use(express.static(path.join(__dirname, 'public')));
const publicpath = path.join(__dirname, 'public');

app.get('/', (req, res) => {
  res.redirect('/lobby');
});


app.get('/lobby', (req, res) => {
  res.sendFile(publicpath + '/html/lobby.html');
});

app.get('/room/', (req, res) => {
  res.redirect('/lobby');
});

app.get('/room/:roomId', (req, res) => {
  console.log(req.params.roomId);

  if (!req.params.roomId) {
    res.redirect('/lobby');
  } else {
    res.sendFile(publicpath + '/html/room.html');
  }
});

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));