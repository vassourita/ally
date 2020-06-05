import Repository from '../data/Repository';

const ChatRepository = new Repository('chat', {
  id: {
    primary: true,
    type: Number(),
  },
  employer_id: { type: Number() },
  user_id: { type: Number() },
});

export default ChatRepository;