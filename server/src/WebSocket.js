import io from 'socket.io';

export default class WebSocket {
  constructor(server, callback) {
    this.connectedUsers = {};

    try {
      this.io = io(server);
      callback(null, this.io);

      this.io.on('connection', socket => {
        this.connectedUsers[socket.id] = {
          userId: socket.handshake.query.id,
          connection: socket,
        };
      });
    } catch (error) {
      callback(error);
    }
  }
}
