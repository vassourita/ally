import { Message } from '@models/Message';

import { BaseRepository } from '@repositories/BaseRepository';

export const MessageRepository = new BaseRepository<Message>('message', {
  id: { primary: true, },
  chat_id: { },
  author_id: { },
  content: { },
  created_at: { },
});
