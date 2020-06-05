import Repository from '../data/Repository';

const RatingRepository = new Repository('rating', {
  id: {
    primary: true,
    type: Number(),
  },
  target_id: {
    returning: false,
    type: Number(),
  },
  author_id: {
    returning: false,
    type: Number(),
  },
  job_vacancy_id: {
    returning: false,
    type: Number(),
  },
});

export default RatingRepository;
