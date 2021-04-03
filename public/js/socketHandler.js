const socket = new Socket('wss://jondreb-multi-chat.herokuapp.com/socket', {params: {vsn: "2.0.0"}});
// socket.connect();

// let channel = socket.channel('chat:general', {});
// channel.join()
// .receive('ok', resp => console.log('ok'))
// .receive('err', resp => console.log('error'));

export const makeSocket = (url, options = {}) => {
  return new Socket(url, options);
};