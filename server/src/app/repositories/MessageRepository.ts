import Message from '@models/Message';

import Repository from '@repositories/BaseRepository';

const MessageRepository = new Repository<Message>('message', {
  id: { primary: true, },
});

export default MessageRepository;
