import Repository from '@repositories/BaseRepository';

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
  created_at: {
    type: String(),
  },
});

export default ChatRepository;
