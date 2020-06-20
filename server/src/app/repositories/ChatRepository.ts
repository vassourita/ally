import Chat from '@models/Chat';

import Repository from '@repositories/BaseRepository';

const ChatRepository = new Repository<Chat>('chat', {
  id: { primary: true, },
});

export default ChatRepository;
