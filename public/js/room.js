const socket = new Socket('ws://localhost:4000/socket', {params: {vsn: "2.0.0"}});
socket.connect();
console.log(socket);
const roomId = window.location.pathname[window.location.pathname.length - 1];

let channel = socket.channel(`chat:room${roomId}`, {});
channel.join()
.receive('ok', resp => console.log('ok'))
.receive('err', resp => console.log('error'));

// Set the name of the room
document.getElementById('roomId').innerText = roomId;

const buttonClick1 = e => {
	document.getElementById("result1").innerHTML =
		e.target.innerText + " was clicked";
  
  channel.push('shout', {name: `Client ${roomId} - Player 1`, body: e.target.innerText});
};

const buttonClick2 = e => {
	document.getElementById("result2").innerHTML =
		e.target.innerText + " was clicked";
  
  channel.push('shout', {name: `Client ${roomId} - Player 2`, body: e.target.innerText});
};


