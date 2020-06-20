import Proposal from '@models/Proposal';

import Repository from '@repositories/BaseRepository';

const ChatRepository = new Repository<Proposal>('proposal', {
  id: { primary: true, },
});

export default ChatRepository;
