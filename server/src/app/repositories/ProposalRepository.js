import Repository from '../data/Repository';

const ChatRepository = new Repository('proposal', {
  id: {
    primary: true,
  },
  user_id: {},
  job_vacancy_id: {},
});

export default ChatRepository;
