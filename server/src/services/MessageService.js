import WebSocket from '../WebSocket';

export default class MessageService {
  static async sendMessage({ message, to }) {
    return new Promise((resolve, reject) => {
      const ws = WebSocket.getInstance();

      const user = ws.connectedUsers[to.toString()];

      if (!user) return reject(new Error('User not found'));

      user.connection.emit('new_message', { message });

      return resolve({ success: true });
    });
  }
}
