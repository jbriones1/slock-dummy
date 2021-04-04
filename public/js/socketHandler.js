const phxSocket = new Socket('ws://localhost:4000/socket', {vsn: "2.0.0"});

phxSocket.connect();

export const socket = phxSocket;