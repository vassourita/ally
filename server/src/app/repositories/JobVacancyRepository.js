import Repository from '../data/Repository';

const JobVacancyRepository = new Repository('job_vacancy', {
  id: {
    primary: true,
  },
  employer_id: {
    returning: false,
  },
  name: {},
  local: {},
  amount: {},
  created_at: {},
  description: {},
});

export default JobVacancyRepository;
