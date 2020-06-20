import { Server } from 'http';
import io from 'socket.io';

import Logger from '@helpers/Logger';

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
        Logger.success(`${this.connectedUsers[socket.handshake.query.userId.toString()].id} connected`);

        socket.on('disconnection', () => {
          delete this.connectedUsers[socket.handshake.query.userId.toString()];
          Logger.error(`${this.connectedUsers[socket.handshake.query.userId.toString()].id} disconnected`);
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
