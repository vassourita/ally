import Repository from '@repositories/BaseRepository';

const JobVacancyRepository = new Repository('job_vacancy', {
  id: {
    primary: true,
    type: Number(),
  },
  employer_id: { type: Number() },
  name: { type: String() },
  local: { type: String() },
  amount: { type: Number() },
  created_at: { type: String() },
  description: { type: String() },
});

export default JobVacancyRepository;
