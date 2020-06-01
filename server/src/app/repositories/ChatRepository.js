import Repository from '../data/Repository';

const ChatRepository = new Repository('chat', {
  id: {
    primary: true,
  },
  employer_id: {},
  user_id: {},
});

export default ChatRepository;
