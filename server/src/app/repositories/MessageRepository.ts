import Message from '@models/Message';

import Repository from '@repositories/BaseRepository';

const MessageRepository = new Repository<Message>('message', {
  id: { primary: true, },
  chat_id: { },
  author_id: { },
  content: { },
  created_at: { },
});

export default MessageRepository;
