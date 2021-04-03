import { socket } from './socketHandler.js';

// const socket = SocketHandler.makeSocket('ws://localhost:4000/socket', {});
socket.connect();

let channel = socket.channel("lobbies:lobbies", {});

channel.join()
.receive('ok', resp => console.log(channel))
.receive('error', resp => console.log('Error'));