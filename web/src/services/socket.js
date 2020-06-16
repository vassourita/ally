import socketio from 'socket.io-client';

const socket = socketio(process.env.REACT_APP_SOCKET_URL, {
  autoConnect: false,
});

function subscribeToNotifications(subscribeFunction) {
  socket.on('new_notification', subscribeFunction);
}

function connect(userId) {
  socket.io.opts.query = {
    userId,
  };
  socket.connect();
}

function disconnect() {
  if (socket.connected) socket.disconnect();
}

export { connect, disconnect, subscribeToNotifications };
