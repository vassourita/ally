import { User } from '@models/User';

export class Notification {
  public id: number;
  public description: string;
  public title: string;
  public link: string;
  public user_id: number;
  public is_read: boolean;
  public created_at: string;

  public user: User;
}
