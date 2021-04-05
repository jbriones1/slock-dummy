import { socket } from './socketHandler.js';

socket.connect();
let channel = socket.channel("lobbies:lobbies", {});

channel.join()
.receive('ok', resp => {
  console.log(channel);
  channel.on('get_rooms', payload => buildLobbyList(payload.rooms));
  $('#btn-create-room').click(() => createRoom());

  channel.on('room_made', payload => {
    joinRoom(payload.name);
  });
})
.receive('error', resp => console.log('Error'));

const joinRoom = (roomID) => {
  window.location.href = '/room/' + roomID; 
};

const buildLobbyList = (rooms) => {
  console.log(rooms);
  $('#rooms-list').empty();
  Object.keys(rooms).forEach(room => {
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
      $(`#${room}`).click(() => joinRoom(room));
  });
};

const createRoom = () => {
  const roomID = $('#txt-room-name').val().trim();

  // Check if the room id is empty or has more than one word in it
  if (!roomID || roomID.indexOf(' ') !== -1) {
    return;
  }

  channel.push('create_room', {name: roomID, p1: userID, p2: null});
  $('#txt-room-name').val('')
};