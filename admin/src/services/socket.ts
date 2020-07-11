import socketio from 'socket.io-client';

const socket = socketio(process.env.REACT_APP_SOCKET_URL as string, {
  autoConnect: false,
});

export function unsubscribeToReports() {
  socket.removeEventListener('new_notification');
}

export function subscribeToReports(subscribeFunction: Function) {
  socket.on('new_report', subscribeFunction);
}

export function connect(userId: string | number) {
  socket.io.opts.query = {
    userId,
  };
  socket.connect();
}

export function disconnect() {
  if (socket.connected) socket.disconnect();
}
