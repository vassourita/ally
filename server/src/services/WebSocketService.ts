import { WebSocket } from '@root/WebSocket';

import { Message } from '@models/Message';
import { Notification } from '@models/Notification';

export class WebSocketService {
  constructor(private readonly ws: WebSocket) {}

  public async sendNotification(to: string, notification: Notification): Promise<boolean> {
    const target = this.ws.connectedUsers[to];

    if (!target) {
      return false;
    }

    target.connection.emit('new_notification', { notification });
    return true;
  }

  public async sendMessage(to: string, message: Message): Promise<boolean> {
    const target = this.ws.connectedUsers[to];

    if (!target) {
      return false;
    }

    target.connection.emit('new_message', { message });
    return true;
  }
}
