import Notification from '@models/Notification';

import Repository from '@repositories/BaseRepository';

const NotificationRepository = new Repository<Notification>('notification', {
  id: { primary: true, },
});

export default NotificationRepository;
