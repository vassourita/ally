import { Notification } from '@models/Notification';

import { BaseRepository } from '@repositories/BaseRepository';

export class NotificationRepository extends BaseRepository<Notification> {
  constructor() {
    super('notification', {
      id: { primary: true },
      description: { },
      title: { },
      link: { },
      user_id: { },
      is_read: { },
      created_at: { },
    });
  }
}
