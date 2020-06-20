import Chat from '@models/Chat';

import Repository from '@repositories/BaseRepository';

const ChatRepository = new Repository<Chat>('chat', {
  id: { primary: true, },
  employer_id: { },
  user_id: { },
});

export default ChatRepository;
