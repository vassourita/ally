import socketio from 'socket.io-client';

const socket = socketio(process.env.REACT_APP_SOCKET_URL, {
  autoConnect: false,
});

export function unsubscribeToNotifications() {
  socket.removeEventListener('new_notification');
}

export function unsubscribeToMessages() {
  socket.removeEventListener('new_message');
}

export function subscribeToNotifications(subscribeFunction) {
  socket.on('new_notification', subscribeFunction);
}

export function subscribeToMessages(subscribeFunction) {
  socket.on('new_message', subscribeFunction);
}

export function connect(userId) {
  socket.io.opts.query = {
    userId,
  };
  socket.connect();
}

export function disconnect() {
  if (socket.connected) socket.disconnect();
}
