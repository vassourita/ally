import Notification from '@models/Notification';

import Repository from '@repositories/BaseRepository';

const NotificationRepository = new Repository<Notification>('notification', {
  id: { primary: true, },
  description: { },
  title: { },
  link: { },
  user_id: { },
  is_read: { },
  created_at: { },
});

export default NotificationRepository;
