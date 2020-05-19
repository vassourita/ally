import UserRepository from '../Repositories/UserRepository';

export default class UserController {
  static async show(req, res) {
    const { id } = req.userId;

    const user = await UserRepository.findOne({
      where: { id, employer: false },
    });

    return res.status(200).json({ user });
  }

  static async destroy(req, res) {
    const { id } = req.params;

    if (id !== req.userId) {
      return res.status(401).json({ error: 'Operation not allowed' });
    }

    const deleted = await UserRepository.delete({
      where: { id, employer: false },
    });

    return res.status(200).json({ deleted });
  }
}
