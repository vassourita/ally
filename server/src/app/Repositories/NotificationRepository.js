import Repository from '../Data/Repository';

const NotificationRepository = new Repository('notification', {
  id: {
    primary: true,
  },
  description: {},
  notification_type_id: {
    returning: false,
  },
  user_id: {
    returning: false,
  },
  is_read: {},
  date: {},
});

export default NotificationRepository;
