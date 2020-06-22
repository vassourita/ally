import { Knowledge } from '@models/Knowledge';
import { Proposal } from '@models/Proposal';
import { User } from '@models/User';

export class JobVacancy {
  public id: number;
  public employer_id: number;
  public name: string;
  public local: string;
  public amount: number;
  public created_at: string;
  public description: string;

  public employer: User;
  public proposals: Proposal[];
  public knowledges: Knowledge[];
}
