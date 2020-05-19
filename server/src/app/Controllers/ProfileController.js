import bcrypt from 'bcryptjs';

import UserRepository from '../Repositories/UserRepository';

import cities from '../Data/cities';

export default class ProfileController {
  static async show(req, res) {
    const { id } = req.params;

    const user = await UserRepository.findOne({
      where: { id },
    });

    if (!user) {
      return res.status(404).json({});
    }

    return res.status(200).json({ user });
  }
}
