import Chat from '@models/Chat';
import User from '@models/User';

class Message {
  public id: number;
  public chat_id: number;
  public author_id: number;
  public content: string;
  public created_at: string;

  public chat: Chat;
  public author: User;
}

export default Message;
