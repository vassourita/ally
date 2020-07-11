import { Chat } from '@models/Chat';
import { JobVacancy } from '@models/JobVacancy';
import { Knowledge } from '@models/Knowledge';
import { Notification } from '@models/Notification';
import { UserType } from '@models/UserType';

export class User {
  public id: number;
  public name: string;
  public email: string;
  public password: string;
  public fiscal_code: string;
  public image_url: string;
  public curriculum: string;
  public phone: string;
  public city: string;
  public state: string;
  public address: string;
  public neighborhood: string;
  public microregion_id: number;
  public postal_code: string;
  public about: string;
  public created_at: string;
  public type_id: number;

  public type: UserType;
  public chats: Chat[];
  public jobs: JobVacancy[];
  public knowledges: Knowledge[];
  public notifications: Notification[];
}
