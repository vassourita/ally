import { Notification } from '@models/Notification';

import { BaseRepository } from '@repositories/BaseRepository';

export const NotificationRepository = new BaseRepository<Notification>('notification', {
  id: { primary: true, },
  description: { },
  title: { },
  link: { },
  user_id: { },
  is_read: { },
  created_at: { },
});
