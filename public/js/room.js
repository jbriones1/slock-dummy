import { socket } from './socketHandler.js';

const roomId = window.location.pathname.split('/')[window.location.pathname.split('/').length - 1];
const userID = uuidv4();

let channel = socket.channel(`lobbies:${roomId}`, { userID });
let lobby = socket.channel('lobbies:lobbies', {});

channel.join()
.receive('ok', resp => {
  console.log(channel);
  // Set the name of the room
  document.getElementById('roomId').innerText = roomId;

  // Return the player to lobby
  channel.on('eject', payload => {
    console.log(payload);
    window.location.href = '/';
  });

  channel.on('message', payload => {
    console.log(payload.message);
  });

  channel.on('command', payload => {
    console.log(`${payload.name}: ${payload.command}`);
  });
})
.receive('err', resp => console.log('error'));

lobby.join()
.receive('ok', resp => {
  
});

// Attach all buttons
const p1Buttons = document.getElementsByClassName('p1');
const p2Buttons = document.getElementsByClassName('p2');

for (let i = 0; i < p1Buttons.length; i++) {
  p1Buttons[i].addEventListener('click', event => buttonClick1(event));
  p2Buttons[i].addEventListener('click', event => buttonClick2(event));
}

const buttonClick1 = e => {
  document.getElementById("result1").innerHTML =
    e.target.innerText + " was clicked";

  channel.push('command', {
    name: `Room ${roomId} - Player 1`,
    command: e.target.innerText
  });
};

const buttonClick2 = e => {
  document.getElementById("result2").innerHTML =
    e.target.innerText + " was clicked";

  channel.push('command', {
    name: `Room ${roomId} - Player 2`,
    command: e.target.innerText
  });
};