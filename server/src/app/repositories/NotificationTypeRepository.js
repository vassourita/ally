import Repository from '../data/Repository';

const NotificationTypeRepository = new Repository('notification_type', {
  id: {
    primary: true,
  },
  name: {},
});

export default NotificationTypeRepository;
