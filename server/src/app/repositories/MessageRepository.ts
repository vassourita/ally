import { Message } from '@models/Message';

import { BaseRepository } from '@repositories/BaseRepository';

export class MessageRepository extends BaseRepository<Message> {
  constructor() {
    super('message', {
      id: { primary: true, },
      chat_id: { },
      author_id: { },
      content: { },
      created_at: { },
    });
  }
}
