import { Server } from 'http';
import io from 'socket.io';

interface ISocketConnection {
  [userId: string]: {
    id: number;
    connection: io.Socket;
  };
}

export default class WebSocket {
  public connectedUsers: ISocketConnection;
  public io?: io.Server;
  private static instance: WebSocket;

  private constructor() {
    this.connectedUsers = {};
  }

  public setup(server: Server, callback: Function) {
    try {
      this.io = io(server);

      this.io.on('connection', socket => {
        this.connectedUsers[socket.handshake.query.userId.toString()] = {
          id: socket.handshake.query.userId,
          connection: socket,
        };
        console.log(
          `\x1b[0m${this.connectedUsers[socket.handshake.query.userId.toString()].id}: \x1b[32mconnected\x1b[0m`,
        );

        socket.on('disconnection', () => {
          delete this.connectedUsers[socket.handshake.query.userId.toString()];
          console.log(
            `\x1b[0m${this.connectedUsers[socket.handshake.query.userId.toString()].id}: \x1b[31mmdisconnected\x1b[0m`,
          );
        });
      });

      callback();
    } catch (error) {
      callback(error);
    }
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new WebSocket();
    }
    return this.instance;
  }
}
