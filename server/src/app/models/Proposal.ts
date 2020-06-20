import JobVacancy from '@models/JobVacancy';
import User from '@models/User';

class Proposal {
  public id: number;
  public status: string;
  public user_id: number;
  public job_vacancy_id: number;
  public created_at: string;

  public user: User;
  public job: JobVacancy;
}

export default Proposal;
