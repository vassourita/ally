import Repository from '../data/Repository';

const MessageRepository = new Repository('message', {
  id: {
    primary: true,
  },
  chat_id: {
    returning: false,
  },
  author_id: {},
  content: {},
  created_at: {},
});

export default MessageRepository;
