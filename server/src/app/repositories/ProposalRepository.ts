import { Proposal } from '@models/Proposal';

import { BaseRepository } from '@repositories/BaseRepository';

export const ProposalRepository = new BaseRepository<Proposal>('proposal', {
  id: { primary: true, },
  status: { },
  user_id: { },
  job_vacancy_id: { },
  created_at: { },
});
