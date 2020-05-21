import Repository from '../Data/Repository';

const NotificationTypeRepository = new Repository('notification_type', {
  id: {
    primary: true,
  },
  name: {},
});

export default NotificationTypeRepository;
