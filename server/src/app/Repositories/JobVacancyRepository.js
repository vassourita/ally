import Repository from '../Data/Repository';

const JobVacancyRepository = new Repository('job_vacancy', {
  id: {
    primary: true,
  },
  user_id: {
    returning: false,
  },
  name: {},
  description: {},
  amount: {},
  created_at: {},
});

export default JobVacancyRepository;
