import Repository from '../data/Repository';

const NotificationTypeRepository = new Repository('notification_type', {
  id: {
    primary: true,
    type: Number(),
  },
  name: { type: String() },
});

export default NotificationTypeRepository;
