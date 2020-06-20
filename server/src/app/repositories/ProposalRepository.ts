import Proposal from '@models/Proposal';

import Repository from '@repositories/BaseRepository';

const ChatRepository = new Repository<Proposal>('proposal', {
  id: { primary: true, },
  status: { },
  user_id: { },
  job_vacancy_id: { },
  created_at: { },
});

export default ChatRepository;
