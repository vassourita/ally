import { JobVacancy } from '@models/JobVacancy';
import { User } from '@models/User';

export class Report {
  public id: string;
  public description: string;
  public user_id: number;
  public job_vacancy_id: number;
  public created_at: string;

  public user: User;
  public job: JobVacancy;
}
