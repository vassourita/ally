import User from '@models/User';

class Chat {
  public id: number;
  public employer_id: number;
  public user_id: number;

  public employer: User;
  public user: User;
}

export default Chat;