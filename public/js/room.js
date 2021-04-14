import { socket } from './socketHandler.js';

const roomID = window.location.pathname.split('/')[window.location.pathname.split('/').length - 1];
const userID = uuidv4();

let room = socket.channel(`lobbies:${roomID}`, { userID: userID });
let lobby = socket.channel('lobbies:lobbies', {});

lobby.join();

room.join()
.receive('ok', resp => {

  // Set the name of the room
  document.getElementById('roomId').innerText = roomID;

  document.getElementById("btn-exit").addEventListener('click', e => exitButton(e))

  lobby.push('update_rooms', {});
  
  // Return the player to lobby
  room.on('eject', payload => {
    window.location.href = '/';
  });

  room.on('room_state', payload => {

    if (payload.players.p1 && payload.players.p2) {
      lobby.push('full_room', {});
    }
    setPlayerButtons(payload);
  });

  room.on('player_left', payload => {
    console.log(`Player ${payload.userID} left.`)
    console.log(payload.room);
    lobby.push('update_rooms', {});
  });

  room.on('command', payload => {
    console.log(payload);

    document.getElementById('p1-hp').innerText = payload.p1;
    document.getElementById('p2-hp').innerText = payload.p2;
  });
})
.receive('err', resp => console.log('error'));

const buttonClick1 = e => {
  document.getElementById("result1").innerHTML =
    e.target.innerText + " was clicked";

  room.push('command', {
    room: `${roomID}`,
    command: e.target.innerText,
    player: 1
  });
};

const buttonClick2 = e => {
  document.getElementById("result2").innerHTML =
    e.target.innerText + " was clicked";

  room.push('command', {
    room: `${roomID}`,
    command: e.target.innerText,
    player: 2
  });
};

const exitButton = e => {

  room.push('leave_room', {userID, roomID});
  window.location.href = '/';
};

const setPlayerButtons = (payload) => {

  if (payload.players.p1 == userID) {
    const p1Buttons = document.getElementsByClassName('p1');

    console.log("attaching to p1")

    for (let i = 0; i < p1Buttons.length; i++) {
      p1Buttons[i].addEventListener('click', event => buttonClick1(event));
    }
  } else {
    const p2Buttons = document.getElementsByClassName('p2');

    console.log("attaching to p2")

    for (let i = 0; i < p2Buttons.length; i++) {
      p2Buttons[i].addEventListener('click', event => buttonClick2(event));
    }
  }
}