import ChatRepository from '../repositories/ChatRepository';
import MessageRepository from '../repositories/MessageRepository';

export default class MessageController {
  static async index(req, res) {
    const { userId } = req;

    const chats = await ChatRepository.find({
      where: { user_id: userId },
      join: [
        {
          repo: MessageRepository,
          on: { chat_id: chat.id },
          type: 'many',
        },
      ],
    });

    return res.status(200).json({ chats });
  }

  static async store(req, res) {
    const { userId } = req;
    const { content, chatId } = req.body;

    const message = await MessageRepository.create({
      author_id: userId,
      chat_id: chatId,
      content,
    });

    return res.status(201).json({ message });
  }
}
