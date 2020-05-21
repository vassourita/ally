import Repository from '../Data/Repository';

const RatingRepository = new Repository('rating', {
  id: {
    primary: true,
  },
  target_id: {
    returning: false,
  },
  author_id: {
    returning: false,
  },
  job_vacancy_id: {
    returning: false,
  },
});

export default RatingRepository;
