import bcrypt from 'bcryptjs';

import UserRepository from '../Repositories/UserRepository';

import cities from '../Data/cities';

export default class UserController {
  static async show(req, res) {
    const { id } = req.userId;

    const user = await UserRepository.findOne({
      where: { id, employer: false },
    });

    return res.json({ user });
  }

  static async destroy(req, res) {
    const { id } = req.params;

    if (id !== req.userId) {
      return res.status(401).json({ error: 'Operation not allowed' });
    }

    const deleted = await UserRepository.delete({
      where: { id, employer: false },
    });

    return res.json({ deleted });
  }
}
