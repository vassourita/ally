import Repository from '@repositories/BaseRepository';

const NotificationRepository = new Repository('notification', {
  id: {
    primary: true,
    type: Number(),
  },
  description: { type: String() },
  title: { type: String() },
  link: { type: String() },
  user_id: {
    returning: false,
    type: Number(),
  },
  is_read: { type: Boolean() },
  created_at: { type: String() },
});

export default NotificationRepository;
