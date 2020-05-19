import Repository from '../Data/Repository';

const JobVacancyRepository = new Repository('job_vacancy', {
  id: {
    primary: true,
  },
  employer_id: {
    returning: false,
  },
  name: {},
  description: {},
  amount: {},
  created_at: {},
  image_url: {},
  region_only: {},
});

export default JobVacancyRepository;
