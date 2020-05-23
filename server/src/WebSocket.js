import io from 'socket.io';

export default class WebSocket {
  constructor() {
    /** @type {{ [userId: string]: { id: number, connection: io.Socket } }} */
    this.connectedUsers = {};
  }

  setup(server, callback) {
    try {
      this.io = io(server);

      this.io.on('connection', socket => {
        this.connectedUsers[socket.handshake.query.userId.toString()] = {
          id: socket.handshake.query.userId,
          connection: socket,
        };
        console.log(`\x1b[0m${this.connectedUsers[socket.id].userId}: \x1b[32mconnected\x1b[0m`);

        socket.on('disconnection', () => {
          delete this.connectedUsers[socket.id];
          console.log(`\x1b[0m${this.connectedUsers[socket.id].userId}: \x1b[31mmdisconnected\x1b[0m`);
        });
      });

      callback();
    } catch (error) {
      callback(error);
    }
  }

  static getInstance() {
    if (!this._instance) {
      this._instance = new WebSocket();
    }
    return this._instance;
  }
}
