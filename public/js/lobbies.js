import { socket } from './socketHandler.js';

// const socket = SocketHandler.makeSocket('ws://localhost:4000/socket', {});
socket.connect();

let channel = socket.channel("lobbies:lobbies", {});

channel.join()
.receive('ok', resp => {
  console.log(socket);
  channel.on('get_rooms', payload => buildLobbyList(payload.rooms));
  getRooms();
})
.receive('error', resp => console.log('Error'));

const getRooms = () => {
  channel.push('get_rooms', {});
};

function joinRoom(roomID) {
  window.location.href = '/room/' + roomID; 
};

const buildLobbyList = (rooms) => {
  $('#rooms-list').empty();
  rooms.forEach(room => {
    $('#rooms-list').append(
      '<div class="card" style="width: 18rem;">' + 
        '<div class="card-body">' + 
          '<h5 class="card-title">' + room + '</h5>' + 
          '<div id="interactions">' + 
            `<input id="${room}" type="button" class="btn btn-light btn-sm" value ="Join"/>` + 
          '</div>' + 
        '</div>' + 
      '</div>'
      );
      $(`#${room}`).click(() => {joinRoom(room)});
  });
};