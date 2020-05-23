import WebSocket from '../WebSocket';

export default class NotificationService {
  static async sendNotification({ notification, to }) {
    return new Promise((resolve, reject) => {
      const ws = WebSocket.getInstance();

      const user = ws.connectedUsers[to.toString()];

      if (!user) return reject(new Error('User not found'));

      user.connection.emit('new_notification', { notification });

      return resolve({ success: true });
    });
  }
}
