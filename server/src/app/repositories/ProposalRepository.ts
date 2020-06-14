import Repository from './BaseRepository';

const ChatRepository = new Repository('proposal', {
  id: {
    primary: true,
    type: Number(),
  },
  status: {
    type: String(),
  },
  user_id: {
    type: Number(),
  },
  job_vacancy_id: {
    type: Number(),
  },
});

export default ChatRepository;
