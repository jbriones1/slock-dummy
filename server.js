const { Socket } = require('phoenix-channels');
const express = require('express');
const app = express();
const port = 3000;

let socket = new Socket('wss://jondreb-multi-chat.herokuapp.com/socket', {params: {vsn: "2.0.0"}});

app.get('/', (req, res) => {
  socket.connect();

  let channel = socket.channel('chat:general', {});
  channel.join()
  .receive('ok', resp => console.log(resp))
  .receive('error', resp => console.log(resp));

  channel.on('shout', payload => {
    console.log(payload.body);
  });

  res.send('Joined');
});

app.listen(port, () => {
  console.log(`Example app listening on port ;!`)
});