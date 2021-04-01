const { Socket } = require('phoenix-channels');

let socket = new Socket('wss://jondreb-multi-chat.herokuapp.com/socket')

socket.connect();

let channel = socket.channel('chat:general', {});
channel.join()
  .receive('ok', resp => console.log('ok' + resp));
  .receive('error', resp => console.log('error' + resp));