const { Socket } = require('phoenix-channels');
const { v4: uuidv4 } = require('uuid'); 

window.Socket = Socket;
window.uuidv4 = uuidv4;