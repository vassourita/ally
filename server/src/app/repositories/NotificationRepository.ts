import Repository from '../data/Repository';

const NotificationRepository = new Repository('notification', {
  id: {
    primary: true,
    type: Number(),
  },
  description: { type: String() },
  notification_type_id: {
    returning: false,
    type: Number(),
  },
  user_id: {
    returning: false,
    type: Number(),
  },
  is_read: { type: Boolean() },
  date: { type: String() },
});

export default NotificationRepository;
