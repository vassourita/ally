import JobVacancy from '@models/JobVacancy';
import KnowledgeType from '@models/KnowledgeType';
import User from '@models/User';

class Knowledge {
  public id: number;
  public name: string;
  public knowledge_type_id: number;
  public user_id: number;
  public job_vacancy_id: number;
  public differential: boolean;

  public type: KnowledgeType;
  public job: JobVacancy;
  public user: User;
}

export default Knowledge;
