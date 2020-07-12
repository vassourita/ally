import { JobVacancy } from '@models/JobVacancy';
import { User } from '@models/User';

export class Chat {
  public id: number;
  public employer_id: number;
  public user_id: number;
  public job_vacancy_id: number;

  public job: JobVacancy;
  public employer: User;
  public user: User;
}
