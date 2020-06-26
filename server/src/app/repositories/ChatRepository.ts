import { Chat } from '@models/Chat';

import { BaseRepository } from '@repositories/BaseRepository';

export class ChatRepository extends BaseRepository<Chat> {
  constructor() {
    super('chat', {
      id: { primary: true, },
      employer_id: { },
      user_id: { },
    });
  }
}
