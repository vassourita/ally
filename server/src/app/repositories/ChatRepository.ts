import { Chat } from '@models/Chat';

import { BaseRepository } from '@repositories/BaseRepository';

export const ChatRepository = new BaseRepository<Chat>('chat', {
  id: { primary: true, },
  employer_id: { },
  user_id: { },
});
