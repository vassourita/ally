import { Proposal } from '@models/Proposal';

import { BaseRepository } from '@repositories/BaseRepository';

export class ProposalRepository extends BaseRepository<Proposal> {
  constructor() {
    super('proposal', {
      id: { primary: true, },
      status: { },
      user_id: { },
      job_vacancy_id: { },
      created_at: { },
    });
  }
}
