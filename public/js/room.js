const socket = new Socket('ws://localhost:4000/socket', {params: {token: "token", vsn: "2.0.0"}});
socket.connect();
console.log(socket);

let channel = socket.channel('chat:general', {});
channel.join()
.receive('ok', resp => console.log('ok'))
.receive('err', resp => console.log('error'));

// Set the name of the room
const roomId = window.location.pathname[window.location.pathname.length - 1];
document.getElementById('roomId').innerText = roomId;

const buttonClick1 = e => {
	document.getElementById("result1").innerHTML =
		e.target.innerText + " was clicked";
  
  channel.push('shout', {name: 'Dummy client', body: 'From dummy client'});
};

const buttonClick2 = e => {
	document.getElementById("result2").innerHTML =
		e.target.innerText + " was clicked";
};


