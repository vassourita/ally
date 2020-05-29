import NotificationRepository from '../repositories/NotificationRepository';
import NotificationTypeRepository from '../repositories/NotificationTypeRepository';

export default class NotificationController {
  static async index(req, res) {
    const { userId } = req;

    const notifications = await NotificationRepository.find({
      where: { user_id: userId },
      join: [
        {
          repo: NotificationTypeRepository,
          on: { id: 'notification.notification_type_id' },
          type: 'single',
          as: 'type',
        },
      ],
    });

    return res.status(200).json({ notifications });
  }

  static async update(req, res) {
    const { id } = req.params;

    const notifications = await NotificationRepository.update({
      set: { is_read: true },
      where: { id },
    });

    return res.status(200).json({ notifications });
  }
}
