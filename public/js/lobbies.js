import { socket } from './socketHandler.js';

socket.connect();

let channel = socket.channel("lobbies:lobbies", {userID: uuidv4()});

channel.join()
.receive('ok', resp => {
  console.log(channel);
  channel.on('get_rooms', payload => buildLobbyList(payload.rooms));
  $('#btn-create-room').click(() => createRoom());
})
.receive('error', resp => console.log('Error'));

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
      $(`#${room}`).click(() => joinRoom(room));
  });
};

const createRoom = () => {
  const roomID = $('#txt-room-name').val();

  if (!roomID.trim()) {
    return;
  }

  channel.push('create_room', {name: roomID});
  $('#txt-room-name').val('')
};