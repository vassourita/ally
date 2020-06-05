import Repository from '../data/Repository';

const JobVacancyRepository = new Repository('job_vacancy', {
  id: {
    primary: true,
    type: Number(),
  },
  employer_id: {
    returning: false,
    type: Number(),
  },
  name: { type: String() },
  local: { type: String() },
  amount: { type: Number() },
  created_at: { type: String() },
  description: { type: String() },
});

export default JobVacancyRepository;
