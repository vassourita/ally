import { User } from '@models/User';

export class UserType {
  public id: number;
  public name: string;

  public users: User[];
}
