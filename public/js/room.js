import { socket } from './socketHandler.js';

const roomId = window.location.pathname.split('/')[window.location.pathname.split('/').length - 1];
const userID = uuidv4();

let channel = socket.channel(`lobbies:${roomId}`, { userID });
channel.join()
  .receive('ok', resp => console.log(channel))
  .receive('err', resp => console.log('error'));

  channel.on('command', payload => {
  console.log(`${payload.name}: ${payload.command}`);
}); 

  // Attach all buttons
const p1Buttons = document.getElementsByClassName('p1');
const p2Buttons = document.getElementsByClassName('p2');
console.log(p1Buttons);
for (let i = 0; i < p1Buttons.length; i++) {
  p1Buttons[i].addEventListener('click', event => buttonClick1(event));
  p2Buttons[i].addEventListener('click', event => buttonClick1(event));
}

// Set the name of the room
document.getElementById('roomId').innerText = roomId;

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