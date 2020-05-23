import UserRepository from '../Repositories/UserRepository';
import KnowledgeRepository from '../Repositories/KnowledgeRepository';
import KnowledgeTypeRepository from '../Repositories/KnowledgeTypeRepository';

export default class UserController {
  static async index(req, res) {
    const { page = 1 } = req.query;

    const users = await UserRepository.find({
      where: { employer: false },
      limit: 10 * page,
      offset: (page - 1) * 10,
      join: [
        {
          repo: KnowledgeRepository,
          attrs: ['id', 'name'],
          on: { user_id: 'user.id' },
          type: 'many',
          join: [
            {
              repo: KnowledgeTypeRepository,
              on: { id: 'knowledge.knowledge_type_id' },
              as: 'type',
              type: 'single',
            },
          ],
        },
      ],
    });

    return res.json({ users });
  }

  static async show(req, res) {
    const { id } = req.params;

    const user = await UserRepository.findOne({
      where: { id, employer: false },
      join: [
        {
          repo: KnowledgeRepository,
          on: { user_id: 'user.id' },
          type: 'many',
          attrs: ['id', 'name'],
          join: [
            {
              repo: KnowledgeTypeRepository,
              on: { id: 'knowledge.knowledge_type_id' },
              as: 'type',
              type: 'single',
            },
          ],
        },
      ],
    });

    return res.status(200).json({ user });
  }

  static async destroy(req, res) {
    const { id } = req.params;

    if (id !== req.userId) {
      return res.status(401).json({ error: 'Operation not allowed' });
    }

    const deleted = await UserRepository.delete({
      where: { id: Number(id), employer: false },
    });

    return res.status(200).json({ deleted });
  }
}
