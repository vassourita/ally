import Repository from '../data/Repository';

const MessageRepository = new Repository('message', {
  id: {
    primary: true,
    type: Number(),
  },
  chat_id: {
    returning: false,
    type: Number(),
  },
  author_id: { type: Number() },
  content: { type: String() },
  created_at: { type: String() },
});

export default MessageRepository;
